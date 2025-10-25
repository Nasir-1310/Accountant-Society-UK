// src/app/api/sliders/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Slider from "@/models/Slider";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    // Fetch only active sliders, sorted by order
    const sliders = await Slider.find({ active: true })
      .sort({ order: 1 })
      .lean()
      .exec();

    // Convert MongoDB documents to plain objects
    const formattedSliders = sliders.map((item) => ({
      id: (item._id as mongoose.Types.ObjectId).toString(),
      title: item.title as string,
      description: item.description as string,
      image: item.image as string,
      url: item.url as string,
      dotColor: item.dotColor as string,
      order: item.order as number,
      active: item.active as boolean,
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
