DROP TABLE IF EXISTS public."Good_Governance_and_Human_Rights_50m";
CREATE TABLE public."Good_Governance_and_Human_Rights_50m" AS
SELECT 
	sovereignt,
	"Good_Governance_and_Human_Rights"."Maternity_Health_Access_to_Care",
	"Good_Governance_and_Human_Rights"."Human_Trafficking",
	the_geom
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Good_Governance_and_Human_Rights" ON (ne_50m_admin_0_countries_lakes.sovereignt = "Good_Governance_and_Human_Rights"."Country");

DROP TABLE IF EXISTS public."Health_Human_and_Humanitarian_Concerns_50m";
CREATE TABLE public."Health_Human_and_Humanitarian_Concerns_50m" AS
SELECT 
	sovereignt,
	"Health_Human_and_Humanitarian_Concerns"."PEPFAR",
	the_geom
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Health_Human_and_Humanitarian_Concerns" ON (ne_50m_admin_0_countries_lakes.sovereignt = "Health_Human_and_Humanitarian_Concerns"."Country");

DROP TABLE IF EXISTS public."Multi-Lateral_Organizations_50m";
CREATE TABLE public."Multi-Lateral_Organizations_50m" AS
SELECT 
	sovereignt,
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
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Multi-Lateral_Organizations" ON (ne_50m_admin_0_countries_lakes.sovereignt = "Multi-Lateral_Organizations"."Country");

DROP TABLE IF EXISTS public."Nuclear_50m";
CREATE TABLE public."Nuclear_50m" AS
SELECT 
	sovereignt,
	"Nuclear"."Signed",
	"Nuclear"."Deposited",
	"Nuclear"."SignedDeposited",
	the_geom
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Nuclear" ON (ne_50m_admin_0_countries_lakes.sovereignt = "Nuclear"."Country");

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
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Trade_Promotion" ON (ne_50m_admin_0_countries_lakes.sovereignt = "Trade_Promotion"."Country");