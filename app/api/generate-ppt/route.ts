import { NextResponse } from "next/server";
import pptxgen from "pptxgenjs";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export async function GET() {
  try {
    const pres = new pptxgen();

    // Configure presentation
    pres.author = profile.name;
    pres.company = profile.name;
    pres.subject = "Professional Portfolio";
    pres.title = `${profile.name} - Portfolio`;

    // Slide 1: Title Slide
    const titleSlide = pres.addSlide();
    titleSlide.background = { color: "0d9488" };
    titleSlide.addText(profile.name, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 1,
      fontSize: 44,
      bold: true,
      color: "FFFFFF",
      align: "center",
    });
    titleSlide.addText(profile.roles.join(" | "), {
      x: 0.5,
      y: 2.7,
      w: 9,
      h: 0.6,
      fontSize: 24,
      color: "E0F2F1",
      align: "center",
    });
    titleSlide.addText(profile.email, {
      x: 0.5,
      y: 4.5,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: "FFFFFF",
      align: "center",
    });

    // Slide 2: About Me / Value Proposition
    const aboutSlide = pres.addSlide();
    aboutSlide.addText("About Me", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    aboutSlide.addText(profile.valueProposition, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2,
      fontSize: 16,
      color: "333333",
      valign: "top",
    });

    // Slide 3: Differentiators
    const differSlide = pres.addSlide();
    differSlide.addText("Key Differentiators", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    
    const differText = profile.differentiators.map((d, i) => `${i + 1}. ${d}`).join("\n\n");
    differSlide.addText(differText, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 12,
      color: "333333",
      valign: "top",
    });

    // Slide 4: Skills - Frontend
    const skillsFrontendSlide = pres.addSlide();
    skillsFrontendSlide.addText("Skills: Frontend", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    skillsFrontendSlide.addText(profile.skills.frontend.join(" • "), {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 1.5,
      fontSize: 14,
      color: "333333",
      valign: "top",
    });

    // Slide 5: Skills - Backend
    const skillsBackendSlide = pres.addSlide();
    skillsBackendSlide.addText("Skills: Backend", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    skillsBackendSlide.addText(profile.skills.backend.join(" • "), {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 2,
      fontSize: 14,
      color: "333333",
      valign: "top",
    });

    // Slide 6: Skills - AI & Automation
    const skillsAISlide = pres.addSlide();
    skillsAISlide.addText("Skills: AI & Automation", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    skillsAISlide.addText("AI/ML:", {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: "0d9488",
    });
    skillsAISlide.addText(profile.skills.ai.join(" • "), {
      x: 0.5,
      y: 1.8,
      w: 9,
      h: 1.5,
      fontSize: 12,
      color: "333333",
      valign: "top",
    });
    skillsAISlide.addText("Automation:", {
      x: 0.5,
      y: 3.5,
      w: 9,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: "0d9488",
    });
    skillsAISlide.addText(profile.skills.automation.join(" • "), {
      x: 0.5,
      y: 4.0,
      w: 9,
      h: 1,
      fontSize: 12,
      color: "333333",
      valign: "top",
    });

    // Slide 7: Leadership
    const leadershipSlide = pres.addSlide();
    leadershipSlide.addText("Leadership", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    leadershipSlide.addText(profile.leadership.title, {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 0.5,
      fontSize: 18,
      bold: true,
      color: "333333",
    });
    leadershipSlide.addText(profile.leadership.details, {
      x: 0.5,
      y: 2.0,
      w: 9,
      h: 1.5,
      fontSize: 12,
      color: "333333",
      valign: "top",
    });
    leadershipSlide.addText(`Metrics: ${profile.leadership.metrics.join(", ")}`, {
      x: 0.5,
      y: 3.8,
      w: 9,
      h: 0.5,
      fontSize: 12,
      bold: true,
      color: "0d9488",
    });

    // Featured Projects
    const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
    
    featuredProjects.forEach((project) => {
      const projectSlide = pres.addSlide();
      projectSlide.addText(project.title, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.6,
        fontSize: 28,
        bold: true,
        color: "0d9488",
      });
      projectSlide.addText(project.oneLiner, {
        x: 0.5,
        y: 1.2,
        w: 9,
        h: 0.5,
        fontSize: 14,
        italic: true,
        color: "666666",
      });
      projectSlide.addText(`Role: ${project.role}`, {
        x: 0.5,
        y: 1.9,
        w: 9,
        h: 0.4,
        fontSize: 12,
        color: "333333",
      });
      projectSlide.addText(`Stack: ${project.stack.join(", ")}`, {
        x: 0.5,
        y: 2.4,
        w: 9,
        h: 0.5,
        fontSize: 11,
        color: "666666",
      });
      
      const bullets = project.bullets.map((b) => `• ${b}`).join("\n");
      projectSlide.addText(bullets, {
        x: 0.5,
        y: 3.1,
        w: 9,
        h: 2.5,
        fontSize: 11,
        color: "333333",
        valign: "top",
      });
    });

    // Slide: Experience
    const experienceSlide = pres.addSlide();
    experienceSlide.addText("Experience", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: "0d9488",
    });
    const experienceText = profile.experience.map((e) => `• ${e}`).join("\n\n");
    experienceSlide.addText(experienceText, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 12,
      color: "333333",
      valign: "top",
    });

    // Final Slide: Contact Information
    const contactSlide = pres.addSlide();
    contactSlide.background = { color: "0d9488" };
    contactSlide.addText("Let's Connect", {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 0.8,
      fontSize: 40,
      bold: true,
      color: "FFFFFF",
      align: "center",
    });
    contactSlide.addText(profile.email, {
      x: 0.5,
      y: 2.8,
      w: 9,
      h: 0.5,
      fontSize: 20,
      color: "FFFFFF",
      align: "center",
    });
    contactSlide.addText(profile.links.linkedin, {
      x: 0.5,
      y: 3.5,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: "E0F2F1",
      align: "center",
    });
    contactSlide.addText(profile.links.github, {
      x: 0.5,
      y: 4.0,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: "E0F2F1",
      align: "center",
    });

    // Generate the PowerPoint file as a buffer
    const pptxData = await pres.write({ outputType: "nodebuffer" });

    // Return the file as a download
    return new NextResponse(pptxData as Buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${profile.name.replace(/\s+/g, "_")}_Portfolio.pptx"`,
      },
    });
  } catch (error) {
    console.error("Error generating PowerPoint:", error);
    return NextResponse.json({ error: "Failed to generate PowerPoint" }, { status: 500 });
  }
}
