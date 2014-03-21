DROP TABLE IF EXISTS "Multi-Lateral_Organizations";
CREATE TABLE "Multi-Lateral_Organizations"
(
"Country" text,
"ICAO" text,
"UNESCO" text,
"FAO" text,
"OAS" text,
"UNGA" text,
"OSCE" text,
"OECD" text,
"NATO" text,
"EU" text,
"AU" text,
"UNHCR" text,
"Index" real
);

set client_encoding to 'UTF-8';

COPY "Multi-Lateral_Organizations" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Multi-Lateral_Organizations.csv' DELIMITER ',' CSV;