DROP TABLE IF EXISTS public."Trade_Promotion_50m";
CREATE TABLE public."Trade_Promotion_50m" AS
SELECT 
	sovereignt,
	"Trade_Promotion"."APEC",
	"Trade_Promotion"."NAFTA",
	"Trade_Promotion"."WTO",
	"Trade_Promotion"."ASEAN",
	"Trade_Promotion"."CBERA",
	"Trade_Promotion"."CAFTA",
	"Trade_Promotion"."Index",
	the_geom
FROM opengeo."ne_50m_admin_0_sovereignty" LEFT OUTER JOIN public."Trade_Promotion" ON (ne_50m_admin_0_sovereignty.sovereignt = "Trade_Promotion"."Country");