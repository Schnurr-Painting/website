import Header from './Header';
import Footer from './Footer';
import RequestBidModal from './RequestBidModal';
import ApplicationModal from './ApplicationModal';
import { getSiteSettings, getRequestBidSection } from '@/lib/sanity/queries';
import { editAttr } from '@/lib/sanity/edit';

export default async function SitePage({ children }: { children: React.ReactNode }) {
  const [settings, requestBidSection] = await Promise.all([
    getSiteSettings(),
    getRequestBidSection(),
  ]);

  return (
    <>
      <Header
        logo={settings?.brand?.logo}
        logoAlt={settings?.brand?.logoAlt}
        logoEdit={editAttr(settings, 'brand.logo')}
      />
      <main>{children}</main>
      <Footer />
      <RequestBidModal section={requestBidSection} />
      <ApplicationModal />
    </>
  );
}
