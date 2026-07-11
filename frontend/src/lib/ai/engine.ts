import Fuse from "fuse.js";
import { knowledgeBase, KBDocument } from "./knowledgeBase";

const fuseOptions = {
  includeScore: true,
  threshold: 0.4, // Fuzzy matching threshold
  keys: [
    { name: "title", weight: 0.7 },
    { name: "content", weight: 0.5 },
    { name: "type", weight: 0.3 }
  ],
};

const fuse = new Fuse(knowledgeBase, fuseOptions);

export interface AIResponse {
  answer: string;
  suggestions: string[];
}

// Intent detection helper
const detectIntent = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.match(/^(hi|hello|hey|greetings|hola)/)) return "greeting";
  if (lowerQuery.includes("resume") || lowerQuery.includes("cv")) return "resume";
  if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("hire") || lowerQuery.includes("reach")) return "contact";
  if (lowerQuery.includes("internship") || lowerQuery.includes("job") || lowerQuery.includes("hire")) return "internship";
  if (lowerQuery.match(/(who is aman|about aman|who are you|tell me about yourself)/)) return "about";
  return "search";
};

export const generateResponse = async (query: string): Promise<AIResponse> => {
  // Simulate network delay for a more natural feel
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

  const intent = detectIntent(query);

  if (intent === "greeting") {
    return {
      answer: "Hello! 👋 I'm Aman's AI Portfolio Assistant. I can tell you about his projects, skills, education, experience, or provide his resume and contact details. How can I help you today?",
      suggestions: ["Tell me about Aman", "Show Projects", "What are his skills?", "Download Resume"]
    };
  }

  if (intent === "internship") {
    return {
      answer: "Aman is highly motivated and actively looking for internship opportunities where he can contribute his skills in web development, AI/ML, and software engineering. He learns quickly and loves solving real-world problems.\n\nWould you like to connect with him or see his resume?",
      suggestions: ["Contact Aman", "Download Resume", "Show Projects"]
    };
  }

  // Perform semantic/fuzzy search
  const results = fuse.search(query);

  if (results.length === 0) {
    return {
      answer: "I don't have verified information about that yet. Please try asking about Aman's projects, skills, education, or experience.",
      suggestions: ["Show Projects", "Skills", "Education", "Contact"]
    };
  }

  // Take the best match
  const bestMatch = results[0].item as KBDocument;

  // Format response based on type
  let answer = "";
  let suggestions: string[] = [];

  switch (bestMatch.type) {
    case "project":
      const p = bestMatch.metadata;
      answer = `### 🚀 ${p.title} - ${p.subtitle}\n\n`;
      answer += `**Overview**: ${p.description}\n\n`;
      if (p.features && p.features.length > 0) {
        answer += `**Features**:\n${p.features.map((f: string) => `- ${f}`).join("\n")}\n\n`;
      }
      answer += `**Tech Stack**: ${p.tech.join(", ")}\n\n`;
      if (p.architecture) answer += `**Architecture**: ${p.architecture}\n\n`;
      
      // Links
      answer += `[View on GitHub](${p.githubUrl}) | [Live Demo](${p.liveUrl})`;
      
      suggestions = ["Show other projects", "What are his skills?", "Contact Aman"];
      break;
      
    case "skill":
      answer = `### 💻 Aman's Technical Skills\n\n${bestMatch.content}`;
      suggestions = ["Show Projects", "Where did he study?", "Experience"];
      break;

    case "education":
      answer = `### 🎓 Education Journey\n\n${bestMatch.content}`;
      suggestions = ["Show Certifications", "Show Projects", "Resume"];
      break;

    case "experience":
      answer = `### 💼 Professional Experience\n\n${bestMatch.content}`;
      suggestions = ["What projects has he built?", "Resume", "Contact"];
      break;

    case "about":
      answer = `### 👨‍💻 About Aman\n\n${bestMatch.content}`;
      suggestions = ["What are his skills?", "Show Projects", "Education"];
      break;

    case "contact":
      answer = `### 📬 Get in Touch\n\n${bestMatch.content}`;
      suggestions = ["Download Resume", "View Projects"];
      break;

    case "resume":
      answer = `### 📄 Resume\n\n${bestMatch.content}\n\n[📥 Download Resume](/Aman_Sharma_Resume.pdf)`; // Assuming resume path
      suggestions = ["Contact Aman", "Show Projects"];
      break;

    case "certificate":
      answer = `### 📜 Certification\n\n${bestMatch.content}`;
      suggestions = ["Show other certifications", "Show Projects", "Education"];
      break;
      
    default:
      answer = bestMatch.content;
      suggestions = ["Tell me about Aman", "Show Projects"];
  }

  // If the query was very generic like "projects", we can list them all
  if (query.toLowerCase().trim() === "projects" || query.toLowerCase() === "show projects") {
    const projects = knowledgeBase.filter(doc => doc.type === "project");
    answer = `### 🚀 Aman's Projects\n\nHere are some of the key projects Aman has worked on:\n\n`;
    projects.forEach(p => {
      answer += `- **${p.title}**: ${p.metadata.subtitle}\n`;
    });
    answer += `\nWhich one would you like to know more about?`;
    suggestions = projects.slice(0, 3).map(p => `Tell me about ${p.title}`);
  }

  if (query.toLowerCase().trim() === "certifications" || query.toLowerCase() === "show certifications") {
    const certs = knowledgeBase.filter(doc => doc.type === "certificate");
    answer = `### 📜 Certifications\n\nAman has completed the following certifications:\n\n`;
    certs.forEach(c => {
      answer += `- **${c.title}** from ${c.metadata.issuer}\n`;
    });
    suggestions = ["Show Projects", "Education"];
  }

  return { answer, suggestions };
};
