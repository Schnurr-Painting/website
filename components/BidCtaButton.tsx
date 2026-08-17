'use client';

export default function BidCtaButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).openBidModal) {
          (window as any).openBidModal();
        }
      }}
    >
      {children}
    </button>
  );
}
