import { MedicalSupply, PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import './medications.json'

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding data...");

    const medications: MedicalSupply[] = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "medications.json"), "utf-8")
    );
    for (const med of medications) {
        await prisma.medicalSupply.upsert({
            where: {id: med.id},
            update:{},
            create: {
                name: med.name,
                description: med.description,
                price: med.price,
                image: med.image,
                weight: med.weight,
                category: med.category
            }
        })
    }

    console.log("✅ Data seeded successfully");

}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});