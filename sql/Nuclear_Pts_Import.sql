DROP TABLE IF EXISTS public."Nuclear_Pts";
CREATE TABLE public."Nuclear_Pts"
(
	"Header" text,
	"Topic" text,
	"Map" text,
	"Country" text,
	"Title" text,
	"Story" text,
	"Lat" character varying(15),
	"Long" character varying(15)
);

set client_encoding to 'UTF-8';

COPY "Nuclear_Pts" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\Nuclear_Pts.csv' DELIMITER ',' CSV;

SELECT AddGeometryColumn( 'public', 'Nuclear_Pts', 'the_geom', 4326, 'POINT', 2 );

UPDATE public."Nuclear_Pts" SET the_geom = ST_SetSRID(ST_GeomFromText('POINT(' || "Long" || ' ' || "Lat" || ')'),4326);