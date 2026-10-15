import type { MouseEvent } from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * Back link shared by every standalone page (about, contact, blog, service,
 * project detail) so the control cannot drift between them.
 *
 * The project detail page points at the projects anchor rather than the
 * homepage, and needs to record that intent before navigating, so `href` and
 * `onClick` are both overridable.
 *
 * `className` lets a caller override the default bottom margin when the link
 * sits inside an existing row of controls.
 */
export default function BackToHome({
  label = 'Back to home',
  href = '/',
  onClick,
  className = 'mb-9 sm:mb-10',
}: {
  readonly label?: string;
  readonly href?: string;
  readonly onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  readonly className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 text-[13.5px] text-muted hover:text-white transition-colors w-fit font-display ${className}`}
    >
      <ArrowLeft
        size={16}
        className="text-orange group-hover:-translate-x-1 transition-transform"
        strokeWidth={2}
      />
      <span>{label}</span>
    </a>
  );
}