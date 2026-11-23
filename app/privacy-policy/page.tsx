import type { Metadata } from "next";

import LegalLayout from "@/components/legal-layout";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} handles the information you share through this website.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="20 November 2025"
      intro={`This page explains what ${site.legalName} does with the information you give us through this website. It is written in plain language on purpose.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "We only collect what you type into the enquiry form: your name, email address, phone number, the programme you are interested in, and your message.",
            "We do not ask for financial information, identity documents or any special category data through this site.",
          ],
        },
        {
          heading: "Where it is stored",
          body: [
            "In this build, enquiries submitted through the contact form are saved in your own browser's local storage and read back by the admin dashboard on the same device. Nothing is transmitted to a third-party server by the form itself.",
            "If you connect this site to an email service, CRM or API route, that provider's own privacy terms will apply to anything sent to it. Update this section when you do.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To reply to your enquiry, to work out which programme fits, and to keep a record of the conversation. We do not sell enquiry data, and we do not use it for advertising.",
          ],
        },
        {
          heading: "Cookies and third parties",
          body: [
            "The site sets a preference for light or dark theme in your browser's storage. It does nothing else and is not shared.",
            "The language switcher uses Google Translate. When you switch languages, Google receives the page content it needs in order to translate it, and sets its own cookie to remember your choice. That processing is governed by Google's privacy policy, not ours.",
            "Photographs on this site are served from Unsplash's image CDN, which receives the usual request information any image host would.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "Enquiries are kept for as long as they are useful to the conversation, and removed on request. Because form data in this build lives in your browser, clearing your site data removes it immediately.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us what we hold about you, ask for it to be corrected, or ask us to delete it. Write to ${site.email} and we will deal with it.`,
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If the way we handle information changes — for example, when enquiries start going to a CRM — we will update this page and change the date at the top.",
          ],
        },
      ]}
    />
  );
}
