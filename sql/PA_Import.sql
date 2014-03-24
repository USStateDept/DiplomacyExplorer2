DROP TABLE IF EXISTS public."PA_Data";
CREATE TABLE public."PA_Data"
(
	"Country" text,
	"PEPFAR" text,
	"Signed" text,
	"Deposited" text,
	"SignedDeposited" text,
	"Maternity_Health_Access_to_Care" text,
	"Human_Trafficking" text,
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
	"MLO_Index" real,
	"APEC" text,
	"NAFTA" text,
	"WTO" text,
	"ASEAN" text,
	"CBERA" text,
	"CAFTA" text,
	"TP_Index" real
);

set client_encoding to 'UTF-8';

COPY "PA_Data" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\PA_Data.csv' DELIMITER ',' CSV;