import About from "@/components/about/About";
import Carousel from "@/components/carousel/Carousel";
import Footer from "@/components/footer/Footer";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import Menu from "@/components/menu/Menu";

export default function Home() {
  return (
    <>
      <Carousel />
      <HowItWorks />
      <Menu />
      <About />
      <Footer />
    </>
  );
}
