import { metadataFor } from "@/lib/seo/metadata";
import { pageGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Footer } from "@/components/ui/footer-section";

export const metadata = metadataFor("/privacy-policy");

const contents = [
  ["scope", "Who this policy covers"],
  ["information", "Information we handle"],
  ["purpose", "How we use information"],
  ["forms", "WhatsApp and email applications"],
  ["third-parties", "Service providers and external links"],
  ["cookies", "Cookies and browser storage"],
  ["retention", "Retention and security"],
  ["rights", "Your choices and rights"],
  ["children", "Younger visitors"],
  ["updates", "Changes to this policy"],
  ["contact", "Contact us about privacy"],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={pageGraph("/privacy-policy")} />
      <SiteHeader />
      <section className="pt-44 lg:pt-52 pb-16 lg:pb-20 bg-[#F8FAFB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500 mb-5">Your Information</p>
          <h1 className="font-heading font-bold tracking-tight text-[clamp(2.6rem,6vw,5rem)] leading-tight mb-6">Privacy Policy</h1>
          <p className="max-w-2xl text-lg text-slate-500 leading-relaxed">
            This policy explains what information is involved when you browse our website,
            contact Shaibya Solutions, or apply for an opportunity, and the choices available to you.
          </p>
          <p className="text-sm text-slate-500 mt-6">Effective and last updated: <time dateTime="2026-11-02">2 November 2026</time></p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-12 lg:gap-20 items-start">
        <nav aria-label="Privacy policy contents" className="lg:sticky lg:top-32 rounded-2xl bg-[#F8FAFB] border border-[#E5E7EB] p-6">
          <p className="font-semibold text-sm mb-4">On this page</p>
          <ol className="space-y-3 text-sm text-slate-500">
            {contents.map(([id, title], index) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-flex gap-2 hover:text-sky-600 transition-colors">
                  <span className="text-sky-500">{String(index + 1).padStart(2, "0")}.</span>{title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 space-y-12 text-slate-600 leading-relaxed [&_section]:scroll-mt-36 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-4 [&_p+p]:mt-4 [&_a]:break-words [&_a]:text-sky-600 [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
          <section id="scope" aria-labelledby="scope-heading">
            <h2 id="scope-heading">1. Who this policy covers</h2>
            <p>
              Shaibya Solutions is responsible for the enquiry and application information it receives
              through this website and its business contact channels. This policy covers visitors to
              www.shaibyasolutions.com, prospective clients, people making enquiries, and career applicants.
              Data handled inside a client’s own software or under a separate service agreement is
              governed by that agreement and the relevant privacy notice.
            </p>
          </section>

          <section id="information" aria-labelledby="information-heading">
            <h2 id="information-heading">2. Information we handle</h2>
            <ul>
              <li><strong>Enquiries:</strong> your name, business name, service interests, message, and the contact details you choose to share by WhatsApp or email.</li>
              <li><strong>Applications:</strong> the role you are interested in, your contact details, CV, work history, portfolio links, and other information you include in your email.</li>
              <li><strong>Technical information:</strong> hosting and content-delivery providers may process IP addresses, browser/device information, request times, and requested pages to deliver and secure the site.</li>
            </ul>
            <p>Please share only what is needed for your enquiry or application. Do not send passwords, payment-card details, government identification, or confidential client or employee records through these channels.</p>
          </section>

          <section id="purpose" aria-labelledby="purpose-heading">
            <h2 id="purpose-heading">3. How we use information</h2>
            <p>We use relevant information to:</p>
            <ul>
              <li>Respond to enquiries, understand project requirements, and discuss services or proposals.</li>
              <li>Review applications and communicate with applicants about opportunities.</li>
              <li>Maintain business correspondence, protect our services, and meet applicable legal obligations.</li>
            </ul>
            <p>
              Where applicable, this processing is based on your request or consent, steps needed
              before entering a contract, legitimate business interests permitted by law, or legal
              obligations. Making an enquiry or application does not subscribe you to a marketing mailing list.
            </p>
          </section>

          <section id="forms" aria-labelledby="forms-heading">
            <h2 id="forms-heading">4. WhatsApp and email applications</h2>
            <p>
              The contact form prepares a WhatsApp message from the details you enter. Choosing
              “Send via WhatsApp” opens WhatsApp and passes those details to it as a message draft.
              The form does not upload entries to a Shaibya website database. We receive the message
              when you choose to send it in WhatsApp.
            </p>
            <p>
              Career application links open your email application with a suggested subject and
              message. Attach your CV and send the email yourself. Opening an email draft does not
              submit an application to us. Your email provider and WhatsApp handle information
              under their own terms and privacy policies.
            </p>
          </section>

          <section id="third-parties" aria-labelledby="third-parties-heading">
            <h2 id="third-parties-heading">5. Service providers and external links</h2>
            <p>
              We use service providers for website hosting and delivery, email, and business
              messaging. Information may be handled by those providers and by people who need
              it to respond to your enquiry or review your application. We may also disclose
              information when legally required or necessary to protect legal rights. We do not sell enquiry or application information.
            </p>
            <p>
              Some fonts, images, and visual resources load from third-party services, including
              Google Fonts, CDNFonts, and external image or content-delivery providers. When these
              resources load, the provider may receive your IP address and browser/request information.
              External social and portfolio links take you to independently operated websites.
            </p>
            <p>
              See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a> and{' '}
              <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp’s privacy policy</a> for those services.
              Providers may process information in countries other than your own. Applicable
              contractual and legal requirements govern international transfers where required.
            </p>
          </section>

          <section id="cookies" aria-labelledby="cookies-heading">
            <h2 id="cookies-heading">6. Cookies and browser storage</h2>
            <p>
              The website does not currently include third-party analytics or advertising tracking
              scripts. Hosting services and external websites may use their own technical storage
              or cookies. You can manage cookies and site data through your browser, and review
              the settings of services such as WhatsApp or your email provider separately.
            </p>
            <p>If we introduce analytics, advertising tools, or other uses that require consent, we will update this notice and provide the relevant choices before using them.</p>
          </section>

          <section id="retention" aria-labelledby="retention-heading">
            <h2 id="retention-heading">7. Retention and security</h2>
            <p>
              We retain enquiry, application, and business correspondence for as long as needed
              for the purpose for which it was received, including follow-up, recruitment decisions,
              record keeping, and applicable legal obligations. When information is no longer
              needed, we aim to delete or anonymise it. Provider backups and logs may follow their
              own retention schedules.
            </p>
            <p>
              We use reasonable organisational and technical measures to protect information and
              limit access to people who need it. No internet transmission or storage method is
              completely secure. Contact us if you believe information shared with us has been compromised.
            </p>
          </section>

          <section id="rights" aria-labelledby="rights-heading">
            <h2 id="rights-heading">8. Your choices and rights</h2>
            <p>
              Depending on the law that applies to you, you may request access to, correction of,
              or deletion of your personal information, withdraw consent where processing relies
              on it, or raise a privacy concern. Some requests may be subject to lawful retention
              requirements or other exceptions. Withdrawing consent does not affect processing
              that was lawful before withdrawal.
            </p>
            <p>
              Email us using the contact below and describe your request. We may ask for information
              reasonably needed to verify your identity, without requesting unnecessary sensitive
              documents. We will respond within the time required by applicable law. You may also
              contact the relevant data-protection authority where that right is available.
            </p>
          </section>

          <section id="children" aria-labelledby="children-heading">
            <h2 id="children-heading">9. Younger visitors</h2>
            <p>
              This website is intended for business contacts and people exploring career
              opportunities. If you are under 18, please involve a parent or guardian before
              sharing application information. A parent or guardian can contact us about
              information a child may have provided.
            </p>
          </section>

          <section id="updates" aria-labelledby="updates-heading">
            <h2 id="updates-heading">10. Changes to this policy</h2>
            <p>We may update this policy when our services, information practices, or legal requirements change. The date at the top identifies the latest version. Material changes will be highlighted here or communicated where required.</p>
          </section>

          <section id="contact" aria-labelledby="contact-heading" className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFB] p-6 md:p-8">
            <h2 id="contact-heading">11. Contact us about privacy</h2>
            <p>
              For privacy questions, requests, or grievances, contact Shaibya Solutions at{' '}
              <a href="mailto:shaibyasolutions@gmail.com?subject=Privacy%20request">shaibyasolutions@gmail.com</a>.
              Please use “Privacy request” in your subject line and explain how we can help.
            </p>
            <p>For general project enquiries, visit our <Link href="/contact">contact page</Link>.</p>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  );
}
