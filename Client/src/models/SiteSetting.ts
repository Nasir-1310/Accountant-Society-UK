import { Schema, models, model } from "mongoose";

/**
 * Single-document settings store for site-wide switches the admin controls.
 * Keyed by `key` so each setting is a singleton row (e.g. "registration").
 */
const SiteSettingSchema = new Schema(
    {
        key: { type: String, required: true, unique: true, trim: true },
        // Whether the event registration form is open to the public.
        registrationOpen: { type: Boolean, default: false },
        // The event the registration form is currently for. Lets the admin
        // reuse the same form for the next event without a code change.
        registrationEventName: { type: String, trim: true, default: "" },
        registrationEventDate: { type: String, trim: true, default: "" },
        // Homepage slider: show a video instead of the image slides.
        sliderVideoEnabled: { type: Boolean, default: false },
        sliderVideoUrl: { type: String, trim: true, default: "" },
        sliderVideoTitle: { type: String, trim: true, default: "", maxlength: 200 },
        sliderVideoDescription: { type: String, trim: true, default: "", maxlength: 500 },
    },
    { timestamps: true }
);

const SiteSetting =
    models.SiteSetting || model("SiteSetting", SiteSettingSchema);

export const REGISTRATION_SETTING_KEY = "registration";
export const SLIDER_SETTING_KEY = "slider";

export default SiteSetting;
