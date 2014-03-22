DROP TABLE IF EXISTS public."Multi-Lateral_Organizations_50m";
CREATE TABLE public."Multi-Lateral_Organizations_50m" AS
SELECT 
	name,
	"Multi-Lateral_Organizations"."ICAO",
	"Multi-Lateral_Organizations"."UNESCO",
	"Multi-Lateral_Organizations"."FAO",
	"Multi-Lateral_Organizations"."OAS",
	"Multi-Lateral_Organizations"."UNGA",
	"Multi-Lateral_Organizations"."OSCE",
	"Multi-Lateral_Organizations"."OECD",
	"Multi-Lateral_Organizations"."NATO",
	"Multi-Lateral_Organizations"."EU",
	"Multi-Lateral_Organizations"."AU",
	"Multi-Lateral_Organizations"."UNHCR",
	"Multi-Lateral_Organizations"."Index",
	the_geom
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Multi-Lateral_Organizations" ON (ne_50m_admin_0_countries_lakes.name = "Multi-Lateral_Organizations"."Country");