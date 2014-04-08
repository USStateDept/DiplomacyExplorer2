DROP TABLE IF EXISTS public."PEPFAR_Pts";
CREATE TABLE public."PEPFAR_Pts"
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

COPY "PEPFAR_Pts" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\PEPFAR_Pts.csv' DELIMITER ',' CSV;

SELECT AddGeometryColumn( 'public', 'PEPFAR_Pts', 'the_geom', 4326, 'POINT', 2 );

UPDATE public."PEPFAR_Pts" SET the_geom = ST_SetSRID(ST_GeomFromText('POINT(' || "Long" || ' ' || "Lat" || ')'),4326);