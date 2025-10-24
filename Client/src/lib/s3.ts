// src/lib/s3.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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
  const sanitizedFileName = fileName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");

  const key = `latest-news/${Date.now()}-${sanitizedFileName}`;

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
    throw new Error("Failed to upload image to S3");
  }
}

/**
 * Delete a file from AWS S3
 * @param imageUrl - Full URL of the image to delete
 */
export async function deleteFromS3(imageUrl: string): Promise<void> {
  try {
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
    throw new Error("Failed to delete image from S3");
  }
}

export { s3Client };
