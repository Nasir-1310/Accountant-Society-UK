// src/lib/s3.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function assertS3Env() {
  const missing = [
    "AWS_REGION",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_S3_BUCKET_NAME",
  ].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required AWS environment variables: ${missing.join(", ")}`);
  }

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
  const accessKeySuffix = accessKeyId.slice(-4).padStart(4, "*");
  console.log(`✅ S3 env loaded. AWS_ACCESS_KEY_ID ends with: ${accessKeySuffix}`);
}

/**
 * Upload a file to AWS S3
 * @param file - Buffer containing the file data
 * @param fileName - Original file name
 * @param contentType - MIME type of the file
 * @returns Promise<string> - Public URL of the uploaded file
 */
export async function uploadToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  assertS3Env();

  const sanitizedFileName = fileName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");

  const key = `sliders/${Date.now()}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);

    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log(`✅ File uploaded to S3: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("❌ S3 upload failed:", message);
    throw new Error(`Failed to upload image to S3: ${message}`);
  }
}

/**
 * Delete a file from AWS S3
 * @param imageUrl - Full URL of the image to delete
 */
export async function deleteFromS3(imageUrl: string): Promise<void> {
  try {
    assertS3Env();

    const url = new URL(imageUrl);
    const key = url.pathname.substring(1); // remove leading '/'

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    });

    await s3Client.send(command);
    console.log(`🗑️ File deleted from S3: ${key}`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("❌ S3 delete failed:", message);
    throw new Error(`Failed to delete image from S3: ${message}`);
  }
}

export { s3Client };
