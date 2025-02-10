import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { data } from "react-router";

export function loader({request,params,context}: Route.LoaderArgs){
  console.log("hola", params.id)
  return data({})
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}

