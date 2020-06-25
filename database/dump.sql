--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.watchlists DROP CONSTRAINT watchlists_fk1;
ALTER TABLE ONLY public.watchlists DROP CONSTRAINT watchlists_fk0;
ALTER TABLE ONLY public.post DROP CONSTRAINT post_fk0;
ALTER TABLE ONLY public.message DROP CONSTRAINT message_fk2;
ALTER TABLE ONLY public.message DROP CONSTRAINT message_fk1;
ALTER TABLE ONLY public.message DROP CONSTRAINT message_fk0;
ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_fk1;
ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_fk0;
ALTER TABLE ONLY public.bid DROP CONSTRAINT bid_fk1;
ALTER TABLE ONLY public.bid DROP CONSTRAINT bid_fk0;
ALTER TABLE ONLY public.watchlists DROP CONSTRAINT watchlists_pk;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pk;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
ALTER TABLE ONLY public.post DROP CONSTRAINT post_pk;
ALTER TABLE ONLY public.post DROP CONSTRAINT "post_imageUrl_key";
ALTER TABLE ONLY public.message DROP CONSTRAINT message_pk;
ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pk;
ALTER TABLE ONLY public.bid DROP CONSTRAINT bid_pk;
ALTER TABLE public.watchlists ALTER COLUMN "watchlistId" DROP DEFAULT;
ALTER TABLE public."user" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.post ALTER COLUMN "postId" DROP DEFAULT;
ALTER TABLE public.message ALTER COLUMN "messageId" DROP DEFAULT;
ALTER TABLE public.comments ALTER COLUMN "commentId" DROP DEFAULT;
ALTER TABLE public.bid ALTER COLUMN "bidId" DROP DEFAULT;
DROP SEQUENCE public."watchlists_watchlistId_seq";
DROP TABLE public.watchlists;
DROP SEQUENCE public."user_userId_seq";
DROP TABLE public."user";
DROP SEQUENCE public."post_postId_seq";
DROP TABLE public.post;
DROP SEQUENCE public."message_messageId_seq";
DROP TABLE public.message;
DROP SEQUENCE public."comments_commentId_seq";
DROP TABLE public.comments;
DROP SEQUENCE public."bid_bidId_seq";
DROP TABLE public.bid;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bid; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bid (
    "bidId" integer NOT NULL,
    "bidderId" integer NOT NULL,
    "postId" bigint NOT NULL,
    "currentBid" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2020-06-22 22:43:37.442217+00'::timestamp with time zone NOT NULL,
    "bidEnabled" boolean DEFAULT true NOT NULL
);


--
-- Name: bid_bidId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."bid_bidId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bid_bidId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."bid_bidId_seq" OWNED BY public.bid."bidId";


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    "commentId" integer NOT NULL,
    "userId" integer NOT NULL,
    comment text NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2020-06-22 22:43:37.442217+00'::timestamp with time zone NOT NULL
);


--
-- Name: comments_commentId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."comments_commentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_commentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."comments_commentId_seq" OWNED BY public.comments."commentId";


--
-- Name: message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.message (
    "messageId" integer NOT NULL,
    "senderId" integer NOT NULL,
    "receipientId" integer NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2020-06-22 22:43:37.442217+00'::timestamp with time zone NOT NULL,
    "postId" integer NOT NULL
);


--
-- Name: message_messageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."message_messageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: message_messageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."message_messageId_seq" OWNED BY public.message."messageId";


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    "postId" integer NOT NULL,
    "sellerId" integer NOT NULL,
    description text NOT NULL,
    "imageUrl" text NOT NULL,
    title text NOT NULL,
    "startingBid" integer NOT NULL,
    "biddingEnabled" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2020-06-22 22:43:37.442217+00'::timestamp with time zone NOT NULL,
    "expiredAt" date NOT NULL,
    category text,
    notes text
);


--
-- Name: post_postId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."post_postId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_postId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."post_postId_seq" OWNED BY public.post."postId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    "userName" text NOT NULL,
    email text,
    password text,
    "profileImg" text,
    "coverImg" text,
    description text,
    location text,
    "createdAt" timestamp with time zone DEFAULT '2020-06-22 22:43:37.442217+00'::timestamp with time zone NOT NULL
);


--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: watchlists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.watchlists (
    "watchlistId" integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" date DEFAULT '2020-06-22'::date NOT NULL
);


--
-- Name: watchlists_watchlistId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."watchlists_watchlistId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: watchlists_watchlistId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."watchlists_watchlistId_seq" OWNED BY public.watchlists."watchlistId";


--
-- Name: bid bidId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bid ALTER COLUMN "bidId" SET DEFAULT nextval('public."bid_bidId_seq"'::regclass);


--
-- Name: comments commentId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN "commentId" SET DEFAULT nextval('public."comments_commentId_seq"'::regclass);


--
-- Name: message messageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message ALTER COLUMN "messageId" SET DEFAULT nextval('public."message_messageId_seq"'::regclass);


--
-- Name: post postId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post ALTER COLUMN "postId" SET DEFAULT nextval('public."post_postId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Name: watchlists watchlistId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watchlists ALTER COLUMN "watchlistId" SET DEFAULT nextval('public."watchlists_watchlistId_seq"'::regclass);


--
-- Data for Name: bid; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bid ("bidId", "bidderId", "postId", "currentBid", "createdAt", "bidEnabled") FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments ("commentId", "userId", comment, "postId", "createdAt") FROM stdin;
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.message ("messageId", "senderId", "receipientId", message, "createdAt", "postId") FROM stdin;
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post ("postId", "sellerId", description, "imageUrl", title, "startingBid", "biddingEnabled", "isDeleted", "createdAt", "expiredAt", category, notes) FROM stdin;
1	1	example1 description	https://i.picsum.photos/id/546/200/200.jpg?hmac=qPx0UfEYgljp1xwhEAy3t7xCT8uLxWCGibv7hu6EkwQ	exampleOne	20	f	f	2020-06-22 22:43:37.442217+00	2020-06-23	paintings	\N
2	1	example2 description	https://i.picsum.photos/id/154/200/200.jpg?hmac=ljiYfN3Am3TR0-aMErtWNuSQm8RTYarrv2QJfmWG6Cw	exampleTwo	30	f	f	2020-06-22 22:43:37.442217+00	2020-06-23	paintings	\N
3	2	example3 description	https://i.picsum.photos/id/204/200/200.jpg?hmac=gppQCOIV43fSCLsdUCoPQxrc16lrOEvVu2u5nH-I4Zo	exampleThree	40	f	f	2020-06-22 22:43:37.442217+00	2020-06-23	photographs	\N
4	2	example4 description	https://i.picsum.photos/id/306/200/200.jpg?hmac=_MA2OQbvCf09ghW0BrkSYh9mOhP-xpHqg2c5joDIRFg	exampleFour	100	f	f	2020-06-22 22:43:37.442217+00	2020-06-23	photographs	\N
5	3	example5 description	https://i.picsum.photos/id/121/200/200.jpg?hmac=0aiR--xgWy1aIM85HCFMySsuQ7DJJBE6XW_Yv4nqU6s	exampleFive	110	f	f	2020-06-22 22:43:37.442217+00	2020-06-23	other	\N
6	3	example6 description	https://i.picsum.photos/id/460/200/200.jpg?hmac=hL3I5G2p0p6vDGPyV9hergug-KipbUJVxqnnGIEBXg4	exampleSix	510	f	f	2020-06-22 22:43:37.442217+00	2020-06-23	other	\N
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" ("userId", "userName", email, password, "profileImg", "coverImg", description, location, "createdAt") FROM stdin;
2	TimD	timd@lfz.com	timd1234	/images/timd.png	/images/timd-cover.png	timd best	92604	2020-06-22 22:43:37.442217+00
3	TimH	timh@lfz.com	timh1234	/images/timh.png	/images/timh-cover.png	timh best	92604	2020-06-22 22:43:37.442217+00
5	Cody	cody@lfz.com	cody1234	/images/cody.png	/images/cody-cover.png	cody best	92604	2020-06-22 22:43:37.442217+00
6	TJ	tj@lfz.com	tjtj1234	/images/tj.png	/images/tj-cover.png	tj best	92604	2020-06-22 22:43:37.442217+00
1	Uzair	uzair@lfz.com	uzair1234	//i.imgur.com/Xe4ahew.png	https://i.pinimg.com/originals/91/e0/07/91e00767ce57b0979d8b4c7a2f2ae3b2.jpg	ANIME SIRENS GO UWU UWU UWU UWUUUUU WUUUUU WUUUU	92620	2020-06-22 22:43:37.442217+00
\.


--
-- Data for Name: watchlists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.watchlists ("watchlistId", "postId", "userId", "createdAt") FROM stdin;
\.


--
-- Name: bid_bidId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."bid_bidId_seq"', 1, false);


--
-- Name: comments_commentId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."comments_commentId_seq"', 1, false);


--
-- Name: message_messageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."message_messageId_seq"', 1, false);


--
-- Name: post_postId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."post_postId_seq"', 63, true);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_userId_seq"', 52, true);


--
-- Name: watchlists_watchlistId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."watchlists_watchlistId_seq"', 1, false);


--
-- Name: bid bid_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT bid_pk PRIMARY KEY ("bidId");


--
-- Name: comments comments_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pk PRIMARY KEY ("commentId");


--
-- Name: message message_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pk PRIMARY KEY ("messageId");


--
-- Name: post post_imageUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "post_imageUrl_key" UNIQUE ("imageUrl");


--
-- Name: post post_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pk PRIMARY KEY ("postId");


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY ("userId");


--
-- Name: watchlists watchlists_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT watchlists_pk PRIMARY KEY ("watchlistId");


--
-- Name: bid bid_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT bid_fk0 FOREIGN KEY ("bidderId") REFERENCES public."user"("userId");


--
-- Name: bid bid_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bid
    ADD CONSTRAINT bid_fk1 FOREIGN KEY ("postId") REFERENCES public.post("postId");


--
-- Name: comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk0 FOREIGN KEY ("userId") REFERENCES public."user"("userId");


--
-- Name: comments comments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk1 FOREIGN KEY ("postId") REFERENCES public.post("postId");


--
-- Name: message message_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_fk0 FOREIGN KEY ("senderId") REFERENCES public."user"("userId");


--
-- Name: message message_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_fk1 FOREIGN KEY ("receipientId") REFERENCES public."user"("userId");


--
-- Name: message message_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_fk2 FOREIGN KEY ("postId") REFERENCES public.post("postId");


--
-- Name: post post_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_fk0 FOREIGN KEY ("sellerId") REFERENCES public."user"("userId");


--
-- Name: watchlists watchlists_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT watchlists_fk0 FOREIGN KEY ("postId") REFERENCES public.post("postId");


--
-- Name: watchlists watchlists_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watchlists
    ADD CONSTRAINT watchlists_fk1 FOREIGN KEY ("userId") REFERENCES public."user"("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

