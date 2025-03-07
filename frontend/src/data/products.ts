export type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  descuento: number;
  imagen: string;
  stock: number;
  rating: number;
  arrivalDate: string;
};

export const products: Product[] = [
  {
    id: 1,
    nombre: "Camiseta Deportiva",
    descripcion:
      "Camiseta transpirable para actividades deportivas, confeccionada en material 100% algodón.",
    precio: 19.99,
    categoria: "Ropa",
    descuento: 0.1,
    imagen:
      "https://assets-es.imgfoot.com/media/cache/800x800/fc-barcelone-home-2013-2014.jpg",
    stock: 0,
    rating: 4.2,
    arrivalDate: "13 de Marzo",
  },
  {
    id: 2,
    nombre: "Auriculares Inalámbricos",
    descripcion:
      "Auriculares con cancelación de ruido y batería de larga duración.",
    precio: 59.99,
    categoria: "Electrónica",
    descuento: 0.15,
    imagen:
      "https://images.bidcom.com.ar/resize?src=https://static.bidcom.com.ar/publicacionesML/productos/ABLUE164/1000x1000-ABLUE164.jpg&h=400&q=100",
    stock: 30,
    rating: 4.7,
    arrivalDate: "15 de Marzo",
  },
  {
    id: 3,
    nombre: "Smartwatch Deportivo",
    descripcion:
      "Reloj inteligente con monitor de frecuencia cardiaca y seguimiento de actividad.",
    precio: 129.99,
    categoria: "Tecnología",
    descuento: 0.2,
    imagen:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-smartwatch/p/b/6/1-44-android-ios-t500-smart-watch-with-bluetooth-calling-black-original-imagvy24hyyqbzvm.jpeg?q=90&crop=false",
    stock: 20,
    rating: 4.5,
    arrivalDate: "17 de Marzo",
  },
  {
    id: 4,
    nombre: "Mochila Escolar",
    descripcion:
      "Mochila resistente y espaciosa, ideal para el colegio o la universidad.",
    precio: 39.99,
    categoria: "Accesorios",
    descuento: 0,
    imagen:
      "https://images.tcdn.com.br/img/img_prod/700556/mochila_escolar_juvenil_8732253_4383_1_5672ae484f4ecb5d63b1c9ceffda2eeb.jpg",
    stock: 40,
    rating: 4.0,
    arrivalDate: "20 de Marzo",
  },
  {
    id: 5,
    nombre: "Zapatos de Running",
    descripcion:
      "Calzado cómodo y ligero diseñado para running y entrenamientos intensos.",
    precio: 89.99,
    categoria: "Calzado",
    descuento: 0,
    imagen:
      "https://nivia.com.co/cdn/shop/files/Tenis_Ultra_Running_Azul_Nivia_Xbox_5.jpg?v=1697839355&width=1445",
    stock: 25,
    rating: 4.3,
    arrivalDate: "10 de Marzo",
  },
  {
    id: 6,
    nombre: "Cámara Deportiva",
    descripcion:
      "Cámara resistente al agua con grabación en 4K y estabilizador de imagen.",
    precio: 199.99,
    categoria: "Tecnología",
    descuento: 0,
    imagen: "https://sistema.langtecnologia.com.ar/img/qloud/3241/5684_1.jpg",
    stock: 15,
    rating: 4.8,
    arrivalDate: "12 de Marzo",
  },
  {
    id: 7,
    nombre: "Bicicleta de Montaña",
    descripcion:
      "Bicicleta todoterreno con cuadro de aluminio y frenos de disco hidráulicos.",
    precio: 499.99,
    categoria: "Deportes",
    descuento: 0.25,
    imagen: "https://irunabikes.com/wp-content/uploads/foto-1.jpg",
    stock: 10,
    rating: 4.9,
    arrivalDate: "8 de Marzo",
  },
  {
    id: 8,
    nombre: "Balón de Fútbol",
    descripcion:
      "Balón oficial de la FIFA para partidos de fútbol profesionales.",
    precio: 29.99,
    categoria: "Deportes",
    descuento: 0,
    imagen: "https://assets1.afa.com.ar/argen.jpg",
    stock: 35,
    rating: 4.6,
    arrivalDate: "5 de Marzo",
  },
  {
    id: 9,
    nombre: "Gafas de Sol",
    descripcion:
      "Gafas de sol polarizadas con protección UV y montura de aluminio.",
    precio: 79.99,
    categoria: "Accesorios",
    descuento: 0,
    imagen: "https://opticaval.es/wp-content/uploads/2023/03/190605407424.jpg",
    stock: 45,
    rating: 4.4,
    arrivalDate: "3 de Abril",
  },
  {
    id: 10,
    nombre: "Mancuernas Ajustables",
    descripcion:
      "Set de mancuernas ajustables con discos de peso para entrenamientos en casa o el gimnasio.",
    precio: 149.99,
    categoria: "Deportes",
    descuento: 0,
    imagen:
      "https://i5.walmartimages.cl/asr/8d2d0da6-5c52-4bd9-a674-870e7a7274cc.cbae6e1ec761152a529397fea3da18d5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff",
    stock: 5,
    rating: 4.1,
    arrivalDate: "25 de Marzo",
  },
];
