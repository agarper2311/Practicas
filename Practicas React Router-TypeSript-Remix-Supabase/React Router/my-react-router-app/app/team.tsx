// proporciona seguridad/inferencia de tipos
import type { Route } from "./+types/team";

// proporciona `loaderData` al componente
export async function loader({ params }: Route.LoaderArgs) {
    let team = await fetchTeam(params.teamId);
    return { name: team.name}
}

// se renderiza después de que finaliza el loader
export default function Component({
    loaderData,
}: Route.ComponentProps) {
    return <h1>{loaderData.name}</h1>;
}