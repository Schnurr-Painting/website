'use client';

export default function ApplyButton({ positionTitle, roleType }: { positionTitle: string; roleType: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).openBidModal) {
      (window as any).openBidModal();
    }
  };

  return (
    <button type="button" className="btn btn-primary" style={{ marginTop: 18, cursor: 'pointer' }} onClick={handleClick}>
      Apply Now →
    </button>
  );
}
