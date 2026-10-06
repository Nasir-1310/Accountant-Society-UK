import SiteSetting, { SLIDER_SETTING_KEY } from "@/models/SiteSetting";

export interface SliderVideoSettings {
    enabled: boolean;
    videoUrl: string;
    title: string;
    description: string;
}

export function toSliderVideoSettings(doc: unknown): SliderVideoSettings {
    const setting = doc as {
        sliderVideoEnabled?: boolean;
        sliderVideoUrl?: string;
        sliderVideoTitle?: string;
        sliderVideoDescription?: string;
    } | null;

    return {
        enabled: Boolean(setting?.sliderVideoEnabled),
        videoUrl: setting?.sliderVideoUrl || "",
        title: setting?.sliderVideoTitle || "",
        description: setting?.sliderVideoDescription || "",
    };
}

/**
 * Read the homepage slider-video setting. Defaults to the image slider when
 * nothing has been saved yet. Call `dbConnect()` before this.
 */
export async function getSliderVideoSettings(): Promise<SliderVideoSettings> {
    const doc = await SiteSetting.findOne({ key: SLIDER_SETTING_KEY }).lean();
    return toSliderVideoSettings(doc);
}
