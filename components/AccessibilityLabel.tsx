// Accessibility utilities for WCAG 2.1 AA compliance

export const SkipToMainContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only absolute top-0 left-0 bg-agent-blue text-white px-4 py-2 z-[100] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
    >
      Skip to main content
    </a>
  );
};

export const ScreenReaderText = ({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
);
