DROP TABLE IF EXISTS public."Nuclear_50m";
CREATE TABLE public."Nuclear_50m" AS
SELECT 
	sovereignt,
	"Nuclear"."Signed",
	"Nuclear"."Deposited",
	"Nuclear"."SignedDeposited",
	the_geom
FROM opengeo."ne_50m_admin_0_sovereignty" LEFT OUTER JOIN public."Nuclear" ON (ne_50m_admin_0_sovereignty.sovereignt = "Nuclear"."Country");