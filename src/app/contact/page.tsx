import type { Metadata } from "next";
import ContactClient from "@/components/pages/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Project Enquiry | Shaibya Solutions",
  description: "Get in touch with Shaibya Solutions to automate your workflows, build custom software, or design enterprise real estate and fitness systems.",
  alternates: {
    canonical: "https://shaibya.solutions/contact",
  },
  openGraph: {
    title: "Contact Us & Project Enquiry | Shaibya Solutions",
    description: "Get in touch with Shaibya Solutions to automate your workflows, build custom software, or design enterprise real estate and fitness systems.",
    url: "https://shaibya.solutions/contact",
    type: "website",
  },
};

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Project timelines vary based on complexity. Most business websites are delivered within 2–4 weeks, while more advanced platforms—such as CRM systems, booking platforms, or custom web applications—typically take 4–8 weeks. Following our initial consultation, we'll provide a detailed project roadmap with clear milestones and delivery timelines."
  },
  {
    q: "Can you handle RERA requirements for real estate?",
    a: "Yes. We build real estate platforms with RERA compliance considerations, including required disclosures, project registration details, and compliant advertisement formats. Our solutions are designed to help you present property information accurately while meeting industry requirements."
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Absolutely. Every project includes 30 days of complimentary post-launch support to ensure a smooth transition. Beyond that, we offer flexible maintenance plans tailored to your needs. Many clients continue working with us long-term as we help optimize, maintain, and continuously improve their systems."
  },
  {
    q: "I'm not tech-savvy. Can I still use your systems?",
    a: "Absolutely. Our solutions are designed for business owners and teams—not just technical users. We focus on creating simple, intuitive experiences that are easy to adopt. If you can use everyday tools like WhatsApp, you can confidently use our systems. We also provide hands-on training to help your team get started."
  }
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://shaibya.solutions/contact/#webpage",
        "url": "https://shaibya.solutions/contact",
        "name": "Contact Us | Shaibya Solutions",
        "description": "Get in touch with Shaibya Solutions to automate your workflows, build custom software, or design enterprise real estate and fitness systems."
      },
      {
        "@type": "FAQPage",
        "@id": "https://shaibya.solutions/contact/#faq",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient faqs={faqs} />
    </>
  );
}
