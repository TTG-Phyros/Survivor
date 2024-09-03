PGDMP  (        	            |           survivor    16.3    16.3     B           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            C           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            D           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            E           1262    16416    survivor    DATABASE     s   CREATE DATABASE survivor WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'fr_FR.utf8';
    DROP DATABASE survivor;
                postgres    false            F           0    0    DATABASE survivor    COMMENT     F   COMMENT ON DATABASE survivor IS 'Database for survivor (TEK 3 pool)';
                   postgres    false    4421            �            1259    16435 	   employees    TABLE     5  CREATE TABLE public.employees (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    birthdate date NOT NULL,
    gender character varying(255) NOT NULL,
    job character varying(255) NOT NULL
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    16434    employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.employees_id_seq;
       public          postgres    false    216            G           0    0    employees_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;
          public          postgres    false    215            �           2604    16438    employees id    DEFAULT     l   ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);
 ;   ALTER TABLE public.employees ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            ?          0    16435 	   employees 
   TABLE DATA           [   COPY public.employees (id, email, firstname, lastname, birthdate, gender, job) FROM stdin;
    public          postgres    false    216   1       H           0    0    employees_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.employees_id_seq', 2, true);
          public          postgres    false    215            �           2606    16442    employees employees_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    216            ?   o   x�˱
�0��ϻD��M����	�9�4Ʌ3��|�ף�Ui�Ū!�hQ�{�,�X�)�\��r榆�)�q��Ix���pa��9�#�<6I�1󗣔�����$I     