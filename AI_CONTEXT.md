# Contexto del Proyecto DG Capital Ex para Agentes de IA

Este documento describe la estructura técnica, decisiones de arquitectura y patrones utilizados en este proyecto. Úsalo para entender cómo navegar y modificar el código de manera eficiente.

## 🛠 Tech Stack Principal

-   **Framework:** React 18+ (con Hooks).
-   **Build Tool:** Vite.
-   **Lenguaje:** TypeScript (`.tsx`, `.ts`).
-   **Estilos:** **Tailwind CSS vía CDN** (Runtime).
    -   ⚠️ **Importante:** No existe un archivo `tailwind.config.js` en la raíz. La configuración de Tailwind está inyectada directamente en el `<head>` de `index.html`.
    -   Las clases personalizadas (`bg-geometric`, `vibrant-glow`) están definidas en el bloque `<style type="text/tailwindcss">` en `index.html`.
-   **Autenticación:** Supabase (`@supabase/supabase-js`).
-   **Iconos:** Material Symbols Outlined (Google Fonts).
-   **Fuentes:** Inter (Google Fonts).

## 📂 Estructura de Archivos Clave

-   **`index.html`**: Punto de entrada crítico. Contiene:
    -   Script de carga de Tailwind CDN.
    -   Configuración del tema de Tailwind (`tailwind.config`).
    -   Estilos globales y utilidades personalizadas (`@layer utilities`).
    -   Importación de fuentes e iconos.
-   **`App.tsx`**: Componente raíz y **Router Manual**.
    -   Maneja el estado global de navegación (`currentPage`).
    -   Maneja el estado del tema (`isDarkMode`) y lo pasa a los componentes hijos (`Dashboard`, `Navbar`).
    -   Maneja la sesión de Supabase (`onAuthStateChange`).
-   **`components/`**:
    -   **`Dashboard.tsx`**: Panel principal logueado. Recibe `isDarkMode` y `toggleTheme` como props.
    -   **`Navbar.tsx`**: Barra de navegación sensible al contexto (acepta `isDarkMode` para cambiar color de texto/fondo).
    -   **`AuthSection.tsx`**: Manejo de Login/Signup con Supabase.
    -   Secciones Landing: `Hero.tsx`, `Features.tsx`, `InvestmentSection.tsx`, etc.
-   **`src/lib/supabase.ts`**: Inicialización del cliente de Supabase.

## 🧠 Patrones de Arquitectura

### 1. Navegación (State-Based Routing)
No se utiliza `react-router-dom`. La navegación se maneja mediante un estado simple en `App.tsx`:
```typescript
const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | ...>('home');
```
Para navegar, se pasa la función `setCurrentPage` (a menudo llamada `onNavigate` en los props) a los componentes hijos.

### 2. Gestión de Tema (Dark/Light Mode)
-   El estado `isDarkMode` reside en `App.tsx`.
-   Se pasa como prop a `Navbar` y `Dashboard`.
-   `light` mode usa fondos como `bg-stone-100`.
-   `dark` mode usa `bg-background-dark` (definido en `index.html` como `#000000`).

### 3. Autenticación
-   Se verifica la sesión al montar `App.tsx`.
-   Si hay sesión, se redirige automáticamente a `dashboard`.
-   Al cerrar sesión, se redirige a `home`.

### 4. Estilos y Tailwind
-   Colores personalizados definidos en `index.html`:
    -   `primary`: `#0ae88c` (Verde eléctrico)
    -   `secondary`: `#0ca7d5` (Azul pastel)
-   No intentes instalar plugins de Tailwind vía npm/postcss, ya que se ejecuta en el navegador vía script.

## ⚠️ Gotchas / Trampas Comunes
1.  **No busques `tailwind.config.js`**: Revisa `index.html`.
2.  **No busques `<Routes>`**: Mira el `switch/case` o condicionales en el `return` de `App.tsx`.
3.  **Variables de Entorno**: Usan `import.meta.env.VITE_...` (estándar de Vite).
