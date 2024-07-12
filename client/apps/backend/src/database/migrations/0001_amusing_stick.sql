ALTER TABLE "file_type" ALTER COLUMN "media_type_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "upload_info" ADD COLUMN "file_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "upload_info" ADD COLUMN "dir_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "upload_info" DROP COLUMN IF EXISTS "upload_path";