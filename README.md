# Sitio web Constructora VS

Sitio estático (HTML, CSS y JavaScript, sin dependencias) listo para Cloudflare Pages.

## Carpetas
- `sitio/`: lo que se publica. 7 páginas + 404, fotos en WebP, 3 videos, fuente Archivo (licencia OFL, incluida).
- `logo/svg/`: logos editables en SVG (Illustrator, Inkscape, Figma, Canva). Cada pieza tiene nombre: `letra-v`, `letra-s`, `techo`, `ventana`, `edificio-1..3`, `nombre`.
  - Versiones: dorado (como la tarjeta), concreto (edificios grises, como el logo 3D), fondo claro, y una tinta en negro, blanco y dorado.
  - Formatos: isotipo, vertical (con CONSTRUCTORA) y horizontal (CONSTRUCTORA VS).
  - El texto está convertido a trazos, así que no hace falta instalar la fuente.
- `logo/png/`: exportes listos (fondo transparente y negro, foto de perfil 1080 px, imagen para compartir 1200x630).
- `logo/iconos/`: favicon e iconos de app.

## Publicar en Cloudflare Pages
1. Cloudflare > Workers & Pages > Create > Pages > **Upload assets** (subir la carpeta `sitio`).
   O conectar un repositorio de GitHub con `sitio` como carpeta de salida y sin comando de build.
2. Custom domains > agregar `constructoravs.com` y `www.constructoravs.com`.
3. Opcional: activar Web Analytics (gratis) y Email Routing para `info@constructoravs.com`.

Para ver el sitio en la computadora, abrir `sitio/index.html` con doble clic o con Live Server (los enlaces se ajustan solos en `file://`, `localhost` e IP de la red local).

Colores y animación de la portada: ver `docs/colores-y-portada.md`.
Cortes de ancho, títulos y cómo probar en teléfono: ver `docs/responsive.md`.

## Formulario
Por defecto abre WhatsApp (8666 1519) con el mensaje ya escrito. Para recibirlo también por correo:
crear una clave gratis en web3forms.com y pegarla en `contacto.html`, en `data-web3forms-key=""`. Aparece el botón "Enviar por correo".

## Pendiente de confirmar con el cliente
- Usuario de Facebook e Instagram: la tarjeta dice `vs_constructura_` (con "u"). Si es `vs_constructora_`, cambiarlo en todas las páginas.
- Zonas donde trabajan (Liberia, Santa Cruz, Nicoya, Carrillo, Tamarindo, Playas del Coco, Nosara) y servicios (piscinas, estructuras metálicas).
- Casas prefabricadas y bono de vivienda no están en el sitio porque no se sabe si los ofrecen.
- Crear el Perfil de Empresa en Google (prioridad para SEO local) y pedir reseñas.
