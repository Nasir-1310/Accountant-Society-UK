// src/app/api/admin/sliders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Slider from "@/models/Slider";
import { uploadToS3 } from "@/lib/s3";
import { authenticateAdmin } from "@/lib/authMiddleware";
import mongoose from "mongoose";

// GET - Fetch all sliders (including inactive)
export async function GET(request: NextRequest) {
  try {
    // ✅ Use authenticateAdmin
    const authResult = authenticateAdmin(request);
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    const sliders = await Slider.find()
      .sort({ order: 1 })
      .lean()
      .exec();

    // Use 'unknown' and type assertion for lean() results
    const formattedSliders = sliders.map((item) => ({
      id: (item._id as mongoose.Types.ObjectId).toString(),
      title: item.title as string,
      description: item.description as string,
      image: item.image as string,
      url: item.url as string,
      dotColor: item.dotColor as string,
      order: item.order as number,
      active: item.active as boolean,
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : undefined,
      updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : undefined,
    }));

    return NextResponse.json(formattedSliders, { status: 200 });
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return NextResponse.json(
      { error: "Failed to fetch sliders" },
      { status: 500 }
    );
  }
}

// POST - Create new slider
export async function POST(request: NextRequest) {
  try {
    // ✅ Use authenticateAdmin
    const authResult = authenticateAdmin(request);
    
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const dotColor = formData.get("dotColor") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const active = formData.get("active") === "true";
    const imageFile = formData.get("image") as File;

    // Validation
    if (!title || !description || !url || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, url, and image are required" },
        { status: 400 }
      );
    }

    // Validate image file
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image file." },
        { status: 400 }
      );
    }

    // Upload image to S3
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUrl = await uploadToS3(
      buffer,
      imageFile.name,
      imageFile.type
    );

    // Create slider entry
    const slider = await Slider.create({
      title,
      description,
      url,
      image: imageUrl,
      dotColor: dotColor || 'bg-purple-500',
      order,
      active,
    });

    const formattedSlider = {
      id: (slider._id as mongoose.Types.ObjectId).toString(),
      title: slider.title,
      description: slider.description,
      image: slider.image,
      url: slider.url,
      dotColor: slider.dotColor,
      order: slider.order,
      active: slider.active,
      createdAt: slider.createdAt?.toISOString(),
      updatedAt: slider.updatedAt?.toISOString(),
    };

    return NextResponse.json(formattedSlider, { status: 201 });
  } catch (error) {
    console.error("Error creating slider:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create slider";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
