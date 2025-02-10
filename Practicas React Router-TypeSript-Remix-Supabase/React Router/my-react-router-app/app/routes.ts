// import { type RouteConfig, index } from "@react-router/dev/routes";

/*
Importamos el type de RouteConfig, route desde @react-route/dev/routes
*/
import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes"

//export default [index("routes/home.tsx")] satisfies RouteConfig;
/*
export default [
    route("home", "./routes/home.tsx"),
    // pattern ^           ^ module file
  ] satisfies RouteConfig;
*/
  export async function loader() {
    return { message: "Hello, world!"};
  }

  export default function MyRoute({ loaderData }) {
    return <h1><{loaderData.message}</h1>
  }