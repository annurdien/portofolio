import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(6,182,212,0.18),transparent_60%)]" aria-hidden />
      <Header />
      <main>
        <ProjectGallery projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
