--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 12.8

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bodega; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bodega (
    id integer NOT NULL,
    id_producto integer,
    cantidad integer,
    cantidad_minima integer
);


ALTER TABLE public.bodega OWNER TO postgres;

--
-- Name: Bodega_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Bodega_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Bodega_id_seq" OWNER TO postgres;

--
-- Name: Bodega_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Bodega_id_seq" OWNED BY public.bodega.id;


--
-- Name: balance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.balance (
    id integer NOT NULL,
    id_turno integer,
    caja_anterior text,
    ventas_total text,
    retiros_total text,
    gastos_total text,
    caja_final text
);


ALTER TABLE public.balance OWNER TO postgres;

--
-- Name: balance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.balance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.balance_id_seq OWNER TO postgres;

--
-- Name: balance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.balance_id_seq OWNED BY public.balance.id;


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nombre text,
    apellido text,
    rut text
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_seq OWNER TO postgres;

--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: detalle_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_pedido (
    id integer NOT NULL,
    id_pedido integer,
    id_producto integer,
    cantidad text
);


ALTER TABLE public.detalle_pedido OWNER TO postgres;

--
-- Name: detalle_pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_pedido_id_seq OWNER TO postgres;

--
-- Name: detalle_pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_pedido_id_seq OWNED BY public.detalle_pedido.id;


--
-- Name: estado_habitacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_habitacion (
    id integer NOT NULL,
    estado text,
    descripcion text
);


ALTER TABLE public.estado_habitacion OWNER TO postgres;

--
-- Name: estado_habitacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_habitacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estado_habitacion_id_seq OWNER TO postgres;

--
-- Name: estado_habitacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_habitacion_id_seq OWNED BY public.estado_habitacion.id;


--
-- Name: gasto_caja; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gasto_caja (
    id integer NOT NULL,
    id_turno integer,
    monto text,
    descripcion text
);


ALTER TABLE public.gasto_caja OWNER TO postgres;

--
-- Name: gasto_caja_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gasto_caja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gasto_caja_id_seq OWNER TO postgres;

--
-- Name: gasto_caja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gasto_caja_id_seq OWNED BY public.gasto_caja.id;


--
-- Name: gasto_inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gasto_inventario (
    id integer NOT NULL,
    id_turno integer,
    id_productos integer,
    cantidad integer,
    descripcion text
);


ALTER TABLE public.gasto_inventario OWNER TO postgres;

--
-- Name: gasto_inventario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gasto_inventario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gasto_inventario_id_seq OWNER TO postgres;

--
-- Name: gasto_inventario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gasto_inventario_id_seq OWNED BY public.gasto_inventario.id;


--
-- Name: habitaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.habitaciones (
    id integer NOT NULL,
    numero integer,
    id_tipo integer,
    id_estado integer,
    descripcion text,
    creado date
);


ALTER TABLE public.habitaciones OWNER TO postgres;

--
-- Name: habitaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.habitaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.habitaciones_id_seq OWNER TO postgres;

--
-- Name: habitaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.habitaciones_id_seq OWNED BY public.habitaciones.id;


--
-- Name: incidentes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incidentes (
    id integer NOT NULL,
    id_servicio integer,
    descripcion text
);


ALTER TABLE public.incidentes OWNER TO postgres;

--
-- Name: incidentes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.incidentes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.incidentes_id_seq OWNER TO postgres;

--
-- Name: incidentes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.incidentes_id_seq OWNED BY public.incidentes.id;


--
-- Name: inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventario (
    id integer NOT NULL,
    id_producto integer,
    cantidad integer,
    cantidad_minima integer
);


ALTER TABLE public.inventario OWNER TO postgres;

--
-- Name: inventario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventario_id_seq OWNER TO postgres;

--
-- Name: inventario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventario_id_seq OWNED BY public.inventario.id;


--
-- Name: lista_negra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lista_negra (
    id integer NOT NULL,
    id_cliente integer
);


ALTER TABLE public.lista_negra OWNER TO postgres;

--
-- Name: lista_negra_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lista_negra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lista_negra_id_seq OWNER TO postgres;

--
-- Name: lista_negra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lista_negra_id_seq OWNED BY public.lista_negra.id;


--
-- Name: pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido (
    id integer NOT NULL,
    id_servicio integer,
    id_tipo_pago integer,
    estado text,
    total text
);


ALTER TABLE public.pedido OWNER TO postgres;

--
-- Name: pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedido_id_seq OWNER TO postgres;

--
-- Name: pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_id_seq OWNED BY public.pedido.id;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre text,
    precio text,
    id_tipo integer
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- Name: promociones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promociones (
    id integer NOT NULL,
    horas text,
    precio double precision,
    bebida boolean,
    trago boolean,
    creado date
);


ALTER TABLE public.promociones OWNER TO postgres;

--
-- Name: promociones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promociones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.promociones_id_seq OWNER TO postgres;

--
-- Name: promociones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promociones_id_seq OWNED BY public.promociones.id;


--
-- Name: retiros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.retiros (
    id integer NOT NULL,
    id_turno integer,
    monto text
);


ALTER TABLE public.retiros OWNER TO postgres;

--
-- Name: retiros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.retiros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.retiros_id_seq OWNER TO postgres;

--
-- Name: retiros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.retiros_id_seq OWNED BY public.retiros.id;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    rol text
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_id_seq OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- Name: rol_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_usuario (
    id_usuario integer,
    id_rol integer,
    id integer NOT NULL
);


ALTER TABLE public.rol_usuario OWNER TO postgres;

--
-- Name: rol_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_usuario_id_seq OWNER TO postgres;

--
-- Name: rol_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_usuario_id_seq OWNED BY public.rol_usuario.id;


--
-- Name: servicio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicio (
    id integer NOT NULL,
    id_cliente integer,
    id_habitacion integer,
    fecha date,
    total text,
    hr_entrada text,
    hr_salida text,
    id_usuario integer,
    id_turno integer
);


ALTER TABLE public.servicio OWNER TO postgres;

--
-- Name: servicio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicio_id_seq OWNER TO postgres;

--
-- Name: servicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicio_id_seq OWNED BY public.servicio.id;


--
-- Name: servicio_promociones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicio_promociones (
    id integer NOT NULL,
    id_servicio integer,
    id_promocion integer,
    id_tipo_pago integer,
    estado text
);


ALTER TABLE public.servicio_promociones OWNER TO postgres;

--
-- Name: servicio_promociones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicio_promociones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicio_promociones_id_seq OWNER TO postgres;

--
-- Name: servicio_promociones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicio_promociones_id_seq OWNED BY public.servicio_promociones.id;


--
-- Name: tipo_habitacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_habitacion (
    id integer NOT NULL,
    tipo text
);


ALTER TABLE public.tipo_habitacion OWNER TO postgres;

--
-- Name: tipo_habitacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_habitacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_habitacion_id_seq OWNER TO postgres;

--
-- Name: tipo_habitacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_habitacion_id_seq OWNED BY public.tipo_habitacion.id;


--
-- Name: tipo_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_pago (
    id integer NOT NULL,
    tipo text
);


ALTER TABLE public.tipo_pago OWNER TO postgres;

--
-- Name: tipo_pago_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_pago_id_seq OWNER TO postgres;

--
-- Name: tipo_pago_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_pago_id_seq OWNED BY public.tipo_pago.id;


--
-- Name: tipo_producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_producto (
    id integer NOT NULL,
    tipo text
);


ALTER TABLE public.tipo_producto OWNER TO postgres;

--
-- Name: tipo_producto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_producto_id_seq OWNER TO postgres;

--
-- Name: tipo_producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_producto_id_seq OWNED BY public.tipo_producto.id;


--
-- Name: tipo_turno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_turno (
    id integer NOT NULL,
    tipo text
);


ALTER TABLE public.tipo_turno OWNER TO postgres;

--
-- Name: tipo_turno_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_turno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_turno_id_seq OWNER TO postgres;

--
-- Name: tipo_turno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_turno_id_seq OWNED BY public.tipo_turno.id;


--
-- Name: turno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turno (
    id integer NOT NULL,
    id_tipo integer,
    fecha text
);


ALTER TABLE public.turno OWNER TO postgres;

--
-- Name: turno_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.turno_id_seq OWNER TO postgres;

--
-- Name: turno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turno_id_seq OWNED BY public.turno.id;


--
-- Name: turno_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turno_usuario (
    id integer NOT NULL,
    id_usuario integer,
    id_turno integer
);


ALTER TABLE public.turno_usuario OWNER TO postgres;

--
-- Name: turno_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turno_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.turno_usuario_id_seq OWNER TO postgres;

--
-- Name: turno_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turno_usuario_id_seq OWNED BY public.turno_usuario.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre text,
    apellido text,
    rut text,
    correo text,
    telefono text,
    direccion text,
    "contrase├▒a" text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: balance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balance ALTER COLUMN id SET DEFAULT nextval('public.balance_id_seq'::regclass);


--
-- Name: bodega id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bodega ALTER COLUMN id SET DEFAULT nextval('public."Bodega_id_seq"'::regclass);


--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: detalle_pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN id SET DEFAULT nextval('public.detalle_pedido_id_seq'::regclass);


--
-- Name: estado_habitacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_habitacion ALTER COLUMN id SET DEFAULT nextval('public.estado_habitacion_id_seq'::regclass);


--
-- Name: gasto_caja id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_caja ALTER COLUMN id SET DEFAULT nextval('public.gasto_caja_id_seq'::regclass);


--
-- Name: gasto_inventario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_inventario ALTER COLUMN id SET DEFAULT nextval('public.gasto_inventario_id_seq'::regclass);


--
-- Name: habitaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitaciones ALTER COLUMN id SET DEFAULT nextval('public.habitaciones_id_seq'::regclass);


--
-- Name: incidentes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidentes ALTER COLUMN id SET DEFAULT nextval('public.incidentes_id_seq'::regclass);


--
-- Name: inventario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario ALTER COLUMN id SET DEFAULT nextval('public.inventario_id_seq'::regclass);


--
-- Name: lista_negra id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_negra ALTER COLUMN id SET DEFAULT nextval('public.lista_negra_id_seq'::regclass);


--
-- Name: pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido ALTER COLUMN id SET DEFAULT nextval('public.pedido_id_seq'::regclass);


--
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- Name: promociones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promociones ALTER COLUMN id SET DEFAULT nextval('public.promociones_id_seq'::regclass);


--
-- Name: retiros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiros ALTER COLUMN id SET DEFAULT nextval('public.retiros_id_seq'::regclass);


--
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- Name: rol_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_usuario ALTER COLUMN id SET DEFAULT nextval('public.rol_usuario_id_seq'::regclass);


--
-- Name: servicio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio ALTER COLUMN id SET DEFAULT nextval('public.servicio_id_seq'::regclass);


--
-- Name: servicio_promociones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio_promociones ALTER COLUMN id SET DEFAULT nextval('public.servicio_promociones_id_seq'::regclass);


--
-- Name: tipo_habitacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_habitacion ALTER COLUMN id SET DEFAULT nextval('public.tipo_habitacion_id_seq'::regclass);


--
-- Name: tipo_pago id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_pago ALTER COLUMN id SET DEFAULT nextval('public.tipo_pago_id_seq'::regclass);


--
-- Name: tipo_producto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_producto ALTER COLUMN id SET DEFAULT nextval('public.tipo_producto_id_seq'::regclass);


--
-- Name: tipo_turno id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_turno ALTER COLUMN id SET DEFAULT nextval('public.tipo_turno_id_seq'::regclass);


--
-- Name: turno id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno ALTER COLUMN id SET DEFAULT nextval('public.turno_id_seq'::regclass);


--
-- Name: turno_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno_usuario ALTER COLUMN id SET DEFAULT nextval('public.turno_usuario_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: balance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.balance (id, id_turno, caja_anterior, ventas_total, retiros_total, gastos_total, caja_final) FROM stdin;
\.


--
-- Data for Name: bodega; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bodega (id, id_producto, cantidad, cantidad_minima) FROM stdin;
1	1	\N	5
2	2	\N	5
3	3	\N	5
4	4	\N	5
5	5	\N	24
6	6	\N	24
7	7	\N	24
8	8	\N	24
9	9	\N	24
10	10	\N	5
11	11	\N	5
12	12	\N	5
13	13	\N	5
14	14	\N	5
15	15	\N	5
16	16	\N	24
17	17	\N	15
18	18	\N	6
19	19	\N	5
\.


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id, nombre, apellido, rut) FROM stdin;
\.


--
-- Data for Name: detalle_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_pedido (id, id_pedido, id_producto, cantidad) FROM stdin;
\.


--
-- Data for Name: estado_habitacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_habitacion (id, estado, descripcion) FROM stdin;
1	disponible	habitaci├│n limpia
2	ocupada	habitaci├│n con clientes
3	aseo	habitaci├│n necesita limpieza
\.


--
-- Data for Name: gasto_caja; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gasto_caja (id, id_turno, monto, descripcion) FROM stdin;
\.


--
-- Data for Name: gasto_inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gasto_inventario (id, id_turno, id_productos, cantidad, descripcion) FROM stdin;
\.


--
-- Data for Name: habitaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.habitaciones (id, numero, id_tipo, id_estado, descripcion, creado) FROM stdin;
6	1	1	1	primera habitacion	2021-10-20
\.


--
-- Data for Name: incidentes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.incidentes (id, id_servicio, descripcion) FROM stdin;
\.


--
-- Data for Name: inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventario (id, id_producto, cantidad, cantidad_minima) FROM stdin;
1	1	\N	3
2	2	\N	5
3	3	\N	5
4	4	\N	5
5	5	\N	5
6	6	\N	5
7	7	\N	5
8	8	\N	5
9	9	\N	5
10	10	\N	4
11	11	\N	4
12	12	\N	4
13	13	\N	4
14	14	\N	4
15	15	\N	4
16	16	\N	40
17	17	\N	20
18	18	\N	\N
19	19	\N	\N
\.


--
-- Data for Name: lista_negra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lista_negra (id, id_cliente) FROM stdin;
\.


--
-- Data for Name: pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido (id, id_servicio, id_tipo_pago, estado, total) FROM stdin;
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, precio, id_tipo) FROM stdin;
1	papas fritas	3500	1
2	churrasco	4500	1
3	galletas	1500	1
4	carne	2500	1
5	fanta	2200	2
6	coca-cola	2200	2
7	sprite	2200	2
8	mineral	1500	2
9	cerveza	2500	3
10	ron	3500	3
11	pisco	3500	3
12	sour	3500	3
13	granadina	3500	3
14	martini	3500	3
15	whisky	5000	3
16	toallas	\N	4
17	sabanas	\N	4
18	guantes	\N	5
19	servilletas	\N	5
\.


--
-- Data for Name: promociones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promociones (id, horas, precio, bebida, trago, creado) FROM stdin;
1	2	12800	f	\N	2021-11-09
2	6	19800	t	t	2021-11-09
3	3	16000	t	\N	2021-11-09
4	10	20000	t	t	2021-11-09
5	4	27000	t	t	2021-11-09
6	\N	\N	\N	\N	\N
\.


--
-- Data for Name: retiros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.retiros (id, id_turno, monto) FROM stdin;
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id, rol) FROM stdin;
1	admin
2	camarera
3	cajero
\.


--
-- Data for Name: rol_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol_usuario (id_usuario, id_rol, id) FROM stdin;
1	1	1
2	2	2
3	3	3
\.


--
-- Data for Name: servicio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicio (id, id_cliente, id_habitacion, fecha, total, hr_entrada, hr_salida, id_usuario, id_turno) FROM stdin;
\.


--
-- Data for Name: servicio_promociones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicio_promociones (id, id_servicio, id_promocion, id_tipo_pago, estado) FROM stdin;
\.


--
-- Data for Name: tipo_habitacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_habitacion (id, tipo) FROM stdin;
1	jacuzzi
2	normal
\.


--
-- Data for Name: tipo_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_pago (id, tipo) FROM stdin;
1	efectivo
2	tarjeta
\.


--
-- Data for Name: tipo_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_producto (id, tipo) FROM stdin;
1	comida
2	bebida
3	alcohol
4	ropa
5	utiles
\.


--
-- Data for Name: tipo_turno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_turno (id, tipo) FROM stdin;
1	dia
2	noche
\.


--
-- Data for Name: turno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turno (id, id_tipo, fecha) FROM stdin;
\.


--
-- Data for Name: turno_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turno_usuario (id, id_usuario, id_turno) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellido, rut, correo, telefono, direccion, "contrase├▒a") FROM stdin;
1	nombre1	apellido1	11.111.111-1	nombre1@gmail.com	+56978787878	dir1	123456
2	nombre2	apellido2	22.222.222-2	nombre2@gmail.com	+56922222222	dir2	123456
3	nombre3	apellido3	33.333.333-3	nombre3@gmail.com	+56933333333	dir3	123456
\.


--
-- Name: Bodega_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Bodega_id_seq"', 19, true);


--
-- Name: balance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.balance_id_seq', 1, false);


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, false);


--
-- Name: detalle_pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_pedido_id_seq', 1, false);


--
-- Name: estado_habitacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_habitacion_id_seq', 3, true);


--
-- Name: gasto_caja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gasto_caja_id_seq', 1, false);


--
-- Name: gasto_inventario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gasto_inventario_id_seq', 1, false);


--
-- Name: habitaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.habitaciones_id_seq', 6, true);


--
-- Name: incidentes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.incidentes_id_seq', 1, false);


--
-- Name: inventario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventario_id_seq', 19, true);


--
-- Name: lista_negra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lista_negra_id_seq', 1, false);


--
-- Name: pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_id_seq', 1, false);


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 19, true);


--
-- Name: promociones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promociones_id_seq', 6, true);


--
-- Name: retiros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.retiros_id_seq', 1, false);


--
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_seq', 3, true);


--
-- Name: rol_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_usuario_id_seq', 7, true);


--
-- Name: servicio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicio_id_seq', 1, false);


--
-- Name: servicio_promociones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicio_promociones_id_seq', 1, false);


--
-- Name: tipo_habitacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_habitacion_id_seq', 2, true);


--
-- Name: tipo_pago_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_pago_id_seq', 2, true);


--
-- Name: tipo_producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_producto_id_seq', 5, true);


--
-- Name: tipo_turno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_turno_id_seq', 2, true);


--
-- Name: turno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turno_id_seq', 1, false);


--
-- Name: turno_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turno_usuario_id_seq', 1, false);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- Name: tipo_producto fk-tipo_producto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_producto
    ADD CONSTRAINT "fk-tipo_producto" PRIMARY KEY (id);


--
-- Name: balance pk-balance; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balance
    ADD CONSTRAINT "pk-balance" PRIMARY KEY (id);


--
-- Name: bodega pk-bodega; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bodega
    ADD CONSTRAINT "pk-bodega" PRIMARY KEY (id);


--
-- Name: clientes pk-clientes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT "pk-clientes" PRIMARY KEY (id);


--
-- Name: detalle_pedido pk-detalle_pedido; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT "pk-detalle_pedido" PRIMARY KEY (id);


--
-- Name: gasto_caja pk-gasto_caja; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_caja
    ADD CONSTRAINT "pk-gasto_caja" PRIMARY KEY (id);


--
-- Name: gasto_inventario pk-gasto_inventario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_inventario
    ADD CONSTRAINT "pk-gasto_inventario" PRIMARY KEY (id);


--
-- Name: incidentes pk-incidentes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidentes
    ADD CONSTRAINT "pk-incidentes" PRIMARY KEY (id);


--
-- Name: inventario pk-inventario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT "pk-inventario" PRIMARY KEY (id);


--
-- Name: lista_negra pk-lista_negra; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_negra
    ADD CONSTRAINT "pk-lista_negra" PRIMARY KEY (id);


--
-- Name: pedido pk-pedido; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT "pk-pedido" PRIMARY KEY (id);


--
-- Name: productos pk-productos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "pk-productos" PRIMARY KEY (id);


--
-- Name: promociones pk-promociones; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promociones
    ADD CONSTRAINT "pk-promociones" PRIMARY KEY (id);


--
-- Name: retiros pk-retiros; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiros
    ADD CONSTRAINT "pk-retiros" PRIMARY KEY (id);


--
-- Name: servicio pk-servicio; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT "pk-servicio" PRIMARY KEY (id);


--
-- Name: servicio_promociones pk-servicio_promociones; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio_promociones
    ADD CONSTRAINT "pk-servicio_promociones" PRIMARY KEY (id);


--
-- Name: tipo_pago pk-tipo_pago; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_pago
    ADD CONSTRAINT "pk-tipo_pago" PRIMARY KEY (id);


--
-- Name: tipo_turno pk-tipo_turno; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_turno
    ADD CONSTRAINT "pk-tipo_turno" PRIMARY KEY (id);


--
-- Name: turno pk-turno; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno
    ADD CONSTRAINT "pk-turno" PRIMARY KEY (id);


--
-- Name: turno_usuario pk-turno_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno_usuario
    ADD CONSTRAINT "pk-turno_usuario" PRIMARY KEY (id);


--
-- Name: rol_usuario pk_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_usuario
    ADD CONSTRAINT pk_id PRIMARY KEY (id);


--
-- Name: estado_habitacion pk_id_estado_habitacion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_habitacion
    ADD CONSTRAINT pk_id_estado_habitacion PRIMARY KEY (id);


--
-- Name: habitaciones pk_id_habitaciones; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT pk_id_habitaciones PRIMARY KEY (id);


--
-- Name: rol pk_id_rol; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT pk_id_rol PRIMARY KEY (id);


--
-- Name: tipo_habitacion pk_id_tipo_habitacion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_habitacion
    ADD CONSTRAINT pk_id_tipo_habitacion PRIMARY KEY (id);


--
-- Name: usuarios pk_id_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT pk_id_usuario PRIMARY KEY (id);


--
-- Name: balance fk-balance-turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balance
    ADD CONSTRAINT "fk-balance-turno" FOREIGN KEY (id_turno) REFERENCES public.turno(id);


--
-- Name: bodega fk-bodega-productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bodega
    ADD CONSTRAINT "fk-bodega-productos" FOREIGN KEY (id_producto) REFERENCES public.productos(id);


--
-- Name: detalle_pedido fk-detalle_pedido-pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT "fk-detalle_pedido-pedido" FOREIGN KEY (id_pedido) REFERENCES public.pedido(id);


--
-- Name: detalle_pedido fk-detalle_pedido-productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT "fk-detalle_pedido-productos" FOREIGN KEY (id_producto) REFERENCES public.productos(id);


--
-- Name: gasto_caja fk-gasto_caja-turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_caja
    ADD CONSTRAINT "fk-gasto_caja-turno" FOREIGN KEY (id_turno) REFERENCES public.turno(id);


--
-- Name: gasto_inventario fk-gasto_inventario-productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_inventario
    ADD CONSTRAINT "fk-gasto_inventario-productos" FOREIGN KEY (id_productos) REFERENCES public.productos(id);


--
-- Name: gasto_inventario fk-gasto_inventario-turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gasto_inventario
    ADD CONSTRAINT "fk-gasto_inventario-turno" FOREIGN KEY (id_turno) REFERENCES public.turno(id);


--
-- Name: habitaciones fk-id_estado-id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT "fk-id_estado-id" FOREIGN KEY (id_estado) REFERENCES public.estado_habitacion(id) NOT VALID;


--
-- Name: rol_usuario fk-id_rol-id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_usuario
    ADD CONSTRAINT "fk-id_rol-id" FOREIGN KEY (id_rol) REFERENCES public.rol(id) NOT VALID;


--
-- Name: habitaciones fk-id_tipo-id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT "fk-id_tipo-id" FOREIGN KEY (id_tipo) REFERENCES public.tipo_habitacion(id) NOT VALID;


--
-- Name: rol_usuario fk-id_usuario-id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_usuario
    ADD CONSTRAINT "fk-id_usuario-id" FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;


--
-- Name: incidentes fk-incidentes-servicio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidentes
    ADD CONSTRAINT "fk-incidentes-servicio" FOREIGN KEY (id_servicio) REFERENCES public.servicio(id) NOT VALID;


--
-- Name: inventario fk-inventario-productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT "fk-inventario-productos" FOREIGN KEY (id_producto) REFERENCES public.productos(id);


--
-- Name: lista_negra fk-lista_negra-clientes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_negra
    ADD CONSTRAINT "fk-lista_negra-clientes" FOREIGN KEY (id_cliente) REFERENCES public.clientes(id) NOT VALID;


--
-- Name: pedido fk-pedido-servicio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT "fk-pedido-servicio" FOREIGN KEY (id_servicio) REFERENCES public.servicio(id) NOT VALID;


--
-- Name: pedido fk-pedido-tipo_pago; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT "fk-pedido-tipo_pago" FOREIGN KEY (id_tipo_pago) REFERENCES public.tipo_pago(id) NOT VALID;


--
-- Name: productos fk-productos-tipo_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "fk-productos-tipo_producto" FOREIGN KEY (id_tipo) REFERENCES public.tipo_producto(id) NOT VALID;


--
-- Name: retiros fk-retiros-turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retiros
    ADD CONSTRAINT "fk-retiros-turno" FOREIGN KEY (id_turno) REFERENCES public.turno(id);


--
-- Name: servicio fk-servicio-clientes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT "fk-servicio-clientes" FOREIGN KEY (id_cliente) REFERENCES public.clientes(id);


--
-- Name: servicio fk-servicio-habitaciones; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT "fk-servicio-habitaciones" FOREIGN KEY (id_habitacion) REFERENCES public.habitaciones(id);


--
-- Name: servicio fk-servicio-turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT "fk-servicio-turno" FOREIGN KEY (id_turno) REFERENCES public.turno(id);


--
-- Name: servicio fk-servicio-usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT "fk-servicio-usuarios" FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- Name: servicio_promociones fk-servicio_promociones-promociones; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio_promociones
    ADD CONSTRAINT "fk-servicio_promociones-promociones" FOREIGN KEY (id_promocion) REFERENCES public.promociones(id) NOT VALID;


--
-- Name: servicio_promociones fk-servicio_promociones-servicio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio_promociones
    ADD CONSTRAINT "fk-servicio_promociones-servicio" FOREIGN KEY (id_servicio) REFERENCES public.servicio(id) NOT VALID;


--
-- Name: servicio_promociones fk-servicio_promociones-tipo_pago; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicio_promociones
    ADD CONSTRAINT "fk-servicio_promociones-tipo_pago" FOREIGN KEY (id_tipo_pago) REFERENCES public.tipo_pago(id) NOT VALID;


--
-- Name: turno fk-turno-tipo_turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno
    ADD CONSTRAINT "fk-turno-tipo_turno" FOREIGN KEY (id_tipo) REFERENCES public.tipo_turno(id);


--
-- Name: turno_usuario fk-turno_usuario-turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno_usuario
    ADD CONSTRAINT "fk-turno_usuario-turno" FOREIGN KEY (id_turno) REFERENCES public.turno(id);


--
-- Name: turno_usuario fk-turno_usuario-usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno_usuario
    ADD CONSTRAINT "fk-turno_usuario-usuarios" FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--

