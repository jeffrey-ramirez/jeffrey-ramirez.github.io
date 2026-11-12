import { About } from "@/components/About";
import { CaseFiles } from "@/components/CaseFiles";
import { CommandMenu } from "@/components/CommandMenu";
import { Contact } from "@/components/Contact";
import { EngineeringApproach } from "@/components/EngineeringApproach";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FieldNotes } from "@/components/FieldNotes";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ShippedFor } from "@/components/ShippedFor";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ShippedFor />
        <CaseFiles />
        <About />
        <FieldNotes />
        <Skills />
        <ExperienceTimeline />
        <EngineeringApproach />
        <Contact />
      </main>
      <Footer />
      <CommandMenu />
    </>
  );
}
