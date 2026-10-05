-- Sarng Infotech enquiry management: initial schema

-- Sequence used for human-friendly enquiry references (SI-<year>-<number>)
CREATE SEQUENCE "enquiry_reference_seq" START WITH 1001;

-- CreateEnum
CREATE TYPE "EnquiryType" AS ENUM ('ENQUIRY', 'CONTACT', 'INTERNSHIP', 'PROJECT');

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'FOLLOW_UP', 'ENROLLED', 'CLOSED');

-- CreateEnum
CREATE TYPE "EmailKind" AS ENUM ('NOTIFICATION', 'AUTO_REPLY');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL DEFAULT ('SI-'::text || to_char((now() AT TIME ZONE 'Asia/Kolkata'::text), 'YYYY'::text) || '-'::text || lpad((nextval('enquiry_reference_seq'::regclass))::text, 5, '0'::text)),
    "type" "EnquiryType" NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "persona" TEXT,
    "interest" TEXT,
    "batch" TEXT,
    "message" TEXT,
    "college" TEXT,
    "degree" TEXT,
    "year" TEXT,
    "technology" TEXT,
    "skillLevel" TEXT,
    "projectType" TEXT,
    "source" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "notificationStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING',
    "autoReplyStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnquiryFile" (
    "id" TEXT NOT NULL,
    "enquiryId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnquiryNote" (
    "id" TEXT NOT NULL,
    "enquiryId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL,
    "enquiryId" TEXT NOT NULL,
    "kind" "EmailKind" NOT NULL,
    "status" "EmailStatus" NOT NULL,
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "messageId" TEXT,
    "error" TEXT,
    "trigger" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnquiryEvent" (
    "id" TEXT NOT NULL,
    "enquiryId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquiryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_reference_key" ON "Enquiry"("reference");

-- CreateIndex
CREATE INDEX "Enquiry_createdAt_idx" ON "Enquiry"("createdAt");

-- CreateIndex
CREATE INDEX "Enquiry_status_idx" ON "Enquiry"("status");

-- CreateIndex
CREATE INDEX "Enquiry_type_idx" ON "Enquiry"("type");

-- CreateIndex
CREATE INDEX "Enquiry_email_idx" ON "Enquiry"("email");

-- CreateIndex
CREATE INDEX "Enquiry_ipHash_createdAt_idx" ON "Enquiry"("ipHash", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EnquiryFile_enquiryId_key" ON "EnquiryFile"("enquiryId");

-- CreateIndex
CREATE INDEX "EnquiryNote_enquiryId_createdAt_idx" ON "EnquiryNote"("enquiryId", "createdAt");

-- CreateIndex
CREATE INDEX "EmailLog_enquiryId_createdAt_idx" ON "EmailLog"("enquiryId", "createdAt");

-- CreateIndex
CREATE INDEX "EnquiryEvent_enquiryId_createdAt_idx" ON "EnquiryEvent"("enquiryId", "createdAt");

-- CreateIndex
CREATE INDEX "LoginAttempt_ipHash_createdAt_idx" ON "LoginAttempt"("ipHash", "createdAt");

-- AddForeignKey
ALTER TABLE "EnquiryFile" ADD CONSTRAINT "EnquiryFile_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryNote" ADD CONSTRAINT "EnquiryNote_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryEvent" ADD CONSTRAINT "EnquiryEvent_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Keep the sequence tied to the column so it is dropped with the table
ALTER SEQUENCE "enquiry_reference_seq" OWNED BY "Enquiry"."reference";
