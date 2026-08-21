export type Color = {
  slug: string;
  nombre: string;
  hex: string;
  /** Borde visible para colores muy claros sobre fondo crema */
  claro?: boolean;
};

export type Producto = {
  slug: string;
  nombre: string;
  precio: number;
  descripcion: string;
  /** Imagen por color, cuando existe recorte de esa referencia */
  imagenes: Record<string, string>;
  imagenPorDefecto: string;
  colores: string[];
};

/** Los 7 colores de la carta de la colección. */
export const COLORES: Color[] = [
  { slug: "negro", nombre: "Negro", hex: "#181818" },
  { slug: "vinotinto", nombre: "Vinotinto", hex: "#7d1730" },
  { slug: "verde-botella", nombre: "Verde botella", hex: "#1d5c48" },
  { slug: "azul-aguamarina", nombre: "Azul aguamarina", hex: "#77c2d1" },
  { slug: "blanco", nombre: "Blanco", hex: "#ffffff", claro: true },
  { slug: "cafe", nombre: "Café", hex: "#6b4326" },
  { slug: "amarillo-mostaza", nombre: "Amarillo mostaza", hex: "#e9a825" },
];

export const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export const GENEROS = ["Hombre", "Mujer"] as const;

const TODOS = COLORES.map((c) => c.slug);

export const PRODUCTOS: Producto[] = [
  {
    slug: "hoodie",
    nombre: "Hoodie",
    precio: 120000,
    descripcion:
      "Capota, bolsillo canguro y puños tejidos. El logo va enmarcado al frente, en bloque.",
    imagenes: {
      negro: "/prendas/hoodie-negro.jpg",
      vinotinto: "/prendas/hoodie-vinotinto.jpg",
      "verde-botella": "/prendas/hoodie-verde.jpg",
    },
    imagenPorDefecto: "/prendas/hoodie-negro.jpg",
    colores: TODOS,
  },
  {
    slug: "buso",
    nombre: "Buso cuello redondo",
    precio: 100000,
    descripcion:
      "Buso clásico de cuello redondo, sin capota. Tejido con caída y puños elásticos.",
    imagenes: {
      "azul-aguamarina": "/prendas/buso-azul.jpg",
      cafe: "/prendas/buso-cafe.jpg",
    },
    imagenPorDefecto: "/prendas/buso-azul.jpg",
    colores: TODOS,
  },
  {
    slug: "camiseta",
    nombre: "Camiseta cuello redondo",
    precio: 50000,
    descripcion:
      "Camiseta de algodón, cuello redondo, corte recto. La pieza de todos los días.",
    imagenes: {
      blanco: "/prendas/camiseta-blanca.jpg",
      "amarillo-mostaza": "/prendas/camiseta-mostaza.jpg",
    },
    imagenPorDefecto: "/prendas/camiseta-blanca.jpg",
    colores: TODOS,
  },
];

export const WHATSAPP = "573105330111";
export const WHATSAPP_VISIBLE = "310 533 0111";

export function precioCOP(valor: number) {
  return "$" + valor.toLocaleString("es-CO");
}
