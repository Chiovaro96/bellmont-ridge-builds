import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30)
    .regex(/^[0-9+().\-\s]+$/, "Please enter a valid phone number."),
  projectType: z.enum([
    "Kitchen remodel",
    "Bathroom remodel",
    "Exterior remodel",
    "Whole-home renovation",
    "Other",
  ]),
  projectDescription: z
    .string()
    .trim()
    .min(20, "Please share a few more details about your project.")
    .max(2000),
  preferredTimeline: z.enum([
    "As soon as possible",
    "1–3 months",
    "3–6 months",
    "6–12 months",
    "Just exploring",
  ]),
  consultationRequested: z.boolean(),
  website: z.string().max(0),
});

export const submitProjectInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("project_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      project_type: data.projectType,
      project_description: data.projectDescription,
      preferred_timeline: data.preferredTimeline,
      consultation_requested: data.consultationRequested,
    });

    if (error) {
      console.error(`Inquiry submission failed [${error.code}]: ${error.message}`);
      throw new Error("We couldn't send your request. Please call us instead.");
    }

    return { ok: true };
  });