# Aún Humanos — propuesta de rediseño

Sitio blanco, mínimo y editorial para **aunhumanos.com**, con cinco pestañas:
`Columnas · Editorial · Tienda · Somos · Contacto`.

Fuera quedaron Servicios, Triángulo Vital y Humanismo Digital. El centro del
sitio ya no es la oferta: es lo que el colectivo escribe.

## El motor

Nadie sube columnas a mano. `lib/fuentes.ts` tiene los canales de columnista
que publican los propios medios:

| Medio        | Firma                    | Canal                                            |
| ------------ | ------------------------ | ------------------------------------------------ |
| La República | Santiago Jiménez Londoño | `/analisis/santiago-jimenez-londono-4353436/rss` |
| Al Poniente  | Santiago Jiménez Londoño | `/author/sjimenezlon/feed/`                      |
| Al Poniente  | Felipe Jaramillo Vélez   | `/author/fejaramillo/feed/`                      |

Cada hora el sitio los relee (`revalidate = 3600`), normaliza título, bajada,
firma y fecha, y publica lo nuevo. Si un medio se cae, el sitio sigue mostrando
lo que ya tenía.

`data/columnas.ts` es el **archivo histórico**: los canales solo devuelven las
últimas columnas, así que ahí queda la memoria larga y lo que no tiene canal
propio (por ejemplo Ethic). Se fusiona con lo que llega de los canales sin
repetir: la misma URL nunca sale dos veces.

**Para sumar un medio nuevo** (El Colombiano, The New York Times…): agregar su
canal de columnista a `FUENTES`. Nada más.

## Estructura

```
app/           portada · /columnas · /editorial · /tienda · /somos · /contacto
components/    Nav, Footer, FilaColumna, ListaColumnas, Configurador, Reveal
data/          columnas.ts (archivo) · equipo.ts · libros.ts · tienda.ts
lib/           columnas.ts (el motor) · fuentes.ts · formato.ts · tipos.ts
public/        equipo/ · libros/ · prendas/
```

## Diseño

Papel blanco puro, tinta `#14110f`, una sola nota de color (terracota `#c4663a`,
heredada del sitio actual) que no pasa del 2% de la superficie. Titulares en
Instrument Serif, texto en DM Sans, micro-etiquetas en Geist Mono.

## Correr

```bash
npm run dev
npm run build
```

Va con `noindex`: es una propuesta, no debe competir con el sitio real.
