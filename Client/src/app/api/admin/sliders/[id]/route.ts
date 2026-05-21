import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Slider from "@/models/Slider";
import { uploadToS3, deleteFromS3 } from "@/lib/s3";
import { authenticateAdmin } from "@/lib/authMiddleware";
import mongoose from "mongoose";

// PUT - Update slider
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const authResult = authenticateAdmin(request);

    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid slider ID" }, { status: 400 });
    }

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const dotColor = formData.get("dotColor") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const active = formData.get("active") === "true";
    const imageFile = formData.get("image") as File | null;

    // Validation
    if (!title || !description || !url) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, and url are required" },
        { status: 400 }
      );
    }

    // Get existing slider
    const existingSlider = await Slider.findById(id);

    if (!existingSlider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    let imageUrl = existingSlider.image;

    // If new image is provided, upload it and delete old one
    if (imageFile && imageFile.size > 0) {
      // Validate image file
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload an image file." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToS3(buffer, imageFile.name, imageFile.type);

      // Delete old image from S3
      if (existingSlider.image) {
        try {
          await deleteFromS3(existingSlider.image);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Continue even if old image deletion fails
        }
      }
    }

    // Update slider
    const updatedSlider = await Slider.findByIdAndUpdate(
      id,
      {
        title,
        description,
        url,
        image: imageUrl,
        dotColor: dotColor || "bg-purple-500",
        order,
        active,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedSlider) {
      return NextResponse.json({ error: "Failed to update slider" }, { status: 500 });
    }

    const formattedSlider = {
      id: updatedSlider._id.toString(),
      title: updatedSlider.title,
      description: updatedSlider.description,
      image: updatedSlider.image,
      url: updatedSlider.url,
      dotColor: updatedSlider.dotColor,
      order: updatedSlider.order,
      active: updatedSlider.active,
      createdAt: updatedSlider.createdAt?.toISOString(),
      updatedAt: updatedSlider.updatedAt?.toISOString(),
    };

    return NextResponse.json(formattedSlider, { status: 200 });
  } catch (error) {
    console.error("Error updating slider:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update slider";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete slider
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const authResult = authenticateAdmin(request);

    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid slider ID" }, { status: 400 });
    }

    // Get slider to delete image
    const slider = await Slider.findById(id);

    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    // Delete image from S3
    if (slider.image) {
      try {
        await deleteFromS3(slider.image);
      } catch (error) {
        console.error("Error deleting image from S3:", error);
        // Continue even if S3 deletion fails
      }
    }

    // Delete slider from database
    await Slider.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Slider deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting slider:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete slider";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
