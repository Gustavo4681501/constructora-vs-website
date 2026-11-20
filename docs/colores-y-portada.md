# Colores y animación de la portada

Todo el color sale de las variables en `sitio/assets/css/estilos.css` (sección 2).
La línea del sitio no cambia: negro y dorado del logo y la tarjeta, letra Archivo,
regla con rombo, esquinas doradas y el techo de la portada.

## Paleta

| Variable | Valor | Dónde se usa |
|---|---|---|
| `--negro` | `#101113` | Fondo general (el negro del logo) |
| `--oro` | `#D0A35A` | Textos destacados, líneas, enlaces |
| `--oro-metal` | degradado `#F0D08E → #D6A95E → #B9873F` | Botones dorados, barra de WhatsApp en móvil, números de los pasos |
| `--pacifico` | `#0C3A3F` | Paneles (`.seccion--panel`), avisos (`.nota`), cielo de portada y encabezados |
| `--pacifico-hondo` | `#082A2E` | Pie de página |
| `--linea-pacifico` | `#1F5157` | Líneas sobre el verde azulado (se cambia sola dentro de paneles y pie) |
| `--piscina` | `#46C8BE` | Detalles: línea de las etapas, borde de los avisos |
| `--cielo` | degradado de `--pacifico` a `--negro` | Fondo de `.portada` y `.encabezado` |

Reglas de uso:
- El dorado sigue siendo el color de la marca y de las acciones (botones, enlaces).
- El verde azulado (agua de piscina, Pacífico) se usa en fondos, nunca en botones.
- El turquesa `--piscina` solo va en detalles pequeños.
- El resplandor naranja de la portada es lo único cálido fuera del dorado.

## Franja dorada (`.seccion--oro`)

Es la tarjeta al revés: fondo dorado y texto negro. En el inicio se usa en
"Trabajamos en toda Guanacaste", donde las zonas son placas negras con letra dorada.
Se puede usar en otra sección agregando la clase `seccion--oro` a la `<section>`.

## Animación de la portada (solo `index.html`)

Es un solo gesto al cargar la página:
1. Se traza el techo dorado de izquierda a derecha (`trazar-techo`, 1,1 s).
2. Detrás del techo suben, uno tras otro, los tres edificios del logo (`subir-edificio`).

Los edificios son los mismos trazos de `logo/svg/constructora-vs-isotipo.svg`
(`edificio-1`, `edificio-2`, `edificio-3`), dentro del SVG `.casa__techo`:
- Un `transform` los lleva del tamaño del logo al techo de la portada (escala 0,7).
- El `clipPath` `#sobre-techo` corta todo lo que queda por debajo del techo, así parece
  que salen de detrás.
- La base de cada edificio está alargada 12 unidades para que no quede hueco bajo el techo.

Si la persona tiene activado "reducir movimiento", no hay animación y los edificios
aparecen ya en su lugar.

## Ver el sitio en la computadora

Los enlaces internos van sin `.html`, como los sirve Cloudflare Pages. `sitio/assets/js/sitio.js`
les agrega la extensión cuando el sitio se abre:
- con doble clic (`file://`), o
- con un servidor local: `localhost`, `127.0.0.1`, `*.localhost` o una IP de la red de la casa
  (`192.168.x.x`, `10.x.x.x`), por ejemplo Live Server de VS Code abierto desde el celular.

En el dominio real no se toca nada.
