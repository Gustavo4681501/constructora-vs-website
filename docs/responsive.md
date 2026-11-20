# Responsive: cómo se adapta el sitio

Todo está en `sitio/assets/css/estilos.css`. No hay JavaScript de por medio, salvo el
botón "Menú", que abre y cierra el menú plegado.

## Cortes de ancho

| Ancho de pantalla | Qué cambia |
|---|---|
| menos de 400 px | La marca de la cabecera se achica (letra, logo y separación) para caber junto a "Menú" |
| menos de 480 px | Los botones de `.acciones` van a todo el ancho, uno por renglón |
| menos de 900 px | Barra fija abajo con WhatsApp y Llamar (`.barra-movil`) |
| menos de 1180 px | El menú se pliega tras el botón "Menú" |
| desde 960 px | Portada y encabezados interiores en dos columnas (texto y foto) |
| desde 1180 px | Menú en fila dentro de la cabecera |
| alto menor de 480 px, acostado | La cabecera deja de quedarse pegada arriba |

El menú en fila necesita unos 1180 px. Si se agrega un enlace o se alarga un texto del
menú, hay que subir ese corte (`max-width: 1179.98px`) hasta donde vuelva a caber en un
solo renglón. Si se deja corto, el menú se parte en dos renglones y aprieta la marca.

## Títulos medidos contra su columna

El tamaño de los títulos grandes no depende solo del ancho de la pantalla, sino del
ancho de la columna donde están (unidad `cqi`, con `container-type: inline-size` en el
contenedor). Hace falta porque desde 960 px el texto va en una columna angosta, y un
título calculado contra la pantalla no cabe: se salía y quedaba cortado.

| Título | Contenedor | Tope |
|---|---|---|
| `h1` de la portada | `.portada__texto` | `12.2cqi` |
| `h1` de páginas interiores | `.encabezado__rejilla > div` | `9.6cqi` |
| Nombre de la tarjeta (`.tarjeta__nombre`) | `.tarjeta__datos` | `6.6cqi` |

Los topes de los `h1` salen de la palabra más larga del título con la letra Archivo
ensanchada: "Constructora" mide 7,6 veces el tamaño de letra y "Remodelaciones", 9,7.
El tope deja esa palabra en un 93 % de la columna. Si un título nuevo trae una palabra
más larga (más de 14 letras), hay que bajar el tope de ese título. El tope de la tarjeta
está calculado para que "CONSTRUCTORA VS" quepa en un solo renglón, como en la tarjeta
de presentación.

Para navegadores sin `cqi` (anteriores a 2023) hay tamaños de respaldo por ancho de
pantalla en el bloque `@supports not (width: 1cqi)`.

Como último recurso, `overflow-wrap: break-word` en `body` hace que una palabra que no
cabe se parta en lugar de salirse de la pantalla.

## Cómo probar

Abrir `sitio/index.html` y, en las herramientas del navegador (F12, vista de
dispositivo), revisar estos anchos: 320, 360, 390, 768, 980, 1100, 1180 y 1280 px.

- 980 px es el ancho con que los teléfonos muestran el "sitio de escritorio".
- En cada ancho: no debe haber desplazamiento horizontal, ningún título cortado y la
  cabecera debe ocupar un solo renglón.
- Revisar también con el menú abierto y la tarjeta de contacto al final de la página.
