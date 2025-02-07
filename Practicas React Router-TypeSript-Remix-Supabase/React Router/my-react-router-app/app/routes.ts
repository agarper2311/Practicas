// import { type RouteConfig, index } from "@react-router/dev/routes";

/*
Importamos el type de RouteConfig, route desde @react-route/dev/routes
*/
import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes"

//export default [index("routes/home.tsx")] satisfies RouteConfig;

export default [
    route("home", "./routes/home.tsx"),
    // pattern ^           ^ module file
  ] satisfies RouteConfig;