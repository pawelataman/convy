CREATE TABLE IF NOT EXISTS "file_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"media_type_id" integer NOT NULL,
	"is_supported" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file_type_convertable_to" (
	"file_type_id" serial NOT NULL,
	"convertable_to_id" serial NOT NULL,
	CONSTRAINT "file_type_convertable_to_file_type_id_convertable_to_id_pk" PRIMARY KEY("file_type_id","convertable_to_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "upload_info" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"file_name" varchar NOT NULL,
	"dir_name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_type" ADD CONSTRAINT "file_type_media_type_id_media_type_id_fk" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_type_convertable_to" ADD CONSTRAINT "file_type_convertable_to_file_type_id_file_type_id_fk" FOREIGN KEY ("file_type_id") REFERENCES "public"."file_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_type_convertable_to" ADD CONSTRAINT "file_type_convertable_to_convertable_to_id_file_type_id_fk" FOREIGN KEY ("convertable_to_id") REFERENCES "public"."file_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
