import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Product from "@/components/sections/Product";
import Benefits from "@/components/sections/Benefits";
import Team from "@/components/sections/Team";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Product />
        <Benefits />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
