"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppWidget({
  phoneNumber,
  message = "Halo, saya ingin bertanya tentang...",
}: WhatsAppWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7" />
      </button>

      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm text-gray-700 animate-fade-in">
          Chat via WhatsApp
        </div>
      )}
    </div>
  );
}
