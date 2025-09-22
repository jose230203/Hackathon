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

### Ejemplo de un buen commit

```
feat(Login): añadir validación de correo electrónico

Se añadió una validación para asegurar que los correos electrónicos ingresados tengan un formato válido. Esto mejora la experiencia del usuario al evitar errores comunes.

Closes #45
```

### Recomendaciones

- Escribe mensajes claros y concisos.
- Usa el idioma del proyecto (en este caso, español).
- Relaciona los commits con issues o tickets cuando sea posible.

## Despliegue

El proyecto puede ser desplegado fácilmente en [Vercel](https://vercel.com/), la plataforma recomendada para aplicaciones Next.js.

## Créditos

Desarrollado por **jose230203** y colaboradores. ¡Gracias por tu interés en este proyecto!
