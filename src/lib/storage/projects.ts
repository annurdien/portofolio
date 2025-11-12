import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const bucketName = process.env.SUPABASE_STORAGE_BUCKET ?? "project-images";

async function ensureBucketIsReady() {
  const supabase = createAdminSupabaseClient();
  const { data: bucket, error } = await supabase.storage.getBucket(bucketName);

  if (error) {
    if (error.message?.toLowerCase().includes("not found")) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
      });

      if (createError && !createError.message?.toLowerCase().includes("exists")) {
        throw new Error(`Failed to create storage bucket: ${createError.message}`);
      }
    } else {
      throw new Error(`Failed to verify storage bucket: ${error.message}`);
    }
  } else if (!bucket?.public) {
    const { error: updateError } = await supabase.storage.updateBucket(bucketName, {
      public: true,
    });

    if (updateError) {
      throw new Error(`Failed to mark storage bucket public: ${updateError.message}`);
    }
  }
}

export async function uploadProjectImage(file: File, slug: string) {
  await ensureBucketIsReady();
  const arrayBuffer = await file.arrayBuffer();
  const fileExtension = file.type.split("/").pop() ?? "bin";
  const fileName = `${slug}/${randomUUID()}.${fileExtension}`;

  const supabase = createAdminSupabaseClient();
  const storageBucket = supabase.storage.from(bucketName);

  const { error } = await storageBucket.upload(fileName, Buffer.from(arrayBuffer), {
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = storageBucket.getPublicUrl(fileName);

  return {
    path: fileName,
    publicUrl,
  };
}
