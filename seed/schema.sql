DROP DATABASE IF EXISTS perch_graph;

CREATE DATABASE perch_graph;

\c perch_graph;

CREATE TABLE "groups" (
  "group_id" SERIAL PRIMARY KEY,
  "zipcode" char(5)
);

CREATE TABLE "dates" (
  "date_id" SERIAL PRIMARY KEY,
  "month_year" date
);

CREATE TABLE "houses" (
  "property_id" SERIAL PRIMARY KEY,
  "imgurl" varchar(100),
  "rating" boolean,
  "bed" integer,
  "bath" integer,
  "price" integer,
  "address1" varchar(30),
  "address2" varchar(40),
  "sq_ft" integer,
  "sold_date" varchar(20),
  "group_id" integer REFERENCES "groups"(group_id)
);

CREATE TABLE "prices" (
  "property_id" integer REFERENCES "houses"(property_id),
  "price" integer,
  "date_id" integer REFERENCES "dates"(date_id)
);

-- CREATE TABLE "diffs" (
--   "id" integer REFERENCES "houses"(id),
--   "diff5year" integer,
--   "diff1year" integer
-- );


/*  Execute this file from the command line by typing:
 *    psql -U impeter9 -d postgres -a -f "./seed/schema.sql";
 *  to create the database and the tables.*/