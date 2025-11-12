import { ProjectForm } from "@/components/admin/ProjectForm";
import { fetchProjects } from "@/lib/repositories/projects";
import { deleteProjectAction } from "./actions";

export default async function AdminDashboardPage() {
  const projects = await fetchProjects();

  return (
    <div className="space-y-10">
      <ProjectForm />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-50">
            Existing projects
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-primary-200/70">
            {projects.length} total
          </span>
        </div>
        <div className="overflow-hidden rounded border border-primary-400/20">
          <table className="min-w-full divide-y divide-primary-400/10 text-left text-sm text-primary-100">
            <thead className="bg-background-900/80 text-xs uppercase tracking-[0.25em] text-primary-200/70">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-400/10 bg-background-900/40">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-primary-50">{project.title}</span>
                      <span className="text-xs text-primary-200/70">/{project.slug}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary-200/80">{project.year}</td>
                  <td className="px-4 py-3 text-primary-200/80">{project.status}</td>
                  <td className="px-4 py-3 text-primary-200/80">{project.featured ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteProjectAction} className="inline">
                      <input type="hidden" name="projectId" value={project.id} />
                      <input type="hidden" name="slug" value={project.slug} />
                      <button
                        type="submit"
                        className="rounded border border-primary-400/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-200 transition duration-150 ease-terminal hover:border-red-400 hover:text-red-100"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
