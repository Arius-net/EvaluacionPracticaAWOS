# ☕ Cafetería Analytics - Sistema de Reportes Empresariales

Sistema completo de análisis y reportes para cafeterías construido con **Next.js 15**, **PostgreSQL**, **Docker** y **TypeScript**. Ofrece 5 dashboards interactivos con visualizaciones en tiempo real para la toma de decisiones empresariales.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida](#-instalación-rápida)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#️-base-de-datos)
- [Reportes Disponibles](#-reportes-disponibles)
- [Configuración](#-configuración)
- [Uso y Ejemplos](#-uso-y-ejemplos)
- [Desarrollo](#-desarrollo)
- [Troubleshooting](#-troubleshooting)
- [Despliegue](#-despliegue)

---

## ✨ Características

###  Reportes Analíticos
- **5 Dashboards Interactivos**: Ventas, productos, clientes, inventario y pagos
- **Filtros Dinámicos**: Búsqueda y filtrado por fechas en tiempo real
- **Paginación Inteligente**: Navegación eficiente en grandes conjuntos de datos
- **KPIs Visuales**: Métricas clave destacadas con tarjetas interactivas

###  Interfaz de Usuario
- **Diseño Moderno**: UI responsive con Tailwind CSS 4
- **Gradientes y Animaciones**: Transiciones suaves y efectos hover
- **Iconos y Emojis**: Identificación visual rápida
- **Modo Oscuro**: (Opcional - puede implementarse)

###  Rendimiento
- **Server Components**: Renderizado del lado del servidor con Next.js 15
- **Vistas Materializadas**: Consultas optimizadas en PostgreSQL
- **Índices de Base de Datos**: Búsquedas ultrarrápidas
- **Docker Compose**: Deploy en segundos

###  Seguridad
- **Usuarios con Privilegios Limitados**: Acceso de solo lectura a vistas
- **Validación con Zod**: Schemas tipados y seguros
- **TypeScript Estricto**: Type-safety en todo el código

---

##  Tecnologías

| Categoría | Tecnología | Versión | Descripción |
|-----------|------------|---------|-------------|
| **Framework** | [Next.js](https://nextjs.org) | 16.1.6 | Framework React con SSR/SSG |
| **UI Library** | [React](https://react.dev) | 19.2.3 | Librería de interfaces |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org) | ^5 | Tipado estático |
| **Base de Datos** | [PostgreSQL](https://www.postgresql.org) | 15-alpine | Base de datos relacional |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com) | ^4 | Framework CSS utility-first |
| **Containerización** | [Docker](https://www.docker.com) | Latest | Orquestación de contenedores |
| **DB Driver** | [node-postgres](https://node-postgres.com) | ^8.18.0 | Cliente PostgreSQL para Node.js |
| **Validación** | Zod | - | Validación de schemas TypeScript |

---

##  Requisitos Previos

Asegúrate de tener instalado:

-  **Docker Desktop** ([Descargar](https://www.docker.com/products/docker-desktop))
-  **Docker Compose** (incluido con Docker Desktop)
-  **Node.js 20+** (opcional, solo para desarrollo sin Docker)
-  **Git** (para clonar el repositorio)

---

##  Instalación Rápida

### Método 1: Con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd EvaluacionPracticaAWOS/evalpractica

# 2. Iniciar los servicios
docker-compose up --build

# 3. Acceder a la aplicación
#  http://localhost:3000
```

### Método 2: Sin Docker (Desarrollo Local)

```bash
# 1. Asegúrate de tener PostgreSQL corriendo localmente

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL

# 3. Crear la base de datos
psql -U postgres -f db/schema.sql
psql -U postgres -f db/seed.sql
psql -U postgres -f db/reports_vw.sql
psql -U postgres -f db/indexes.sql
psql -U postgres -f db/roles.sql

# 4. Instalar dependencias
npm install

# 5. Iniciar el servidor de desarrollo
npm run dev
```

###  ¡Listo!

Abre tu navegador en **http://localhost:3000** y verás el dashboard principal con 5 reportes disponibles.

---

##  Estructura del Proyecto

```
evalpractica/
│
├──  src/
│   ├──  app/                          # App Router (Next.js 13+)
│   │   ├── page.tsx                     # 🏠 Dashboard principal
│   │   ├── layout.tsx                   # Layout global
│   │   ├── globals.css                  # Estilos globales
│   │   └──  reports/                  # Módulo de reportes
│   │       ├──  sales-daily/          #  Ventas diarias
│   │       │   └── page.tsx
│   │       ├──  top-products/         #  Productos estrella
│   │       │   └── page.tsx
│   │       ├──  customer-value/       #  Valor del cliente
│   │       │   └── page.tsx
│   │       ├──  inventory-risk/       #  Alertas de inventario
│   │       │   └── page.tsx
│   │       └──  payment-mix/          #  Mezcla de pagos
│   │           └── page.tsx
│   ├──  components/                   # Componentes reutilizables
│   └──  lib/
│       ├── db.ts                        #  Cliente PostgreSQL
│       └── config.ts                    #  Configuración
│
├──  db/                               # Scripts de base de datos
│   ├── schema.sql                       #  Esquema de tablas
│   ├── seed.sql                         #  Datos de prueba
│   ├── reports_vw.sql                   #  Vistas materializadas
│   ├── indexes.sql                      #  Índices de optimización
│   └── roles.sql                        #  Roles y permisos
│
├── public/                           # Archivos estáticos
├── .env                                 #  Variables de entorno
├── docker-compose.yml                   #  Orquestación Docker
├── Dockerfile                           #  Imagen de la app
├── next.config.ts                       #  Configuración Next.js
├── tailwind.config.ts                   #  Configuración Tailwind
├── tsconfig.json                        #  Configuración TypeScript
├── package.json                         #  Dependencias
└── README.md                            #  Este archivo
```

---

## 🗄️ Base de Datos

### Arquitectura de Datos

El sistema utiliza **PostgreSQL 15** con un esquema normalizado y vistas materializadas para reportes optimizados.

###  Tablas Principales

Definidas en `db/schema.sql`:

| Tabla | Descripción | Campos Clave |
|-------|-------------|--------------|
| `categories` | Categorías de productos | id, name |
| `products` | Catálogo de productos | id, name, category_id, price, stock |
| `customers` | Base de clientes | id, name, email |
| `orders` | Órdenes de compra | id, customer_id, created_at, status |
| `order_items` | Detalles de órdenes | id, order_id, product_id, qty, unit_price |
| `payments` | Transacciones de pago | id, order_id, method, paid_amount |

###  Vistas Analíticas

Definidas en `db/reports_vw.sql`:

| Vista | Query | Uso |
|-------|-------|-----|
| `vw_sales_daily` | Ventas agrupadas por día | Dashboard de ventas |
| `vw_top_products_ranked` | Ranking de productos por revenue | Top productos |
| `vw_inventory_risk` | Productos con stock bajo/agotado | Alertas de inventario |
| `vw_customer_value` | Análisis de valor por cliente | Segmentación |
| `vw_payment_mix` | Distribución de métodos de pago | Preferencias |

###  Inicialización Automática

Al ejecutar `docker-compose up`, los scripts se ejecutan en orden:

1. **1-schema.sql** → Crea las tablas
2. **2-seed.sql** → Inserta datos de prueba
3. **3-reports_vw.sql** → Crea las vistas
4. **4-indexes.sql** → Aplica índices para optimización
5. **5-roles.sql** → Configura roles de usuario con permisos limitados

###  Seguridad de Base de Datos

```sql
-- Usuario de aplicación (solo lectura en vistas)
CREATE USER app_user WITH PASSWORD '0620';
GRANT CONNECT ON DATABASE postgres TO app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_user;
```

---

##  Reportes Disponibles

### 1.  Ventas Diarias

**Ruta:** `/reports/sales-daily`  
**Vista:** `vw_sales_daily`

**Características:**
-  Filtro por rango de fechas (`date_from`, `date_to`)
-  KPIs: Ingreso total, total tickets, ticket promedio
-  Tabla con ventas diarias detalladas
-  Validación con Zod

**Query Base:**
```sql
SELECT * FROM vw_sales_daily 
WHERE fecha BETWEEN $1 AND $2 
ORDER BY fecha DESC
```

**Ejemplo de Uso:**
```
http://localhost:3000/reports/sales-daily?date_from=2024-01-01&date_to=2024-12-31
```

---

### 2. Productos Estrella

**Ruta:** `/reports/top-products`  
**Vista:** `vw_top_products_ranked`

**Características:**
-  Buscador de productos (ILIKE)
- Ranking con medallas (🥇🥈🥉)
-  Cards con métricas: revenue, unidades, precio promedio
-  Diseño de tarjetas moderno

**Query Base:**
```sql
SELECT * FROM vw_top_products_ranked 
WHERE name ILIKE $1 
ORDER BY ranking ASC
```

**Ejemplo de Uso:**
```
http://localhost:3000/reports/top-products?search=cappuccino
```

---

### 3.  Valor del Cliente

**Ruta:** `/reports/customer-value`  
**Vista:** `vw_customer_value`

**Características:**
-  Paginación (10 clientes por página)
-  Categorización:  VIP,  Premium,  Regular
-  Métricas: Total gastado, visitas, gasto promedio
-  Ranking con avatares

**Query Base:**
```sql
SELECT * FROM vw_customer_value 
ORDER BY total_gastado DESC 
LIMIT $1 OFFSET $2
```

**Ejemplo de Uso:**
```
http://localhost:3000/reports/customer-value?page=2
```

---

### 4.  Alerta de Inventario

**Ruta:** `/reports/inventory-risk`  
**Vista:** `vw_inventory_risk`

**Características:**
- ✅ Estados de riesgo:  Agotado,  Bajo,  Medio,  Óptimo
- ✅ Alertas visuales con banners
- ✅ Distribución con barra de progreso
- ✅ Recomendaciones de acción

**Query Base:**
```sql
SELECT * FROM vw_inventory_risk 
ORDER BY stock ASC
```

**Lógica de Estados:**
- **Agotado**: stock = 0
- **Bajo**: stock 1-5
- **Medio**: stock 6-10
- **Óptimo**: stock > 10

---

### 5.  Mezcla de Pagos

**Ruta:** `/reports/payment-mix`  
**Vista:** `vw_payment_mix`

**Características:**
- Visualización de distribución porcentual
- Cards por método de pago
- Gráficos de barras horizontales
- Método preferido destacado

**Query Base:**
```sql
SELECT * FROM vw_payment_mix 
ORDER BY total_transacciones DESC
```

**Ejemplo de Uso:**
```
http://localhost:3000/reports/payment-mix
```

---

##  Configuración

### Variables de Entorno

El archivo `.env` contiene:

```env
# Credenciales del usuario de aplicación (solo lectura)
DB_USER=app_user
DB_PASSWORD=0620
DB_HOST=db              # 'db' para Docker, 'localhost' para local
DB_NAME=postgres
DB_PORT=5432
```

### Docker Compose

El archivo `docker-compose.yml` define dos servicios:

```yaml
services:
  db:                   # PostgreSQL 15
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: 0620
    volumes:            # Scripts SQL se ejecutan automáticamente
      - ./db/schema.sql:/docker-entrypoint-initdb.d/1-schema.sql
      - ./db/seed.sql:/docker-entrypoint-initdb.d/2-seed.sql
      - ./db/reports_vw.sql:/docker-entrypoint-initdb.d/3-reports_vw.sql
      - ./db/indexes.sql:/docker-entrypoint-initdb.d/4-indexes.sql
      - ./db/roles.sql:/docker-entrypoint-initdb.d/5-roles.sql

  app:                  # Next.js 16
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
```

### Cliente de Base de Datos

El archivo `src/lib/db.ts` configura el pool de conexiones:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = async (text: string, params?: any[]) => {
  const res = await pool.query(text, params);
  console.log('Query executed:', { text, rows: res.rowCount });
  return res;
};
```

---

##  Uso y Ejemplos

### Acceder al Dashboard Principal

1. Abre tu navegador en: **http://localhost:3000**
2. Verás 5 tarjetas con los reportes disponibles
3. Haz clic en cualquier tarjeta para acceder al reporte

### Filtrar Datos

**Ventas por Período:**
```bash
curl "http://localhost:3000/reports/sales-daily?date_from=2024-01-01&date_to=2024-06-30"
```

**Buscar Productos:**
```bash
curl "http://localhost:3000/reports/top-products?search=cafe"
```

**Navegar Clientes:**
```bash
curl "http://localhost:3000/reports/customer-value?page=3"
```

### Conectar a PostgreSQL (Cliente Externo)

```bash
# Usando psql
psql -h localhost -p 5432 -U postgres -d postgres
# Password: 0620

# Usando pgAdmin o DBeaver
Host: localhost
Port: 5432
Database: postgres
Username: postgres
Password: 0620
```

### Consultas de Ejemplo

```sql
-- Ver ventas totales
SELECT * FROM vw_sales_daily ORDER BY fecha DESC LIMIT 10;

-- Top 5 productos
SELECT * FROM vw_top_products_ranked ORDER BY ranking ASC LIMIT 5;

-- Clientes VIP (gasto > $100)
SELECT * FROM vw_customer_value WHERE total_gastado > 100;

-- Productos agotados
SELECT * FROM vw_inventory_risk WHERE estatus_riesgo = 'Agotado';

-- Método de pago preferido
SELECT * FROM vw_payment_mix ORDER BY porcentaje DESC LIMIT 1;
```

---

## 🔧 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo local (sin Docker)
npm run dev          # Inicia servidor en http://localhost:3000

# Producción
npm run build        # Construye la aplicación optimizada
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

### Comandos Docker Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs específicos de un servicio
docker-compose logs -f app
docker-compose logs -f db

# Reiniciar servicios
docker-compose restart

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir sin caché
docker-compose build --no-cache

# Ejecutar comandos dentro del contenedor
docker exec -it cafeteria-app sh
docker exec -it cafeteria-db psql -U postgres
```

### Hot Reload

El código se recarga automáticamente al editar archivos gracias a:
- **Next.js Fast Refresh** para componentes React
- **Volúmenes Docker** mapeados en `docker-compose.yml`

### Agregar Nuevos Reportes

1. Crear la vista SQL en `db/reports_vw.sql`:
```sql
CREATE VIEW vw_mi_nuevo_reporte AS
SELECT ...
```

2. Crear la página en `src/app/reports/mi-reporte/page.tsx`:
```tsx
import { query } from '@/lib/db';

export default async function MiReporte() {
  const { rows } = await query('SELECT * FROM vw_mi_nuevo_reporte');
  return <div>{/* UI aquí */}</div>;
}
```

3. Agregar al dashboard principal en `src/app/page.tsx`

---

## Troubleshooting

### Error: "searchParams is a Promise"

**Solución:** Ya está resuelto en todas las páginas. Usamos `await searchParams`.

```typescript
export default async function Page({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const { search } = params;
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const { search } = searchParams; // Error!
}
```

### PostgreSQL no inicia

```bash
# Ver logs
docker-compose logs db

# Verificar permisos
# Windows: Docker Desktop debe tener acceso al disco C:

# Reiniciar contenedor
docker-compose restart db

# Eliminar volúmenes y reiniciar
docker-compose down -v
docker-compose up --build
```

### Puerto 3000 ya está en uso

**Opción 1:** Cambiar el puerto en `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"
```

**Opción 2:** Detener el proceso que usa el puerto:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Conexión rechazada a la base de datos

1. **Verificar que el contenedor esté corriendo:**
```bash
docker ps
# Debe aparecer: cafeteria-db
```

2. **Ver logs del contenedor:**
```bash
docker-compose logs db
```

3. **Revisar variables de entorno:**
```bash
cat .env
# Asegúrate de que DB_HOST=db (no localhost)
```

4. **Probar conexión manual:**
```bash
docker exec -it cafeteria-db psql -U postgres
```

### Error al construir la imagen Docker

```bash
# Limpiar caché de Docker
docker system prune -a --volumes

# Reconstruir sin caché
docker-compose build --no-cache
docker-compose up
```

### Cambios en `db/*.sql` no se aplican

Los scripts de `docker-entrypoint-initdb.d` solo se ejecutan si la BD está vacía:

```bash
# Solución: Eliminar volúmenes y recrear
docker-compose down -v
docker-compose up --build
```

##  Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

##  Autor
Quevedo Flores Sayd Alexandro - 243701
Desarrollado como proyecto de evaluación práctica - 2026
