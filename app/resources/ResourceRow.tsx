'use client';

import { PortableText } from '@portabletext/react';
import { richBodyComponents } from '@/components/RichBody';
import styles from './page.module.css';

interface Props {
  title: string;
  description?: any[];
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
        {description && description.length > 0 && (
          <PortableText value={description} components={richBodyComponents} />
        )}
      </div>
      <strong aria-hidden="true" className={styles.arrow}>→</strong>
    </a>
  );
}
