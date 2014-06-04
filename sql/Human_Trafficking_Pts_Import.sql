DROP TABLE IF EXISTS public."Human_Trafficking_Pts";
CREATE TABLE public."Human_Trafficking_Pts"
(
	"Header" text,
	"Topic" text,
	"Map" text,
	"Country" text,
	"Title" text,
	"Story" text,
	"Lat" character varying(15),
	"Long" character varying(15),
	"PhotoURL" text,
	"VideoURL" text
);

set client_encoding to 'UTF-8';

COPY "Human_Trafficking_Pts" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Human_Trafficking_Pts.csv' DELIMITER ',' CSV;

SELECT AddGeometryColumn( 'public', 'Human_Trafficking_Pts', 'the_geom', 4326, 'POINT', 2 );

UPDATE public."Human_Trafficking_Pts" SET the_geom = ST_SetSRID(ST_GeomFromText('POINT(' || "Long" || ' ' || "Lat" || ')'),4326);