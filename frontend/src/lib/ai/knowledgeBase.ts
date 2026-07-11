import { portfolioData } from "@/data/portfolio";

export interface KBDocument {
  id: string;
  type: "about" | "skill" | "project" | "education" | "experience" | "contact" | "certificate" | "resume";
  title: string;
  content: string;
  metadata?: any;
}

export const generateKnowledgeBase = (): KBDocument[] => {
  const docs: KBDocument[] = [];

  // About
  docs.push({
    id: "about_1",
    type: "about",
    title: "About Aman Sharma",
    content: `Aman Sharma is a ${portfolioData.personal.title}. ${portfolioData.personal.bio}`,
  });

  // Contact
  docs.push({
    id: "contact_1",
    type: "contact",
    title: "Contact Information",
    content: `You can reach Aman via email at ${portfolioData.personal.email}, on LinkedIn at ${portfolioData.personal.linkedin}, or on GitHub at ${portfolioData.personal.github}.`,
    metadata: {
      email: portfolioData.personal.email,
      linkedin: portfolioData.personal.linkedin,
      github: portfolioData.personal.github
    }
  });

  // Resume
  docs.push({
    id: "resume_1",
    type: "resume",
    title: "Resume & CV",
    content: "You can view and download Aman's resume from the main portfolio page or ask for a direct download link.",
  });

  // Skills
  docs.push({
    id: "skills_1",
    type: "skill",
    title: "Programming Languages & Frameworks",
    content: `Aman's skills include:\n- **Programming**: ${portfolioData.skills.programming.join(", ")}\n- **Frontend**: ${portfolioData.skills.frontend.join(", ")}\n- **Core**: ${portfolioData.skills.core.join(", ")}\n- **Tools**: ${portfolioData.skills.tools.join(", ")}`,
  });

  // Projects
  portfolioData.projects.forEach((proj, idx) => {
    docs.push({
      id: `project_${idx}`,
      type: "project",
      title: proj.title,
      content: `**Project**: ${proj.title} - ${proj.subtitle}\n**Description**: ${proj.description}\n**Tech Stack**: ${proj.tech.join(", ")}\n**Features**: ${proj.features?.join(", ") || "N/A"}\n**Architecture**: ${proj.architecture || "N/A"}`,
      metadata: proj
    });
  });

  // Education
  docs.push({
    id: "education_1",
    type: "education",
    title: "Education History",
    content: `Aman is pursuing his ${portfolioData.education.degree} at ${portfolioData.education.institution} (Graduating ${portfolioData.education.graduationYear}) with a CGPA of ${portfolioData.education.cgpa}. He completed his secondary and senior secondary education at Saraswati Vidya Mandir.`,
  });

  // Experience
  portfolioData.experience.forEach((exp, idx) => {
    docs.push({
      id: `exp_${idx}`,
      type: "experience",
      title: exp.role,
      content: `**Role**: ${exp.role}\n**Organization**: ${exp.organization}\n**Duration**: ${exp.duration}\n**Description**: ${exp.description}`,
      metadata: exp
    });
  });

  // Certificates
  portfolioData.certifications.forEach((cert, idx) => {
    docs.push({
      id: `cert_${idx}`,
      type: "certificate",
      title: cert.title,
      content: `**Certificate**: ${cert.title} by ${cert.issuer} (${cert.year})\n**Description**: ${cert.description}`,
      metadata: cert
    });
  });

  return docs;
};

export const knowledgeBase = generateKnowledgeBase();
