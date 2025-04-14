


export interface PaymentServices {
    initializePayment (email: string, amount: number): Promise<string>;
}