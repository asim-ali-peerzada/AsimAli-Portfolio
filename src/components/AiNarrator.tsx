import React, { useEffect, useState } from 'react';
import { API_BASE } from '../lib/api.js';
import { Button } from './ui/button.js';

const AiNarrator = ({ projectData, pdfFile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [narrative, setNarrative] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formattedSections, setFormattedSections] = useState([]);
  const [phase, setPhase] = useState<'idle' | 'generating' | 'thinking'>('idle');
  const thinkingDelay = 800; // ms before switching to 'Thinking...'
  let thinkingTimer: ReturnType<typeof setTimeout> | null = null;

  const callAi = async () => {
    setLoading(true);
    setError('');
    setNarrative('');
    setFormattedSections([]);
    setPhase('generating');
    // schedule transition to 'thinking'
    thinkingTimer = setTimeout(() => setPhase('thinking'), thinkingDelay);

    try {
      const formData = new FormData();

      // Add project data
      Object.keys(projectData).forEach((key) => {
        if (Array.isArray(projectData[key])) {
          projectData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, projectData[key]);
        }
      });

      // Add PDF if provided. If pdfFile is a URL (string), fetch it as blob first.
      if (pdfFile) {
        try {
          if (typeof pdfFile === 'string') {
            const pdfRes = await fetch(pdfFile);
            const pdfBlob = await pdfRes.blob();
            formData.append('pdf', pdfBlob, 'project.pdf');
          } else {
            // assume File/Blob
            formData.append('pdf', pdfFile);
          }
        } catch {
          // failed to fetch pdfFile, continue without it
        }
      }

      // Build headers safely — only include CSRF token if a meta tag exists
      const headers: Record<string, string> = {
        'X-AI-Narrator-Secret': import.meta.env.VITE_AI_NARRATOR_SECRET,
        Accept: 'application/json',
      };
      const csrfMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
      const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : null;
      if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken;

      const response = await fetch(`${API_BASE}/ai-narrator/generate`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setNarrative(data.narrative);
        const sections = formatNarrativeForDisplay(data.narrative);
        setFormattedSections(sections);
      } else {
        setError(data.message || 'Failed to generate narrative');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
      setPhase('idle');
      if (thinkingTimer) {
        clearTimeout(thinkingTimer);
        thinkingTimer = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (thinkingTimer) clearTimeout(thinkingTimer);
    };
  }, []);

  const handleCopy = () => {
    // Create a plain text version of the narrative
    const plainText = narrative;

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    // Create a downloadable text file
    const element = document.createElement('a');
    const file = new Blob([narrative], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${projectData.title}_AI_Narrative.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mt-6">
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          try {
            e.stopPropagation();
          } catch {
            /* ignore */
          }
          void callAi();
        }}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
          try {
            e.stopPropagation();
          } catch {
            /* ignore */
          }
        }}
        onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => {
          try {
            e.stopPropagation();
          } catch {
            /* ignore */
          }
        }}
        disabled={loading}
        size="sm"
      >
        {loading ? (phase === 'generating' ? 'Generating...' : 'Thinking...') : 'AI Narrator'}
      </Button>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {formattedSections.length > 0 && (
        <div className="mt-4 relative">
          {/* Neon gradient glow */}
          <div
            className="absolute -inset-1 rounded-lg blur-xl opacity-30 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"
            aria-hidden
          />

          <div className="relative p-6 bg-card/95 border border-border rounded-lg shadow-2xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold tracking-wide">AI Narrative</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Polished summary generated by the AI Narrator
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="text-xs px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary"
                  aria-label="Copy narrative"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="text-xs px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 text-primary"
                  aria-label="Download narrative"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiNarrator;
