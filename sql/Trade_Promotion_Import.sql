DROP TABLE IF EXISTS "Trade_Promotion";
CREATE TABLE "Trade_Promotion"
(
"Country" text,
"APEC" text,
"NAFTA" text,
"WTO" text,
"ASEAN" text,
"CBERA" text,
"CAFTA" text,
"Index" integer
);

set client_encoding to 'UTF-8';

COPY "Trade_Promotion" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Trade_Promotion.csv' DELIMITER ',' CSV;