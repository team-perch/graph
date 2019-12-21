DROP DATABASE IF EXISTS perch_graph;

CREATE DATABASE perch_graph;

\c perch_graph;

CREATE TABLE "zips" (
  "id" SERIAL PRIMARY KEY,
  "zipcode" char(5)
);

CREATE TABLE "houses" (
  "id" SERIAL PRIMARY KEY,
  "imgurl" varchar(100),
  "rating" boolean,
  "bed" integer,
  "bath" integer,
  "sold_price" integer,
  "address1" varchar(30),
  "address2" varchar(40),
  "sq_ft" integer,
  "sold_date" varchar(20),
  "zip_id" integer REFERENCES "zips"(id)
);

CREATE TABLE "prices" (
  "id" integer REFERENCES "houses"(id),
  "price" integer,
  "month_year" date
);

CREATE TABLE "diffs" (
  "id" integer REFERENCES "houses"(id),
  "diff5year" integer,
  "diff1year" integer
);


/*  Execute this file from the command line by typing:
 *    psql -U impeter9 -d postgres -a -f "./seed/schema.sql";
 *  to create the database and the tables.*/