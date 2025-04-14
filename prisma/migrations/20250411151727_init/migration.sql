-- CreateEnum
CREATE TYPE "Groups" AS ENUM ('Cardiovascular', 'Neurological_Psychiatric', 'Allergy_Respiratory', 'Musculoskeletal_Pain', 'Infectious_Disease', 'Gastrointestinal', 'Endocrine_Metabolic', 'Reproductive_Urological', 'Dermatological', 'General_Use');

-- AlterTable
ALTER TABLE "Medications" ADD COLUMN     "group" "Groups" NOT NULL DEFAULT 'General_Use';
