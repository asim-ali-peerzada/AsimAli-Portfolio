import { API_BASE } from '@/lib/api';
import { Loader2, Send, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface PingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PingReason =
  'Hiring / Recruiting' | 'Project Inquiry' | 'Collaboration' | 'Just Exploring' | 'Other';

const PingModal = ({ isOpen, onClose }: PingModalProps) => {
  const [selectedReason, setSelectedReason] = useState<PingReason | null>(null);
  const [contactInfo, setContactInfo] = useState('');
  const [context, setContext] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const reasons: PingReason[] = [
    'Hiring / Recruiting',
    'Project Inquiry',
    'Collaboration',
    'Just Exploring',
    'Other',
  ];

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Basic phone number validation: allows +, digits, spaces, and dashes. Min 7 digits.
    return /^[+]?[( ]?\d{1,4}[) ]?[-s./\d]{7,15}$/.test(phone);
  };

  const isValidContact = (contact: string) => {
    return isValidEmail(contact) || isValidPhone(contact);
  };

  const isFormValid = selectedReason && contactInfo && isValidContact(contactInfo);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_BASE}/ping-asim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          reason: selectedReason,
          contact_info: contactInfo,
          context: context || null,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          // Reset form
          setSelectedReason(null);
          setContactInfo('');
          setContext('');
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop - fixed to viewport */}
      <button
        type="button"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative z-10 bg-background rounded-2xl shadow-2xl w-full max-w-md border border-border/50 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-5">
          {submitStatus === 'success' ? (
            <div className="text-center py-6 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-1">Thanks for the ping!</h3>
              <p className="text-sm text-muted-foreground">Asim has been notified.</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold mb-0.5">Let Asim know you're here</h2>
              <p className="text-xs text-muted-foreground mb-4">
                A quick way to introduce yourself. No sign-up required.
              </p>

              {/* Reason Selection */}
              <div className="mb-4">
                <label htmlFor="ping-reason" className="block text-xs font-medium mb-2">
                  Why are you visiting?
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {reasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      className={`px-2 py-2 text-xs rounded-lg border transition-all duration-200 ${
                        selectedReason === reason
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required Contact */}
              <div className="mb-3">
                <label htmlFor="ping-contact" className="block text-xs font-medium mb-1">
                  Your Email or Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="ping-contact"
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Enter email or WhatsApp number"
                  className={`w-full px-3 py-2 rounded-lg border bg-background outline-none transition-all text-sm ${
                    contactInfo && !isValidContact(contactInfo)
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                />
                {contactInfo && !isValidContact(contactInfo) && (
                  <p className="text-[10px] text-red-500 mt-1">
                    Please enter a valid email or phone number.
                  </p>
                )}
              </div>

              {/* Optional Context */}
              <div className="mb-4">
                <label htmlFor="ping-context" className="block text-xs font-medium mb-1">
                  Quick note <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  id="ping-context"
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Anything you'd like to share..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Transparency Note */}
              <div className="mb-4 p-2.5 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                <p>
                  📧{' '}
                  <a
                    href="mailto:asimalipeerzada@gmail.com"
                    className="text-primary hover:underline"
                  >
                    asimalipeerzada@gmail.com
                  </a>
                </p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="w-full rounded-lg py-5 text-sm font-medium"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Notify Asim
                  </>
                )}
              </Button>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center mt-3">
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PingModal;
