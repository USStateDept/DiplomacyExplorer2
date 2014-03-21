DROP TABLE IF EXISTS "Health_Human_and_Humanitarian_Concerns";
CREATE TABLE "Health_Human_and_Humanitarian_Concerns"
(
"Country" text,
"PEPFAR" integer
);

set client_encoding to 'UTF-8';

COPY "Health_Human_and_Humanitarian_Concerns" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Health_Human_and_Humanitarian_Concerns.csv' DELIMITER ',' CSV;