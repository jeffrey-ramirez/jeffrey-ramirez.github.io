import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { DeveloperActivity } from "@/components/DeveloperActivity";
import { EngineeringApproach } from "@/components/EngineeringApproach";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Resume } from "@/components/Resume";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ProjectShowcase />
        <ExperienceTimeline />
        <EngineeringApproach />
        <DeveloperActivity />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
