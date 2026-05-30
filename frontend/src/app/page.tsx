import Navbar from "@/components/common/Navbar";
import Hero from "@/components/common/Hero";
import Features from "@/components/common/Features";
import Workflow from "@/components/common/Workflow";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Footer />
    </>
  );
}