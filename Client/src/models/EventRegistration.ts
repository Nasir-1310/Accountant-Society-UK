import { Schema, models, model } from "mongoose";

const EventRegistrationSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, trim: true, default: "" },
        surname: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        company: { type: String, trim: true, default: "" },
        eventName: { type: String, required: true, trim: true },
        eventDate: { type: Date },
    },
    { timestamps: true }
);

const EventRegistration =
    models.EventRegistration || model("EventRegistration", EventRegistrationSchema);

export default EventRegistration;
