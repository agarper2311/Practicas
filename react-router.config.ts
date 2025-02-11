import type { Config } from "@react-router/dev/config";

export default {
  // Para habilitar el renderizado en el servidor
   ssr: true,
  // Para habilitar el renderizado en el cliente  
 //ssr: false,
  prerender: ["/about"],
} satisfies Config;
