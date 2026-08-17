import Header from './Header';
import Footer from './Footer';
import RequestBidModal from './RequestBidModal';
import ApplicationModal from './ApplicationModal';
import { getSiteSettings, getRequestBidSection } from '@/lib/sanity/queries';

export default async function SitePage({ children }: { children: React.ReactNode }) {
  const [settings, requestBidSection] = await Promise.all([
    getSiteSettings(),
    getRequestBidSection(),
  ]);

  return (
    <>
      <Header logo={settings?.brand?.logo} logoAlt={settings?.brand?.logoAlt} />
      <main>{children}</main>
      <Footer />
      <RequestBidModal section={requestBidSection} />
      <ApplicationModal />
    </>
  );
}
