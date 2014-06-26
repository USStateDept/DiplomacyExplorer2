DROP TABLE IF EXISTS "Subissue";
DROP SEQUENCE IF EXISTS "Subissue_fid_seq";
DROP TABLE IF EXISTS "Issue";
DROP SEQUENCE IF EXISTS "Issue_fid_seq";
DROP TABLE IF EXISTS "Theme";
DROP SEQUENCE IF EXISTS "Theme_fid_seq";

create SEQUENCE "Theme_fid_seq";

CREATE TABLE "Theme"
(
fid integer NOT NULL DEFAULT nextval('public."Theme_fid_seq"'::regclass),
"Name" character varying(25),
"Description" character varying(200),
CONSTRAINT "Theme_pkey" PRIMARY KEY (fid )
);

COPY "Theme" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\theme.csv' DELIMITER ',' CSV;

create SEQUENCE "Issue_fid_seq";

CREATE TABLE "Issue"
(
fid integer NOT NULL DEFAULT nextval('public."Issue_fid_seq"'::regclass),
"Name" character varying(40),
"Legend" text,
"Link_Text" character varying(100),
"Link_URL" character varying(100),
"Link_Text2" character varying(100),
"Link_URL2" character varying(100),
"Link_Text3" character varying(100),
"Link_URL3" character varying(100),
"Theme_id" integer DEFAULT NULL,
FOREIGN KEY ("Theme_id") REFERENCES "Theme"("fid") on delete cascade on update cascade,
CONSTRAINT "Issue_pkey" PRIMARY KEY (fid )
);

COPY "Issue" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\issue.csv' DELIMITER ',' CSV;

create SEQUENCE "Subissue_fid_seq";

CREATE TABLE "Subissue"
(
fid integer NOT NULL DEFAULT nextval('public."Subissue_fid_seq"'::regclass),
"Name" character varying(40),
"Text" text,
"Link_Text" character varying(100),
"Link_URL" character varying(100),
"Link_Text2" character varying(100),
"Link_URL2" character varying(100),
"Link_Text3" character varying(100),
"Link_URL3" character varying(100),
"Issue_id" integer DEFAULT NULL,
FOREIGN KEY ("Issue_id") REFERENCES "Issue"("fid") on delete cascade on update cascade,
CONSTRAINT "Subissue_pkey" PRIMARY KEY (fid )
);

--COPY "Subissue" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\subissue.csv' DELIMITER ',' CSV;