import Header from './Header';
import Footer from './Footer';
import RequestBidModal from './RequestBidModal';
import ApplicationModal from './ApplicationModal';

export default function SitePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <RequestBidModal />
      <ApplicationModal />
    </>
  );
}
