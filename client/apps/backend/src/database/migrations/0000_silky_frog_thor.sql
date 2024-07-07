CREATE TABLE IF NOT EXISTS "file_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"media_type_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "upload_info" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"upload_path" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_type" ADD CONSTRAINT "file_type_media_type_id_media_type_id_fk" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
