import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";

  return {
    title: `Notes - ${tag} | NoteHub`,
    description: `Browse and manage your ${tag.toLowerCase()} notes in NoteHub`,
    openGraph: {
      title: `Notes - ${tag} | NoteHub`,
      description: `Browse and manage your ${tag.toLowerCase()} notes in NoteHub`,
      url: `https://notehub.com/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub ${tag} Notes`,
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "All";
  const tagParam = tag === "All" ? undefined : tag;

  const initialNotes = await fetchNotes(1, undefined, tagParam);
  return <NotesClient initialNotes={initialNotes} tag={tagParam} />;
}
