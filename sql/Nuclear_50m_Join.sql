DROP TABLE IF EXISTS public."Nuclear_50m";
CREATE TABLE public."Nuclear_50m" AS
SELECT 
	name,
	"Nuclear"."Signed",
	"Nuclear"."Deposited",
	"Nuclear"."SignedDeposited",
	the_geom
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Nuclear" ON (ne_50m_admin_0_countries_lakes.name = "Nuclear"."Country");