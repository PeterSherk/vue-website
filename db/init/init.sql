--
-- PostgreSQL database dump
--

\restrict 8cBzmAsP5riW7XAW5t4rquMcAfVFAgIOSO1SJJC1j2UMKyjRMDWkazg2mVp07fA

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Debian 18.6-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: website; Type: DATABASE; Schema: -; Owner: p_website
--

CREATE DATABASE website WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE website OWNER TO p_website;

\unrestrict 8cBzmAsP5riW7XAW5t4rquMcAfVFAgIOSO1SJJC1j2UMKyjRMDWkazg2mVp07fA
\connect website
\restrict 8cBzmAsP5riW7XAW5t4rquMcAfVFAgIOSO1SJJC1j2UMKyjRMDWkazg2mVp07fA

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: website; Type: SCHEMA; Schema: -; Owner: p_website
--

CREATE SCHEMA website;


ALTER SCHEMA website OWNER TO p_website;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: login; Type: TABLE; Schema: website; Owner: p_website
--

CREATE TABLE website.login (
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE website.login OWNER TO p_website;

--
-- Name: project; Type: TABLE; Schema: website; Owner: p_website
--

CREATE TABLE website.project (
    company text NOT NULL,
    id numeric NOT NULL,
    name text NOT NULL,
    overview text NOT NULL,
    year numeric(4,0) NOT NULL,
    content jsonb
);


ALTER TABLE website.project OWNER TO p_website;

--
-- Name: recipes; Type: TABLE; Schema: website; Owner: p_website
--

CREATE TABLE website.recipes (
    id bigint NOT NULL,
    display_name text,
    website_url text,
    description text,
    picture_url text,
    steps jsonb[],
    ingredients jsonb,
    date_ate date,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE website.recipes OWNER TO p_website;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: website; Owner: p_website
--

CREATE SEQUENCE website.recipes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE website.recipes_id_seq OWNER TO p_website;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: website; Owner: p_website
--

ALTER SEQUENCE website.recipes_id_seq OWNED BY website.recipes.id;


--
-- Name: recipes id; Type: DEFAULT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.recipes ALTER COLUMN id SET DEFAULT nextval('website.recipes_id_seq'::regclass);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (username);


--
-- Name: project pky_project_id; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.project
    ADD CONSTRAINT pky_project_id PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 8cBzmAsP5riW7XAW5t4rquMcAfVFAgIOSO1SJJC1j2UMKyjRMDWkazg2mVp07fA

