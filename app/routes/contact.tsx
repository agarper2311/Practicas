// Importamos el componente Form de react-router para manejar formularios
import { Form, useFetcher } from "react-router";

// Importamos el tipo ContactRecord desde el archivo de datos
import type { ContactRecord } from "../data";

import { getContact, updateContact } from "../data";
import type { Route } from "../+types/contact";

export async function loader({ params }: Route.LoaderArgs){
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", {status: 404});
  }
  return{ contact };
}

export async function action({
  params,
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// Definimos el componente Favorite para marcar un contacto como favorito o quitarlo de favoritos
function Favorite({
  contact,
}: {
  contact: Pick<ContactRecord, "favorite">; // Usamos Pick para extraer solo la propiedad "favorite" de ContactRecord
}) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
  ? fetcher.formData.get("favorite") === "true"
  : contact.favorite; // Obtenemos si el contacto es favorito o no

  return (
    <Form method="post"> {/* Formulario para cambiar el estado de favorito */}
      <fetcher.Form method="post">
      <button
        aria-label={ // Etiqueta accesible para usuarios con lectores de pantalla
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite" // Nombre del campo enviado en el formulario
        value={favorite ? "false" : "true"} // Alternamos entre verdadero y falso
      >
        {favorite ? "★" : "☆"} {/* Mostramos una estrella llena si es favorito, vacía si no lo es */}
      </button>
      </fetcher.Form>
    </Form>
  );
}



// Definimos el componente Contact como el componente principal de la página de contacto
export default function Contact({
  loaderData
}: Route.ComponentProps){
  const { contact } = loaderData;


  // Renderizamos la estructura del contacto
  return (
    <div id="contact">
      {/* Sección donde se muestra la imagen del contacto */}
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`} // Descripción accesible para la imagen
          key={contact.avatar} // Se usa la URL del avatar como clave única
          src={contact.avatar} // Se carga la imagen del avatar desde la URL
        />
      </div>

      {/* Sección con la información del contacto */}
      <div>
        <h1>
          {/* Si el contacto tiene nombre o apellido, los mostramos, si no, mostramos "No Name" */}
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}
          {/* Renderizamos el componente Favorite para marcar como favorito */}
          <Favorite contact={contact} />
        </h1>

        {/* Si el contacto tiene un usuario de Twitter, mostramos un enlace a su perfil */}
        {contact.twitter ? (
          <p>
            <a
              href={`https://twitter.com/${contact.twitter}`} // Enlace dinámico al perfil de Twitter
            >
              {contact.twitter} {/* Nombre de usuario visible */}
            </a>
          </p>
        ) : null}

        {/* Si el contacto tiene notas, las mostramos */}
        {contact.notes ? <p>{contact.notes}</p> : null}

        {/* Sección con botones de edición y eliminación */}
        <div>
          {/* Formulario para editar el contacto */}
          <Form action="edit">
            <button type="submit">Edit</button> {/* Botón para editar el contacto */}
          </Form>

          {/* Formulario para eliminar el contacto */}
          <Form
            action="destroy" // Acción para eliminar el contacto
            method="post" // Método POST para enviar la solicitud
            onSubmit={(event) => {
              // Pedimos confirmación antes de eliminar el contacto
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault(); // Cancelamos la eliminación si el usuario no confirma
              }
            }}
          >
            <button type="submit">Delete</button> {/* Botón para eliminar el contacto */}
          </Form>
        </div>
      </div>
    </div>
  );
}

