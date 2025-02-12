import { Form, Link, NavLink, Outlet, useNavigation, useSubmit } from "react-router"; // Corrección en la importación
import { getContacts } from "../data";
import type { Route } from "./+types/sidebar";
import { useEffect, /*useState*/ } from "react";

export async function loader({request,}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function SidebarLayout({
  loaderData,
}: Route.ComponentProps) {
  const { contacts, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = 
  navigation.location && 
  new URLSearchParams(navigation.location.search).has("q");

  /*
  // la consulta ahora debe mantenerse en estado
  const [query, setQuery] = useState(q || "");

  // todavía tenemos un `useEffect` para sincronizar la consulta
// con el estado del componente al hacer clic en los botones de avance/retroceso
  useEffect(() => {
    setQuery(q || "");
  }, [q]);
  */

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);


  return (
    <>
      <div id="sidebar">
        <h1>
          <Link prefetch="intent" to="about">React Router Contacts</Link>
        </h1>

        <div>
        <Form
            id="search-form"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
            role="search">
            <input
              aria-label="Search contacts"
              className={
                navigation.state === "loading" && !searching
                  ? "loading"
                  : ""
              }
              defaultValue={q || ""}
              id="q"
              name="q"
              /*
              // sincronizar la entrada del usuario con el estado del componente
              onChange={(event) =>
                setQuery(event.currentTarget.value)
              }
              placeholder="Search"
              type="search"
              // cambiado a `value` desde `defaultValue`
              value={query}
               */
              placeholder="Search"
              type="search"
            />
            <div aria-hidden="true" hidden={!searching} id="search-spinner" />
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        <nav>
          {contacts?.length ? ( // Validamos que `contacts` no sea undefined
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`contacts/${contact.id}`}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite ? <span>★</span> : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      {/* Integración del fragmento adicional con corrección en useNavigation() */}
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
