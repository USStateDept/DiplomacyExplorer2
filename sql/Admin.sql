DROP TABLE IF EXISTS "Subissue";
DROP SEQUENCE IF EXISTS "Subissue_fid_seq";
DROP TABLE IF EXISTS "Issue";
DROP SEQUENCE IF EXISTS "Issue_fid_seq";
DROP TABLE IF EXISTS "Theme";
DROP SEQUENCE IF EXISTS "Theme_fid_seq";
DROP TABLE IF EXISTS "IssueLink";
DROP SEQUENCE IF EXISTS "IssueLink_fid_seq";
DROP TABLE IF EXISTS "SubissueLink";
DROP SEQUENCE IF EXISTS "SubissueLink_fid_seq";

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
"Theme_id" integer DEFAULT NULL,
"Link_Text" character varying(200),
"Link_URL" character varying(200),
FOREIGN KEY ("Theme_id") REFERENCES "Theme"("fid") on delete cascade on update cascade,
CONSTRAINT "Issue_pkey" PRIMARY KEY (fid )
);

COPY "Issue" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\issue.csv' DELIMITER ',' CSV;

create SEQUENCE "IssueLink_fid_seq";

CREATE TABLE "IssueLink"
(
fid integer NOT NULL DEFAULT nextval('public."Issue_fid_seq"'::regclass),
"Link_Text" character varying(200),
"Link_URL" character varying(200),
"Issue_id" integer DEFAULT NULL,
FOREIGN KEY ("Issue_id") REFERENCES "Issue"("fid") on delete cascade on update cascade,
CONSTRAINT "IssueLink_pkey" PRIMARY KEY (fid )
);

create SEQUENCE "Subissue_fid_seq";

CREATE TABLE "Subissue"
(
fid integer NOT NULL DEFAULT nextval('public."Subissue_fid_seq"'::regclass),
"Name" character varying(40),
"Text" text,
"Issue_id" integer DEFAULT NULL,
FOREIGN KEY ("Issue_id") REFERENCES "Issue"("fid") on delete cascade on update cascade,
CONSTRAINT "Subissue_pkey" PRIMARY KEY (fid )
);

create SEQUENCE "SubissueLink_fid_seq";

CREATE TABLE "SubissueLink"
(
fid integer NOT NULL DEFAULT nextval('public."Issue_fid_seq"'::regclass),
"Link_Text" character varying(200),
"Link_URL" character varying(200),
"Subissue_id" integer DEFAULT NULL,
FOREIGN KEY ("Subissue_id") REFERENCES "Subissue"("fid") on delete cascade on update cascade,
CONSTRAINT "SubissueLink_pkey" PRIMARY KEY (fid )
);

COPY "Subissue" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\subissue.csv' DELIMITER ',' CSV;