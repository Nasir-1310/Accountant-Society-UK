import SiteSetting, { REGISTRATION_SETTING_KEY } from "@/models/SiteSetting";

export interface RegistrationSettings {
    open: boolean;
    eventName: string;
    eventDate: string;
}

/**
 * Read the registration setting, creating it (closed by default) on first use.
 * Call `dbConnect()` before this.
 */
export async function getRegistrationSettings(): Promise<RegistrationSettings> {
    const doc = await SiteSetting.findOneAndUpdate(
        { key: REGISTRATION_SETTING_KEY },
        { $setOnInsert: { key: REGISTRATION_SETTING_KEY, registrationOpen: false } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    const setting = doc as unknown as {
        registrationOpen?: boolean;
        registrationEventName?: string;
        registrationEventDate?: string;
    } | null;

    return {
        open: Boolean(setting?.registrationOpen),
        eventName: setting?.registrationEventName || "",
        eventDate: setting?.registrationEventDate || "",
    };
}
