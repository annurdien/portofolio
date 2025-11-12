import Image from "next/image";
import Link from "next/link";

import type { ProjectRecord } from "@/types/project";
import {
  LANGUAGE_COLOR_MAP,
  PROJECT_CARD_LANGUAGE_FALLBACK,
  PROJECT_DENSITY_CARD_PADDING,
  PROJECT_DENSITY_CARD_PREVIEW,
  type ProjectCardDensity,
} from "@/lib/constants/project";
import { resolveProjectLanguage } from "@/lib/utils/projects";

type ProjectCardProps = {
  project: ProjectRecord;
  density?: ProjectCardDensity;
};

export function ProjectCard({ project, density = "compact" }: ProjectCardProps) {
  const paddingClass = PROJECT_DENSITY_CARD_PADDING[density];
  const previewClass = PROJECT_DENSITY_CARD_PREVIEW[density];
  const language = resolveProjectLanguage(project);
  const hasImage = Boolean(project.image);
  const isCompact = density === "compact";
  const textSpacingClass = isCompact ? "mt-2" : "mt-3";
  const tagSpacingClass = isCompact ? "mt-auto pt-4" : "mt-auto pt-5";
  const previewMarginClass = isCompact ? "mb-3" : "mb-4";
  const languageClassName = LANGUAGE_COLOR_MAP[language] ?? PROJECT_CARD_LANGUAGE_FALLBACK;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background-900"
    >
      <article
        className={`flex h-full flex-col border border-white/25 bg-background-900/85 transition duration-200 ease-terminal hover:-translate-y-[2px] hover:border-yellow-400/70 hover:bg-background-900 ${paddingClass}`}
      >
        <div
          className={`relative ${previewMarginClass} overflow-hidden ${previewClass} ${
            hasImage ? "bg-background-900" : "border border-yellow-400/40 bg-background-900"
          }`}
        >
          {hasImage ? (
            <>
        <Image
          src={project.image as string}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 90vw"
                className="object-cover"
                priority={false}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-900/85 via-transparent to-transparent opacity-80 transition duration-200 group-hover:opacity-100" aria-hidden />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08) 12px,rgba(250,204,21,0.14) 12px,rgba(250,204,21,0.14) 24px)] text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-yellow-300/80">
                No preview yet
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.32em] text-white/60">
                Supply an image to replace this tile
              </span>
            </div>
          )}
        </div>

        <h2 className="text-m font-semibold text-yellow-300 transition-colors duration-200 group-hover:text-white">
          {project.title}
        </h2>
        <p
          className={`${textSpacingClass} text-[0.85rem] leading-5 text-white`}
          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {project.summary}
        </p>

        <div className={tagSpacingClass}>
          <span className={`inline-flex items-center px-2 py-[0.35rem] text-[0.6rem] font-medium lowercase tracking-[0.12em] ring-1 ring-background-900/60 ${languageClassName}`}>
            {language.toLowerCase()}
          </span>
        </div>
      </article>
    </Link>
  );
}
