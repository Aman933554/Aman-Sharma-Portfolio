import BootSequence from "@/components/BootSequence";
import Background3D from "@/components/Background3D";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import OSNav from "@/components/OSNav";
import AIAssistant from "@/components/AIAssistant";
import Terminal from "@/components/Terminal";
import RecruiterMode from "@/components/RecruiterMode";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Global Background */}
      <Background3D />
      
      {/* Boot Overlay */}
      <BootSequence />
      
      {/* Global Overlays */}
      <OSNav />
      <AIAssistant />
      <Terminal />
      <RecruiterMode />
      
      {/* Main OS Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
