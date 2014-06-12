DROP TABLE "SUBISSUE";
DROP SEQUENCE "SUBISSUE_fid_seq";
DROP TABLE "ISSUE";
DROP SEQUENCE "ISSUE_fid_seq";
DROP TABLE "THEME";
DROP SEQUENCE "THEME_fid_seq";

create SEQUENCE "THEME_fid_seq";

CREATE TABLE "THEME"
(
fid integer NOT NULL DEFAULT nextval('public."THEME_fid_seq"'::regclass),
"Name" character varying(25),
"Description" character varying(200),
CONSTRAINT "THEME_pkey" PRIMARY KEY (fid )
);

COPY "THEME" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\theme.csv' DELIMITER ',' CSV;

create SEQUENCE "ISSUE_fid_seq";

CREATE TABLE "ISSUE"
(
fid integer NOT NULL DEFAULT nextval('public."ISSUE_fid_seq"'::regclass),
"Name" character varying(40),
"Legend" text,
"Theme_id" integer DEFAULT NULL,
FOREIGN KEY ("Theme_id") REFERENCES "THEME"("fid") on delete cascade on update cascade,
CONSTRAINT "ISSUE_pkey" PRIMARY KEY (fid )
);

COPY "ISSUE" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\issue.csv' DELIMITER ',' CSV;

create SEQUENCE "SUBISSUE_fid_seq";

CREATE TABLE "SUBISSUE"
(
fid integer NOT NULL DEFAULT nextval('public."SUBISSUE_fid_seq"'::regclass),
"Name" character varying(40),
"Text" text,
"Issue_id" integer DEFAULT NULL,
FOREIGN KEY ("Issue_id") REFERENCES "ISSUE"("fid") on delete cascade on update cascade,
CONSTRAINT "SUBISSUE_pkey" PRIMARY KEY (fid )
);

COPY "SUBISSUE" FROM 'C:\OpenGeo\webapps\DiplomacyExplorer2\sql\subissue.csv' DELIMITER ',' CSV;