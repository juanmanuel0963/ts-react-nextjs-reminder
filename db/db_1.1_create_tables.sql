DROP TABLE IF EXISTS public.reminders;
DROP TABLE IF EXISTS public.commitments;
DROP TABLE IF EXISTS public.clients;
DROP TABLE IF EXISTS public.admins;

CREATE TABLE "admins" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "sur_name" varchar,
  "email" varchar,
  "password" varchar,
  "country_code" varchar,
  "phone_number" varchar,
  "is_super_admin" boolean,
  "is_admin" boolean,
  "parent_admin" int,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "deleted_at" timestamp with time zone
);

CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY,
  "admin_id" int,
  "first_name" varchar,
  "sur_name" varchar,
  "email" varchar,
  "country_code" varchar,
  "phone_number" varchar,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "deleted_at" timestamp with time zone
);

ALTER TABLE "clients" ADD FOREIGN KEY ("admin_id") REFERENCES "admins" ("id");

CREATE TABLE "commitments" (
  "id" SERIAL PRIMARY KEY,
  "admin_id" int,
  "client_id" int,
  "commitment" varchar,
  "commitment_date" timestamp with time zone,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "deleted_at" timestamp with time zone
);

ALTER TABLE "commitments" ADD FOREIGN KEY ("admin_id") REFERENCES "admins" ("id");
ALTER TABLE "commitments" ADD FOREIGN KEY ("client_id") REFERENCES "clients" ("id");

CREATE TABLE "reminders" (
  "id" SERIAL PRIMARY KEY,
  "commitment_id" int,
  "subject" varchar,
  "message" varchar,
  "days_before" int,
  "frequency" varchar,
  "send_time" timestamp with time zone,  
  "send_to_client" boolean,
  "send_to_admin" boolean,
  "send_sms" boolean,
  "send_email" boolean,
  "send_whatsapp" boolean,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "deleted_at" timestamp with time zone
);

ALTER TABLE "reminders" ADD FOREIGN KEY ("commitment_id") REFERENCES "commitments" ("id");