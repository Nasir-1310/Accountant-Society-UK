import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import Slider from "@/models/Slider";
import SiteSetting, { REGISTRATION_SETTING_KEY } from "@/models/SiteSetting";
import { getSliderVideoSettings, type SliderVideoSettings } from "@/lib/sliderVideoSettings";

export interface HeroSlide {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    dotColor: string;
    order: number;
}

export interface HomeHeroData {
    slides: HeroSlide[];
    video: SliderVideoSettings;
    registrationOpen: boolean;
}

async function loadHomeHeroData(): Promise<HomeHeroData> {
    await dbConnect();

    const [slideDocs, video, registration] = await Promise.all([
        Slider.find({ active: true }).sort({ order: 1 }).lean().exec(),
        getSliderVideoSettings(),
        SiteSetting.findOne({ key: REGISTRATION_SETTING_KEY }).lean(),
    ]);

    const slides = slideDocs.map((item) => ({
        id: (item._id as mongoose.Types.ObjectId).toString(),
        title: item.title,
        description: item.description,
        image: item.image,
        url: item.url,
        dotColor: item.dotColor,
        order: item.order,
    }));

    return {
        slides,
        video,
        registrationOpen: Boolean(
            (registration as { registrationOpen?: boolean } | null)?.registrationOpen
        ),
    };
}

/**
 * Load everything the homepage slider needs on the server, so the first
 * paint already shows the right slides or video (no flicker). Returns null
 * if the database is slow or unavailable; the slider then loads in the
 * browser as before.
 */
export async function getHomeHeroData(timeoutMs = 3000): Promise<HomeHeroData | null> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), timeoutMs);
    });

    try {
        return await Promise.race([loadHomeHeroData(), timeout]);
    } catch (error) {
        console.error(
            "Error loading homepage slider data:",
            error instanceof Error ? error.message : String(error)
        );
        return null;
    } finally {
        clearTimeout(timer);
    }
}
