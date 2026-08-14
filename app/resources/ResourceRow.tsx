'use client';

import styles from './page.module.css';

interface Props {
  title: string;
  description: string;
  resourceType: string;
  isRequest: boolean;
  href: string;
}

export default function ResourceRow({ title, description, resourceType, isRequest, href }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (isRequest) {
      e.preventDefault();
      if (typeof window !== 'undefined' && (window as any).openBidModal) {
        (window as any).openBidModal();
      }
    }
  };

  return (
    <a className={styles.resourceRow} href={href} onClick={handleClick}>
      <div>
        <span className={styles.resourceType}>
          {resourceType}{isRequest ? ' · Request Required' : ''}
        </span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <strong aria-hidden="true" className={styles.arrow}>→</strong>
    </a>
  );
}
