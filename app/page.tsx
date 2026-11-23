import HomeHero from "@/components/home-hero";
import AiSkillAnalyzer from "@/components/ai-skill-analyzer";
import AboutSection from "@/components/about-section";
import AiEngineSection from "@/components/ai-engine-section";
import ProgramBand from "@/components/program-band";
import SectionHead from "@/components/section-head";
import StatsBand from "@/components/stats-band";
import ParallaxShowcaseSection from "@/components/parallax-showcase-section";
import WhyUsSection from "@/components/why-us-section";
import ContactSection from "@/components/contact-section";
import { programs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <AiSkillAnalyzer />

      <AboutSection />

      <AiEngineSection />

      <section id="programs" className="scroll-mt-28 py-8 md:py-12">
        <div className="shell">
          <SectionHead
            eyebrow="What we deliver"
            title="Seven tracks, one"
            accent="standard"
            intro="Every programme is built on the same foundation — industry-aligned curriculum, practitioners in the room, and measurable outcomes at the end of it."
          />
          <div className="mt-5">
            {programs.map((program, i) => (
              <ProgramBand
                key={program.slug}
                program={program}
                index={i + 1}
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <ParallaxShowcaseSection />

      <StatsBand />

      <WhyUsSection />

      <ContactSection />
    </>
  );
}
