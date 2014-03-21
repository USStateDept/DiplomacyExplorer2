DROP TABLE IF EXISTS "Good_Governance_and_Human_Rights";
CREATE TABLE "Good_Governance_and_Human_Rights"
(
"Country" text,
"Maternity_Health_Access_to_Care" text,
"Human_Trafficking" text
);

set client_encoding to 'UTF-8';

COPY "Good_Governance_and_Human_Rights" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Good_Governance_and_Human_Rights.csv' DELIMITER ',' CSV;