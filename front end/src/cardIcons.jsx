// SVG line-icons for the agent cards, keyed by agent slug.
// Used only on the card face (AppCards); the emoji in agents.js still drives
// everywhere else. Stroke uses currentColor so the card accent colours it.
const S = (paths) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {paths}
  </svg>
)

export const CARD_ICONS = {
  'hr-agent': S(
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.6 18.6c0-2.95 2.4-4.9 5.4-4.9s5.4 1.95 5.4 4.9" />
      <path d="M16 6.4a2.8 2.8 0 0 1 0 5.4" />
      <path d="M17.4 14.1c2.15.5 3.5 2.25 3.5 4.5" />
    </>
  ),
  coldemail: S(
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="M4.4 7.6l6.45 4.7a2 2 0 0 0 2.3 0L19.6 7.6" />
    </>
  ),
  chatbot: S(
    <>
      <path d="M20 12.2A2.5 2.5 0 0 1 17.5 14.7H10l-3.7 3v-3H6.5A2.5 2.5 0 0 1 4 12.2V6.7A2.5 2.5 0 0 1 6.5 4.2h11A2.5 2.5 0 0 1 20 6.7z" />
      <path d="M8.7 9.5h.01M12 9.5h.01M15.3 9.5h.01" />
    </>
  ),
  'unified-chat': S(
    <>
      <circle cx="12" cy="11" r="2.2" />
      <circle cx="12" cy="4.6" r="1.9" />
      <circle cx="5.2" cy="18" r="1.9" />
      <circle cx="18.8" cy="18" r="1.9" />
      <path d="M12 6.5v2.3M10.4 12.4 6.4 16.4M13.6 12.4l4 4" />
    </>
  ),
  'art-intelligence': S(
    <>
      <path d="M4 4v15a1 1 0 0 0 1 1h15" />
      <path d="M8 16.5v-3.5M12.5 16.5v-6.5M17 16.5v-4.5" />
      <path d="M7.5 10.8l3.3-2.9 2.9 2.3 3.8-4" />
    </>
  ),
  fintechops: S(
    <>
      <circle cx="12" cy="12" r="2.7" />
      <path d="M19.3 13.1a7.6 7.6 0 0 0 0-2.2l1.9-1.5-1.9-3.3-2.25 1a7.4 7.4 0 0 0-1.9-1.1L14.7 3.5h-3.4l-.45 2.5a7.4 7.4 0 0 0-1.9 1.1l-2.25-1L4.8 9.4l1.9 1.5a7.6 7.6 0 0 0 0 2.2l-1.9 1.5 1.9 3.3 2.25-1a7.4 7.4 0 0 0 1.9 1.1l.45 2.5h3.4l.45-2.5a7.4 7.4 0 0 0 1.9-1.1l2.25 1 1.9-3.3z" />
    </>
  ),
  'scheme-compliance-art': S(
    <>
      <path d="M12 3l7 2.5v5.1c0 4.3-2.95 7.6-7 9.4-4.05-1.8-7-5.1-7-9.4V5.5z" />
      <path d="M8.9 11.9l2.2 2.2 4.1-4.4" />
    </>
  ),
  'chargeback-management-system': S(
    <>
      <rect x="2.8" y="5.3" width="18.4" height="11.4" rx="2.2" />
      <path d="M2.8 9.3h18.4" />
      <path d="M15.6 21a3.5 3.5 0 1 0-3.3-4.6" />
      <path d="M11.9 12.7l.45 3.3 3.3-.45" />
    </>
  ),
}
