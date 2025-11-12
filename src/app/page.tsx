import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { fetchProjects } from "@/lib/repositories/projects";

export const revalidate = 300;

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <div className="relative min-h-screen text-primary-100">
      <Header />
      <main className="pt-24 pb-20">
        <ProjectGallery projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
