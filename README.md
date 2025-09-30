# Hackathon Frontend

Este proyecto es una aplicación web desarrollada con **Next.js**, diseñada para proporcionar una experiencia interactiva y moderna. A continuación, se detalla la estructura del proyecto, las tecnologías utilizadas y cómo funciona.

## Tecnologías principales

- **Next.js**: Framework de React para el desarrollo de aplicaciones web con renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG).
- **React**: Biblioteca para construir interfaces de usuario basadas en componentes.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y responsivo.
- **TypeScript**: Superset de JavaScript que añade tipado estático al lenguaje.
- **PNPM**: Gestor de paquetes rápido y eficiente.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

- **src/app**: Contiene las páginas principales de la aplicación, como `LandingPage`, `home`, y `Onboarding`.
- **src/presentation**: Incluye los componentes reutilizables, vistas y layouts.
  - **components**: Componentes reutilizables como `Button`, `Navbar`, y `Footer`.
  - **views**: Vistas específicas como `ForgotPasswordView`, `CourseView`, y `HomeView`.
  - **layouts**: Diseños generales como `MainLayout`.
- **src/domain**: Define las entidades y repositorios del dominio, como `Academia`, `Curso`, y `user`.
- **src/infrastructure**: Contiene la lógica relacionada con la base de datos y procedimientos almacenados.
- **src/shared**: Utilidades compartidas como funciones auxiliares.

## Funcionalidades principales

1. **Landing Page**: Página de inicio con secciones como noticias, academias destacadas y caminos de aprendizaje.
2. **Autenticación**: Páginas de inicio de sesión, registro y recuperación de contraseña.
3. **Gestión de cursos**: Vistas para explorar cursos, inscribirse y realizar exámenes.
4. **Interfaz dinámica**: Uso de Tailwind CSS para un diseño responsivo y moderno.

## Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jose230203/Hackathon.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd hackathon
   ```

3. Instala las dependencias:
   ```bash
   pnpm install
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Commits Convencionales

Para mantener un historial de cambios claro y organizado, este proyecto utiliza **commits convencionales**. A continuación, se describe cómo estructurar tus mensajes de commit:

### Formato del mensaje de commit

Cada mensaje de commit debe seguir el siguiente formato:

```
<tipo>(<área>): <descripción breve>

[Descripción opcional más detallada]

[Referencias opcionales a issues o tickets]
```

### Tipos de commit

- **feat**: Se utiliza para la adición de una nueva funcionalidad.
- **fix**: Se utiliza para corregir errores.
- **docs**: Cambios en la documentación, como el README.
- **style**: Cambios que no afectan la lógica del código (formato, espacios, comas, etc.).
- **refactor**: Cambios en el código que no corrigen errores ni añaden funcionalidades.
- **test**: Adición o modificación de pruebas.
- **chore**: Cambios en tareas de construcción o herramientas auxiliares.
# Plataforma Educativa – Frontend (Next.js)

Aplicación web con Next.js y TypeScript que ofrece una experiencia de aprendizaje moderna: academias, cursos, sesiones con contenido generado en tiempo real (SSE), desafíos CTF, terminal integrada y certificados digitales.

## 🧱 Arquitectura

Frontend basado en una arquitectura por capas, separando responsabilidades y facilitando la escalabilidad:

```
📦 Proyecto Frontend (Next.js)
├── public/                      # Activos estáticos (imágenes/svg)
├── src/
│   ├── app/                     # Rutas y layouts (App Router)
│   ├── domain/                  # Entidades y tipos del dominio
│   ├── infrastructure/          # Servicios/API y adaptadores
│   ├── presentation/            # Componentes y vistas (UI)
│   └── shared/                  # Utilidades compartidas (axios, helpers)
├── package.json                 # Scripts y dependencias
├── next.config.ts               # Configuración de Next.js
├── tsconfig.json                # Configuración de TypeScript
└── .env                         # Variables de entorno (local)
```

Descripción de capas:
- app: Define rutas, layouts y metadatos (Next App Router).
- presentation: Componentes y vistas de UI; hooks de estado de interfaz.
- domain: Modelos de negocio (Academia, Curso, Sesión, Usuario, Progreso…).
- infrastructure: Llamadas a API y mapeos a entidades del dominio.
- shared: Axios configurado, helpers (p. ej. tailwind-merge + clsx).

## 🚀 Tecnologías

- Framework: Next.js 15 (App Router, Turbopack)
- UI: React 19 + Tailwind CSS 4
- Lenguaje: TypeScript 5
- HTTP: Axios
- Markdown: react-markdown + remark-gfm

## ✨ Funcionalidades

- Landing con secciones de presentación y CTA
- Autenticación (login, registro, recuperar contraseña) con token Bearer
- Home personalizada: progreso, academias y cursos recientes
- Academias: listado, detalle y cursos por academia
- Cursos: detalle, listado de clases/sesiones y navegación
- Sesiones: contenido dinámico vía SSE/stream con render Markdown
- CTF: grid de desafíos, detalle con VM start/stop y envío de flags
- Terminal: iframe configurable para exámenes/retos prácticos
- Certificados: generación de PDF y enlace de descarga

## 📂 Estructura destacada

- `src/app`:
   - `/` (Landing)
   - `/Onboarding/*` (login/register/forgot)
   - `/home` (panel autenticado)
   - `/Academy/*` (home de academia y detalle por id)
   - `/curso/[id]` y `/curso/[id]/sesion/[sesionId]`
   - `/ctf` y `/ctf/[id]`
   - `/terminal`

- `src/infrastructure/api`:
   - `authService.ts`, `academyService.ts`, `ctfService.ts`, `assistantService.ts`, `consoleService.ts`, `userProgressService.ts`, `certificateService.ts`

- `src/domain/entities`:
   - `Academia.ts`, `Curso.ts`, `SesionCurso.ts`, `user.ts`, `UsuarioProgreso.ts`, etc.

## 🔧 Configuración y ejecución

Prerrequisitos:
- Node.js 18+
- pnpm

Instalación:

```powershell
pnpm install
```

Variables de entorno (frontend):

| Variable | Descripción |
|---------|-------------|
| NEXT_PUBLIC_API_URL | Base URL del backend (ej: https://tu-backend.com/api) |
| NEXT_PUBLIC_TERMINAL_URL | URL del terminal embebido (iframe) |

Ejemplo `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_TERMINAL_URL=http://localhost:3002
```

Desarrollo:

```Git Bash
pnpm dev
```

Build de producción:

```Git Bash
pnpm run build
pnpm start
```

La app quedará disponible en http://localhost:3000

## 🔑 Autenticación

- Token Bearer persistido en localStorage o sessionStorage según “Recuérdame”.
- Interceptor Axios añade `Authorization: Bearer <token>` en cada request.

## 🌐 Endpoints backend consumidos

Academia:
- GET `/Academia/getListCursosVistosRecientes`
- GET `/Academia/getListAcademy`
- GET `/Academia/getListLastCursos`
- GET `/Academia/getAcademyByAcademiaId/{academiaId}`
- GET `/Academia/getListCursoByAcademiaId/{academiaId}`
- GET `/Academia/getProgresoByAcademiaId/{academiaId}`
- GET `/Academia/getCursoByCursoId/{cursoId}`
- GET `/Academia/getListSesionCursoByCursoId/{cursoId}`
- GET `/Academia/getProgresoByCursoId/{cursoId}`
- POST `/Academia/postSaveProgresoBySesionCursoId/{sesionCursoId}/{avance}`
- POST `/Academia/generateCertificate/{cursoId}`

Asistente (SSE):
- POST `/Asistente/MessageGeneral`
- POST `/Asistente/MessageAcademia`
- POST `/Asistente/MessageCurso`
- POST `/Asistente/MessageSesion`
- POST `/Asistente/GenerateContentSesionBySesionId`

Usuario / Auth:
- POST `/usuario/create`
- POST `/usuario/login`
- POST `/usuario/delete`
- GET `/usuario/profile`

UsuarioProgreso:
- GET `/UsuarioProgreso/getUsuarioProrgeso`
- POST `/UsuarioProgreso/postRegistroUsuarioProgresoDay`
- GET `/UsuarioProgreso/getListUsuarioProgresoTopFive`

Consola / SSH:
- POST `/Consola/ExecCommand`

CTF:
- GET `/ctf/challenges`
- GET `/ctf/challenges/{id}`
- POST `/ctf/challenges/{id}/vm/start`
- POST `/ctf/challenges/{id}/vm/stop`
- POST `/ctf/challenges/{id}/flags`

Notas de error:
- 400: Validación / negocio → `{ "error": "Mensaje" }`
- 401: No autorizado → `{ "error": "Token inválido" }`
- 404: Recurso no encontrado
- 500: Error interno del servidor

## 🧪 Calidad y estilo

- Lint: ESLint 9 (flat config) con `next/core-web-vitals`
- Estilos: Tailwind CSS 4 + `tailwind-merge` + `clsx`

## 🛠️ Scripts útiles

```powershell
pnpm dev      # Desarrollo con Turbopack
pnpm run build    # Compilación de producción
pnpm start    # Arranque en producción
pnpm lint     # Linter
```

## 📦 Despliegue

- Despliegue recomendado en Vercel para frontend Next.js.
- Configura `NEXT_PUBLIC_API_URL` hacia tu backend desplegado.
