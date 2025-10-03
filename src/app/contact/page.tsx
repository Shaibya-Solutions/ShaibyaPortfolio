import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className='container-balanced py-16 md:py-24'>
      <h1 className='h2'>FAQ</h1>
      <div className='mt-6 grid gap-8 md:grid-cols-2'>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='q1'>
            <AccordionTrigger>How can AI benefit my business?</AccordionTrigger>
            <AccordionContent>
              Faster experimentation, lower operational cost, and better
              experiences across your stack.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='q2'>
            <AccordionTrigger>
              What’s your approach to AI implementation?
            </AccordionTrigger>
            <AccordionContent>
              Discovery → Design → Deployment, with governance and observability
              at each step.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='q3'>
            <AccordionTrigger>
              What is the typical timeline for an AI project?
            </AccordionTrigger>
            <AccordionContent>
              Proof of Concept in 2–4 weeks, production in 6–12 weeks depending
              on scope.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='q4'>
            <AccordionTrigger>What are the costs?</AccordionTrigger>
            <AccordionContent>
              Engagements are scoped to outcomes; we’ll align on a clear, fixed
              proposal.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='mt-12 rounded-2xl border border-border/60 p-8 text-center'>
        <h3 className='font-serif text-2xl'>Start a Conversation</h3>
        <p className='p mt-2'>
          Tell us about your goals and constraints; we’ll share an approach and
          a path forward.
        </p>
        <Button className='mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90'>
          Get a Consultation
        </Button>
      </div>
    </div>
  );
}
