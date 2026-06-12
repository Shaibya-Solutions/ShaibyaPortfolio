import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppCTAProps {
  text?: string;
  className?: string;
  message?: string;
}

export function WhatsAppCTA({
  text = "Start a conversation",
  className = "",
  message = "Hi, I am interested in your digital solutions.",
}: WhatsAppCTAProps) {
  const phoneNumber = "+919876543210"; // Placeholder, to be updated
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-teal-600 bg-teal-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-teal-600/30 hover:-translate-y-1 ${className}`}
    >
      <FaWhatsapp className="text-xl" />
      {text}
    </a>
  );
}
