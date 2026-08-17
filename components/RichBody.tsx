import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/image';
import styles from './RichBody.module.css';

export const richBodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img className={styles.inlineImage} src={urlFor(value).width(1000).url()} alt={value?.alt || ''} />
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href || '';
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    },
  },
};

export default function RichBody({ value, className }: { value?: any; className?: string }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className={`${styles.prose} ${className || ''}`}>
      <PortableText value={value} components={richBodyComponents} />
    </div>
  );
}
