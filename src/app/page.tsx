import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-primary-100">
      <Header />
      <main className="pt-24 pb-32">
        <ProjectGallery projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
