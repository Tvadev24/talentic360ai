import type { Metadata } from "next";

import LegalLayout from "@/components/legal-layout";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use the ${site.legalName} website.`,
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="20 November 2025"
      intro={`These terms apply when you browse this website or send us an enquiry through it. Programme delivery is governed by a separate agreement signed with ${site.legalName}.`}
      sections={[
        {
          heading: "Using this site",
          body: [
            "You may read, share and link to anything published here. Please do not attempt to disrupt the site, access areas you have not been given credentials for, or scrape it at a volume that affects other visitors.",
          ],
        },
        {
          heading: "What the content is for",
          body: [
            "Programme descriptions on this site are an overview, not an offer. Curriculum, duration, cohort size, fees and outcomes are confirmed in a written proposal before anything begins.",
            "Figures such as the number of professionals trained, partner count and placement rate describe our track record to date. They are not a guarantee of any individual result.",
          ],
        },
        {
          heading: "Enquiries",
          body: [
            "Sending the contact form starts a conversation; it does not reserve a seat, create a contract or commit either side to anything. Please give us accurate contact details so we can reply.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The ${site.legalName} name, logo, and the course material we write remain ours. Photographs are licensed from their respective photographers via Unsplash.`,
            "Do not reuse our branding or course material commercially without written permission.",
          ],
        },
        {
          heading: "Administrative access",
          body: [
            "The admin area of this site is intended for authorised staff only. The build you are looking at uses a demonstration login that checks credentials in the browser — replace it with server-side authentication before putting real enquiry data behind it.",
          ],
        },
        {
          heading: "Availability",
          body: [
            "We aim to keep the site up and accurate, but we do not promise uninterrupted availability, and we may change or remove content without notice.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of India, and disputes fall to the courts with jurisdiction over our registered office.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms can go to ${site.email}.`],
        },
      ]}
    />
  );
}
