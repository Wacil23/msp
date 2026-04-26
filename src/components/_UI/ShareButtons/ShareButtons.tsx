"use client";
import {
  BsFacebook,
  BsTwitterX,
  BsLinkedin,
  BsWhatsapp,
} from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const message = encodeURIComponent(title);
  const encoded = encodeURIComponent(url);

  const open = (link: string) => window.open(link, "_blank", "noopener");
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not supported */
    }
  };

  const buttons = [
    {
      icon: BsFacebook,
      label: "Facebook",
      onClick: () =>
        open(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`),
    },
    {
      icon: BsTwitterX,
      label: "X / Twitter",
      onClick: () =>
        open(`https://twitter.com/intent/tweet?url=${encoded}&text=${message}`),
    },
    {
      icon: BsLinkedin,
      label: "LinkedIn",
      onClick: () =>
        open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
        ),
    },
    {
      icon: BsWhatsapp,
      label: "WhatsApp",
      onClick: () => open(`https://wa.me/?text=${message}%20${encoded}`),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {buttons.map(({ icon: Icon, label, onClick }) => (
        <button
          key={label}
          type="button"
          aria-label={`Partager sur ${label}`}
          onClick={onClick}
          className="grid h-8 w-8 place-items-center rounded-md border border-line bg-main text-ink-2 transition-colors hover:border-secondary hover:bg-light hover:text-forest"
        >
          <Icon size={13} />
        </button>
      ))}
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copier le lien"
        className="grid h-8 w-8 place-items-center rounded-md border border-line bg-main text-ink-2 transition-colors hover:border-secondary hover:bg-light hover:text-forest"
      >
        <FiLink size={13} />
      </button>
      {copied && (
        <span className="text-2xs font-medium text-forest">Copié</span>
      )}
    </div>
  );
};
