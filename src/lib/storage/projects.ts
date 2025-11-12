import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

const bucketName = process.env.SUPABASE_STORAGE_BUCKET ?? "project-images";

export async function uploadProjectImage(
  supabase: SupabaseClient<Database>,
  file: File,
  slug: string,
) {
  const arrayBuffer = await file.arrayBuffer();
  const fileExtension = file.type.split("/").pop() ?? "bin";
  const fileName = `${slug}/${randomUUID()}.${fileExtension}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, Buffer.from(arrayBuffer), {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return {
    path: fileName,
    publicUrl,
  };
}
