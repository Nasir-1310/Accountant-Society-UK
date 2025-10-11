// src/lib/googleDrive.ts

export type DriveImage = {
  id: string;
  name: string;
  url: string;
  thumbnailLink?: string;
};

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
}

interface DriveResponse {
  files?: DriveFile[];
  error?: {
    message: string;
  };
}

export async function getImagesFromFolder(
  folderId: string
): Promise<DriveImage[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    console.error("❌ Google API key is not configured in .env.local");
    console.error("Make sure NEXT_PUBLIC_GOOGLE_API_KEY is set");
    return [];
  }

  console.log("✅ API Key found:", apiKey.substring(0, 10) + "...");
  console.log("📁 Fetching folder ID:", folderId);

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&orderBy=name`;
    
    console.log("🌐 API URL:", url.replace(apiKey, "***API_KEY***"));

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    console.log("📊 Response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error Response:", errorText);
      
      try {
        const errorJson: DriveResponse = JSON.parse(errorText);
        console.error("❌ Error details:", errorJson);
        
        if (errorJson.error?.message) {
          console.error("❌ Error message:", errorJson.error.message);
        }
      } catch {
        console.error("❌ Could not parse error response");
      }
      
      return [];
    }

    const data: DriveResponse = await response.json();
    console.log("📦 API Response data:", data);

    const images =
      data.files?.filter((file) => file.mimeType?.startsWith("image/")) || [];

    console.log(`✅ Found ${images.length} images in folder`);
    
    if (images.length > 0) {
      console.log("📸 Sample image data:", images[0]);
    }

    return images.map((file) => {
      console.log(`🖼️ Image: ${file.name}, ID: ${file.id}`);
      
      return {
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w4000`,
        thumbnailLink: file.thumbnailLink,
      };
    });
  } catch (error) {
    console.error("❌ Error fetching images from Google Drive:", error);
    return [];
  }
}