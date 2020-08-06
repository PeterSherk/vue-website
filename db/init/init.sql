--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.2

-- Started on 2020-08-05 22:36:07 EDT

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
-- TOC entry 5 (class 2615 OID 16389)
-- Name: website; Type: SCHEMA; Schema: -; Owner: p_website
--

CREATE SCHEMA website;


ALTER SCHEMA website OWNER TO p_website;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 16399)
-- Name: login; Type: TABLE; Schema: website; Owner: p_website
--

CREATE TABLE website.login (
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE website.login OWNER TO p_website;

--
-- TOC entry 203 (class 1259 OID 16390)
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
-- TOC entry 3067 (class 2606 OID 16406)
-- Name: login login_pkey; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (username);


--
-- TOC entry 3065 (class 2606 OID 16397)
-- Name: project pky_project_id; Type: CONSTRAINT; Schema: website; Owner: p_website
--

ALTER TABLE ONLY website.project
    ADD CONSTRAINT pky_project_id PRIMARY KEY (id);


-- Completed on 2020-08-05 22:36:08 EDT

--
-- PostgreSQL database dump complete
--

