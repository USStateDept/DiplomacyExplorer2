DROP TABLE IF EXISTS public."Health_Human_and_Humanitarian_Concerns_50m";
CREATE TABLE public."Health_Human_and_Humanitarian_Concerns_50m" AS
SELECT 
	sovereignt,
	"Health_Human_and_Humanitarian_Concerns"."PEPFAR",
	the_geom
FROM opengeo."ne_50m_admin_0_sovereignty" LEFT OUTER JOIN public."Health_Human_and_Humanitarian_Concerns" ON (ne_50m_admin_0_sovereignty.sovereignt = "Health_Human_and_Humanitarian_Concerns"."Country");