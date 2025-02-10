# REACT ROUTER

La mayoría de los proyectos comienzan con una plantilla. Usaremos una plantilla básica mantenida por React Router:

```bash
npx create-react-router@latest my-react-router-app
```

Ahora cambiamos al nuevo directorio e iniciamos la aplicación:

```bash
cd my-react-router-app
npm i
npm run dev
```

Ahora podemos abrir el navegador en la siguiente url: `http://localhost:5173`

Debe aparecer una página como esta:
![alt text](image.png)


# Enrutamiento

## Configuración de rutas

Cada ruta tiene dos partes necesarias

- Un patrón de URL que coincida con la URL.
- Una ruta de archivo al módulo de ruta que define su comportamiento.

Todo esto se hace en el archivo `app/routes.ts`

> app/routes.ts
```bash
import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("some/path", "./some/file.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig;
```

>  [!NOTE]
> Como yo lo tengo escrito:
> 
>
>```bash
>/*
>Importamos el type de RouteConfig, route desde @react-route/dev/routes
>*/
>import {
>    type RouteConfig,
>    route,
>} from "@react-router/dev/routes"
>
>//export default [index("routes/home.tsx")] satisfies RouteConfig;
>
>export default [
>    route("home", "./routes/home.tsx"),
>    // pattern ^           ^ module file
>  ] satisfies RouteConfig;
>```
> 
> Ejemplo de la página web de ReactRouter
> Ejemplo más grande de configuración de rutas:
> 
> ```bash
> import {
>   type RouteConfig,
>   route,
>   index,
>   layout,
>   prefix,
> } from "@react-router/dev/routes";
> 
> export default [
>   index("./home.tsx"),
>   route("about", "./about.tsx"),
> 
>   layout("./auth/layout.tsx", [
>     route("login", "./auth/login.tsx"),
>     route("register", "./auth/register.tsx"),
>   ]),
> 
>   ...prefix("concerts", [
>     index("./concerts/home.tsx"),
>     route(":city", "./concerts/city.tsx"),
>     route("trending", "./concerts/trending.tsx"),
>   ]),
> ] satisfies RouteConfig;
> ```


## Módulos de ruta:

Los archivos a los que hace referencia definen el comportamiento de cada ruta: `routes.ts`

```bash
route("teams/:teamId", "./team.tsx"),
//           route module ^^^^^^^^
```
Los módulos de ruta son la base de las características del marco de React Router, definen:

- División automática de códigos.
- Carga de datos.
- Acciones.
- Revalidación.
- Límites de error.
- y más.

### Componente (default)

La exportación en un módulo de ruta define el componente que se renderizará cuando la ruta coincida. 'default'

app/routes/my-route.tsx

```bash
export default function MyRouteComponent() {
  return (
    <div>
      <h1>Look ma!</h1>
      <p>
        I'm still using React Router after like 10 years.
      </p>
    </div>
  );
}
```
#### Props pasados al componente

Cuando se renderiza el componente, se proporcionan las propiedades definidas en que React Router generará automáticamente para usted. Estos accesorios incluyen: `Route.ComponentProps`

1. `loaderData`: Los datos devueltos por la función en en este módulo de ruta `loader`
2. `actionData`: Los datos devueltos por la función en este módulo de ruta `action`
3. `params`: Un objeto que contiene los parámetros de ruta (si los hay).
4. `matches`: Una matriz de todas las coincidencias en el arbol de ruta actual.

Puede usar accesorios en lugar de ganchos. Esto puede ser preferible porque se 
escribirán automáticamente correctamente para la ruta. `useLoaderData` `useparams`.


### Uso de accesorios

`app/routes/my-route-with-default-params.tsx`
```bash
import type { Route } from "./+types/route-name";

export default function MyRouteComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Welcome to My Route with Props!</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>
    </div>
  );
}
```

`loader`

Los cargadores de rutas proporcionan datos a los componentes de ruta antes de que se representen. Solo se llaman en el servidor cuando se renderiza el servidor o durante la compilación con pre-renderizado.



A continuación, se muestra un módulo de ruta de ejemplo:
```bash
// provides type safety/inference
import type { Route } from "./+types/team";

// provides `loaderData` to the component
export async function loader({ params }: Route.LoaderArgs) {
  let team = await fetchTeam(params.teamId);
  return { name: team.name };
}

// renders after the loader is done
export default function Component({
  loaderData,
}: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

## Rutas Anidadas

