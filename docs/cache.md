# Caché: por qué un cambio puede no verse al publicar

El sitio pasa por dos cachés: la de Cloudflare (delante del dominio `constructoravs.com`)
y la del navegador de cada visitante. Qué se guarda y por cuánto lo define `sitio/_headers`.

| Archivos | Caché | Qué significa |
|---|---|---|
| Páginas HTML | no se guardan (valor por defecto de Cloudflare Pages) | Siempre llega la última versión |
| `assets/css/*`, `assets/js/*` | `max-age=0, must-revalidate` | Se pregunta siempre si hay versión nueva; si no cambió, no se descarga de nuevo |
| `assets/img/*`, `assets/video/*` | 30 días | Una foto cambiada con el mismo nombre tarda en verse |
| `assets/fuentes/*` | 1 año | La fuente no cambia |

## Lo que pasó en noviembre de 2026

El CSS y el JS tenían caché de un día. Al publicar los colores nuevos y el responsive,
`constructoravs.pages.dev` mostraba el sitio nuevo, pero `constructoravs.com` siguió
entregando el CSS anterior desde la caché de Cloudflare. El HTML sí era el nuevo, así que
el sitio se veía con la estructura nueva y los estilos viejos.

Se arregló de dos maneras:
- `_headers`: el CSS y el JS ya no se guardan un día.
- Las páginas enlazan `estilos.css?v=2` y `sitio.js?v=2`. El `?v=2` hace que Cloudflare y
  los navegadores lo traten como un archivo distinto y no usen la copia vieja.

## Si vuelve a pasar

- Con el CSS o el JS: subir el número en las 8 páginas (`?v=3`). Con la caché actual no
  debería hacer falta.
- Con una foto o un video: guardarlo con otro nombre, o purgar la caché en el panel de
  Cloudflare: dominio > Caching > Configuration > Purge Everything.
- Para comprobar qué está publicado sin caché de por medio: abrir
  `https://constructoravs.pages.dev`.
