import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import DownloadSection from "./components/DownloadSection";
import FaqSection from "./components/FaqSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import IconSprite from "./components/IconSprite";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <IconSprite />
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <DownloadSection />
        <FaqSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
