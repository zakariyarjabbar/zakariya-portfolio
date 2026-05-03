import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowIBuild } from "@/components/HowIBuild";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { SelectedProjects } from "@/components/SelectedProjects";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <SelectedProjects />
        <About />
        <HowIBuild />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
