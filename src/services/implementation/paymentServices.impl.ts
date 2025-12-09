import { PaymentServices } from "../paymentServices";
import crypto from "crypto";
import { db } from "../../config/db";
import { CreateOrderDTO } from "../../dto/createOrder.dto";
import axios from "axios";
import { DeliveryOrder, DeliveryStatus, PaymentStatus } from "@prisma/client";
import { CustomError } from "../../utils/CustomError";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = "https://api.paystack.co";


export class PaymentServicesImpl implements PaymentServices {
    async generateReference(): Promise<string> {
        const reference = `EVTOL_${crypto.randomBytes(10).toString("hex")}`;
        return reference;
    }


    async initializePayment(data: CreateOrderDTO): Promise<{authorization_url:string, access_code:any, reference: string, order: DeliveryOrder}> {
        // Generate reference
        const reference = `EVTOL_${crypto.randomBytes(10).toString("hex")}`;
        if (!reference) {
            throw new CustomError(400, "Failed to generate reference");
        }

        // Create order
        const order = await db.deliveryOrder.create({
            data: {
                reference,
                userId: data.userId,
                destination: data.destination,
                orderItem: {
                    create: data.orderItem.map(item => ({
                        supplyId: item.id,
                        name: item.name,
                        weight: item.weight,
                        price: item.price
                    }))
                }
            }
        })

        // Initialize paystack
        const response = await axios.post(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        {
            email: data.email,
            amount: data.amount * 100, // change to kobo
            reference
        },
        {
            headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json"
            }
        }
        );

        return {
            authorization_url: response.data.data.authorization_url,
            access_code: response.data.data.access_code,
            reference: response.data.data.reference,
            order
        };
    }


    async verifyPayment(reference: string): Promise<any> {
        const response = await axios.get(
            `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
            {
                headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const status = response.data.data.status;

        // Process order based on status == "success"
        const order = await db.deliveryOrder.findUnique({ where: {reference} });
        if(!order) { throw new CustomError(404, "Order not found") }

        if(status !== "success") {
            await db.deliveryOrder.update({
                where: {reference},
                data: {
                    paymentStatus: PaymentStatus.FAILED,
                    deliveryStatus:DeliveryStatus.CANCELLED
                }
            })
        }

        await db.deliveryOrder.update({
            where: {reference},
            data: {
                paymentStatus: PaymentStatus.SUCCESSFUL,
                deliveryStatus: DeliveryStatus.IN_TRANSIT
            }
        })

        return { status, data: response.data.data };
        }

    
}