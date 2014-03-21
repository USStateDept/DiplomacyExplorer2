DROP TABLE IF EXISTS public."Good_Governance_and_Human_Rights_50m";
CREATE TABLE public."Good_Governance_and_Human_Rights_50m" AS
SELECT 
	sovereignt,
	"Good_Governance_and_Human_Rights"."Maternity_Health_Access_to_Care",
	"Good_Governance_and_Human_Rights"."Human_Trafficking",
	the_geom
FROM opengeo."ne_50m_admin_0_sovereignty" LEFT OUTER JOIN public."Good_Governance_and_Human_Rights" ON (ne_50m_admin_0_sovereignty.sovereignt = "Good_Governance_and_Human_Rights"."Country");