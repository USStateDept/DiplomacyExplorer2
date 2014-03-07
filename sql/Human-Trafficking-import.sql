CREATE TABLE "Human_Trafficking"
(
"Country" text,
"Value" integer
);

set client_encoding to 'UTF-8';

COPY "Human_Trafficking" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Human-Trafficking.csv' DELIMITER ',' CSV;