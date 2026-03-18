import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Studio } from './pages/Studio';
import { Work } from './pages/Work';
import { WorkDetail } from './pages/WorkDetail';
import { Contact } from './pages/Contact';
import { ContactUs } from './components/sections/ContactUs';
import { MonoFooter } from './components/sections/MonoFooter';
import { FloatingFooter } from './components/layout/FloatingFooter';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <>
      {children}
      {/* Если мы НЕ на странице contact, показываем глобальные подвалы. На странице contact они уже встроены. */}
      {!isContactPage && (
        <>
          <ContactUs />
          <MonoFooter />
        </>
      )}
      <FloatingFooter />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <main className='relative bg-[#0e100f] min-h-screen font-sans antialiased text-white selection:bg-white selection:text-black'>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<WorkDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainLayout>
      </main>
    </Router>
  );
}