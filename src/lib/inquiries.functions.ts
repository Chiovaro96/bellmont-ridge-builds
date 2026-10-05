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
    .min(20, "Please share a few more details about your project (at least 20 characters).")
    .max(2000),
  preferredTimeline: z.enum([
    "As soon as possible",
    "1–3 months",
    "3–6 months",
    "6–12 months",
    "Just exploring",
  ]),
  consultationRequested: z.boolean(),
  website: z.string().max(500).optional().default(""),
  startedAt: z.number().optional(),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const FAILURE = "We couldn't send your request right now. Please try again in a moment or call us at (281) 606-5386.";

export const submitProjectInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data: raw }) => {
    const parsed = inquirySchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Please check your entries and try again.");
    }
    const data = parsed.data;

    // Spam protection: honeypot filled, or form submitted implausibly fast.
    const tooFast = typeof data.startedAt === "number" && Date.now() - data.startedAt < 3000;
    if (data.website.length > 0 || tooFast) {
      return { ok: true };
    }

    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error(FAILURE);
    }

    const rows: [string, string][] = [
      ["Name", data.name],
      ["Phone", data.phone],
      ["Email", data.email],
      ["Project type", data.projectType],
      ["Renovation details", data.projectDescription],
      ["Preferred timeline", data.preferredTimeline],
      ["Consultation consent", data.consultationRequested ? "Yes" : "No"],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html = `<h2>New estimate request</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join("")}</table>`;

    let response: Response;
    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Bellmont Ridge Website <website@mail.bellmontridgeconstruction.com>",
          to: ["estimates@bellmontridgeconstruction.com"],
          reply_to: data.email,
          subject: "New estimate request",
          text,
          html,
        }),
      });
    } catch (error) {
      console.error("Resend request failed", error);
      throw new Error(FAILURE);
    }

    if (!response.ok) {
      console.error(`Resend send failed [${response.status}]: ${await response.text()}`);
      throw new Error(FAILURE);
    }

    return { ok: true };
  });
