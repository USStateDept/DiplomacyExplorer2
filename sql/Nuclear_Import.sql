DROP TABLE IF EXISTS "Nuclear";
CREATE TABLE "Nuclear"
(
"Country" text,
"Signed" text,
"Deposited" text,
"SignedDeposited" integer
);

set client_encoding to 'UTF-8';

COPY "Nuclear" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Nuclear.csv' DELIMITER ',' CSV;