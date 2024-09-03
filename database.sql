PGDMP  (                    |           survivor #   16.4 (Ubuntu 16.4-0ubuntu0.24.04.2) #   16.4 (Ubuntu 16.4-0ubuntu0.24.04.2) (    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16395    survivor    DATABASE     t   CREATE DATABASE survivor WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'fr_FR.UTF-8';
    DROP DATABASE survivor;
                postgres    false            �           0    0    DATABASE survivor    COMMENT     F   COMMENT ON DATABASE survivor IS 'Database for survivor (TEK 3 pool)';
                   postgres    false    3486            �            1259    16457 	   customers    TABLE     F  CREATE TABLE public.customers (
    id integer NOT NULL,
    email character varying(255),
    firstname character varying(255),
    lastname character varying(255),
    birthdate date,
    gender character varying(255),
    description character varying(255),
    astrological_sign character varying(255),
    image bytea
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16456    customers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.customers_id_seq;
       public          postgres    false    222            �           0    0    customers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;
          public          postgres    false    221            �            1259    16466 	   employees    TABLE       CREATE TABLE public.employees (
    id integer NOT NULL,
    email character varying(255),
    firstname character varying(255),
    lastname character varying(255),
    birthdate date,
    gender character varying(255),
    job character varying(255),
    image bytea
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    16465    employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.employees_id_seq;
       public          postgres    false    224            �           0    0    employees_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;
          public          postgres    false    223            �            1259    16439 
   encounters    TABLE     �   CREATE TABLE public.encounters (
    id integer NOT NULL,
    customer_id integer,
    date date,
    rating integer,
    comment text,
    source character varying(255)
);
    DROP TABLE public.encounters;
       public         heap    postgres    false            �            1259    16438    encounters_id_seq    SEQUENCE     �   CREATE SEQUENCE public.encounters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.encounters_id_seq;
       public          postgres    false    218            �           0    0    encounters_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.encounters_id_seq OWNED BY public.encounters.id;
          public          postgres    false    217            �            1259    16448    events    TABLE       CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying(255),
    date date,
    max_participants integer,
    location_x numeric,
    location_y numeric,
    type character varying(255),
    employee_id integer,
    location_name text
);
    DROP TABLE public.events;
       public         heap    postgres    false            �            1259    16447    events_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.events_id_seq;
       public          postgres    false    220            �           0    0    events_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
          public          postgres    false    219            �            1259    16430    tips    TABLE     T   CREATE TABLE public.tips (
    id integer NOT NULL,
    title text,
    tip text
);
    DROP TABLE public.tips;
       public         heap    postgres    false            �            1259    16429    tips_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tips_id_seq;
       public          postgres    false    216            �           0    0    tips_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tips_id_seq OWNED BY public.tips.id;
          public          postgres    false    215            �           2604    16460    customers id    DEFAULT     l   ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
 ;   ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16469    employees id    DEFAULT     l   ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);
 ;   ALTER TABLE public.employees ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16442    encounters id    DEFAULT     n   ALTER TABLE ONLY public.encounters ALTER COLUMN id SET DEFAULT nextval('public.encounters_id_seq'::regclass);
 <   ALTER TABLE public.encounters ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16451 	   events id    DEFAULT     f   ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
 8   ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16433    tips id    DEFAULT     b   ALTER TABLE ONLY public.tips ALTER COLUMN id SET DEFAULT nextval('public.tips_id_seq'::regclass);
 6   ALTER TABLE public.tips ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16457 	   customers 
   TABLE DATA           }   COPY public.customers (id, email, firstname, lastname, birthdate, gender, description, astrological_sign, image) FROM stdin;
    public          postgres    false    222   
+       �          0    16466 	   employees 
   TABLE DATA           b   COPY public.employees (id, email, firstname, lastname, birthdate, gender, job, image) FROM stdin;
    public          postgres    false    224   '+       �          0    16439 
   encounters 
   TABLE DATA           T   COPY public.encounters (id, customer_id, date, rating, comment, source) FROM stdin;
    public          postgres    false    218   D+       �          0    16448    events 
   TABLE DATA           |   COPY public.events (id, name, date, max_participants, location_x, location_y, type, employee_id, location_name) FROM stdin;
    public          postgres    false    220   a+       �          0    16430    tips 
   TABLE DATA           .   COPY public.tips (id, title, tip) FROM stdin;
    public          postgres    false    216   ~+       �           0    0    customers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.customers_id_seq', 1, false);
          public          postgres    false    221            �           0    0    employees_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.employees_id_seq', 1, false);
          public          postgres    false    223            �           0    0    encounters_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.encounters_id_seq', 1, false);
          public          postgres    false    217            �           0    0    events_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.events_id_seq', 1, false);
          public          postgres    false    219            �           0    0    tips_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tips_id_seq', 1, false);
          public          postgres    false    215            �           2606    16464    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    222            �           2606    16473    employees employees_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    224            �           2606    16446    encounters encounters_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.encounters
    ADD CONSTRAINT encounters_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.encounters DROP CONSTRAINT encounters_pkey;
       public            postgres    false    218            �           2606    16455    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    220            �           2606    16437    tips tips_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tips
    ADD CONSTRAINT tips_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tips DROP CONSTRAINT tips_pkey;
       public            postgres    false    216            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     