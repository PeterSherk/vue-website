--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 14.4

-- Started on 2022-08-06 16:11:19 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16386)
-- Name: website; Type: SCHEMA; Schema: -; Owner: p_website
--

CREATE SCHEMA website;


ALTER SCHEMA website OWNER TO p_website;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16387)
-- Name: login; Type: TABLE; Schema: website; Owner: p_website
--

CREATE TABLE website.login (
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE website.login OWNER TO p_website;

--
-- TOC entry 204 (class 1259 OID 16393)
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
-- TOC entry 205 (class 1259 OID 24595)
-- Name: recipes; Type: TABLE; Schema: website; Owner: p_website
--

CREATE TABLE website.recipes (
    id numeric NOT NULL,
    display_name text,
    website_url text,
    description text,
    picture_url text,
    steps jsonb[],
    ingredients jsonb[],
    date_ate date,
    create_date date NOT NULL
);


ALTER TABLE website.recipes OWNER TO p_website;

--
-- TOC entry 2788 (class 2606 OID 16400)
-- Name: login login_pkey; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (username);


--
-- TOC entry 2790 (class 2606 OID 16402)
-- Name: project pky_project_id; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.project
    ADD CONSTRAINT pky_project_id PRIMARY KEY (id);


--
-- TOC entry 2792 (class 2606 OID 24602)
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


-- Completed on 2022-08-06 16:11:19 EDT

--
-- PostgreSQL database dump complete
--

