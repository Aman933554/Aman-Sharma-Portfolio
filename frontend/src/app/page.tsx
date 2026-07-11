import BootSequence from "@/components/BootSequence";
import Background3D from "@/components/Background3D";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import Terminal from "@/components/Terminal";
import RecruiterMode from "@/components/RecruiterMode";
import Footer from "@/components/Footer";
import CodingProfiles from "@/components/CodingProfiles";
import Blog from "@/components/Blog";
import Achievements from "@/components/Achievements";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Global Background */}
      <Background3D />
      
      {/* Boot Overlay */}
      <BootSequence />
      
      {/* Global Overlays */}
      <Navbar />
      <AIAssistant />
      <Terminal />
      <RecruiterMode />
      
      {/* Main OS Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <div id="home" className="w-full"><Hero /></div>
        <div id="about" className="w-full"><About /></div>
        <div id="journey" className="w-full"><Journey /></div>
        <div id="skills" className="w-full"><Skills /></div>
        <div id="projects" className="w-full"><Projects /></div>
        <div id="experience" className="w-full"><Experience /></div>
        <div id="education" className="w-full"><Education /></div>
        <div id="coding-profiles" className="w-full"><CodingProfiles /></div>
        <div id="certificates" className="w-full"><Certifications /></div>
        <div id="blog-section" className="w-full"><Blog /></div>
        <div id="contact-section" className="w-full"><Contact /></div>
      </div>
      <Achievements />
      <Footer />
    </main>
  );
}
