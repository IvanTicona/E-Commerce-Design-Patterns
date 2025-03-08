export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  images: string[];
  stock: number;
  rating: number;
  arrivalDate: string;
};

export const products: Product[] = [
  {
    _id: "1",
    name: "Camiseta Deportiva",
    description:
      "Camiseta transpirable para actividades deportivas, confeccionada en material 100% algodón.",
    price: 19.99,
    category: "Ropa",
    discount: 0.1,
    images: [
      "https://assets-es.imgfoot.com/media/cache/800x800/fc-barcelone-home-2013-2014.jpg",
    ],
    stock: 0,
    rating: 4.2,
    arrivalDate: "13 de Marzo",
  },
  {
    _id: "2",
    name: "Auriculares Inalámbricos",
    description:
      "Auriculares con cancelación de ruido y batería de larga duración.",
    price: 59.99,
    category: "Electrónica",
    discount: 0.15,
    images: [
      "https://images.bidcom.com.ar/resize?src=https://static.bidcom.com.ar/publicacionesML/productos/ABLUE164/1000x1000-ABLUE164.jpg&h=400&q=100",
    ],
    stock: 30,
    rating: 4,
    arrivalDate: "15 de Marzo",
  },
  {
    _id: "3",
    name: "Smartwatch Deportivo",
    description:
      "Reloj inteligente con monitor de frecuencia cardiaca y seguimiento de actividad.",
    price: 129.99,
    category: "Tecnología",
    discount: 0.2,
    images: [
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-smartwatch/p/b/6/1-44-android-ios-t500-smart-watch-with-bluetooth-calling-black-original-imagvy24hyyqbzvm.jpeg?q=90&crop=false",
    ],
    stock: 20,
    rating: 4.5,
    arrivalDate: "17 de Marzo",
  },
  {
    _id: "4",
    name: "Mochila Escolar",
    description:
      "Mochila resistente y espaciosa, ideal para el colegio o la universidad.",
    price: 39.99,
    category: "Accesorios",
    discount: 0,
    images: [
      "https://images.tcdn.com.br/img/img_prod/700556/mochila_escolar_juvenil_8732253_4383_1_5672ae484f4ecb5d63b1c9ceffda2eeb.jpg",
    ],
    stock: 40,
    rating: 4.0,
    arrivalDate: "20 de Marzo",
  },
  {
    _id: "5",
    name: "Zapatos de Running",
    description:
      "Calzado cómodo y ligero diseñado para running y entrenamientos intensos.",
    price: 89.99,
    category: "Calzado",
    discount: 0,
    images: [
      "https://nivia.com.co/cdn/shop/files/Tenis_Ultra_Running_Azul_Nivia_Xbox_5.jpg?v=1697839355&width=1445",
    ],
    stock: 25,
    rating: 4.3,
    arrivalDate: "10 de Marzo",
  },
  {
    _id: "6",
    name: "Cámara Deportiva",
    description:
      "Cámara resistente al agua con grabación en 4K y estabilizador de images.",
    price: 199.99,
    category: "Tecnología",
    discount: 0,
    images: ["https://sistema.langtecnologia.com.ar/img/qloud/3241/5684_1.jpg"],
    stock: 15,
    rating: 4.8,
    arrivalDate: "12 de Marzo",
  },
  {
    _id: "7",
    name: "Bicicleta de Montaña",
    description:
      "Bicicleta todoterreno con cuadro de aluminio y frenos de disco hidráulicos.",
    price: 499.99,
    category: "Deportes",
    discount: 0.25,
    images: ["https://irunabikes.com/wp-content/uploads/foto-1.jpg"],
    stock: 10,
    rating: 4.9,
    arrivalDate: "8 de Marzo",
  },
  {
    _id: "8",
    name: "Balón de Fútbol",
    description:
      "Balón oficial de la FIFA para partidos de fútbol profesionales.",
    price: 29.99,
    category: "Deportes",
    discount: 0,
    images: ["https://assets1.afa.com.ar/argen.jpg"],
    stock: 35,
    rating: 4.6,
    arrivalDate: "5 de Marzo",
  },
  {
    _id: "9",
    name: "Gafas de Sol",
    description:
      "Gafas de sol polarizadas con protección UV y montura de aluminio.",
    price: 79.99,
    category: "Accesorios",
    discount: 0,
    images: [
      "https://opticaval.es/wp-content/uploads/2023/03/190605407424.jpg",
    ],
    stock: 45,
    rating: 4.4,
    arrivalDate: "3 de Abril",
  },
  {
    _id: "10",
    name: "Mancuernas Ajustables",
    description:
      "Set de mancuernas ajustables con discos de peso para entrenamientos en casa o el gimnasio.",
    price: 149.99,
    category: "Deportes",
    discount: 0,
    images: [
      "https://i5.walmartimages.cl/asr/8d2d0da6-5c52-4bd9-a674-870e7a7274cc.cbae6e1ec761152a529397fea3da18d5.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff",
    ],
    stock: 5,
    rating: 4.1,
    arrivalDate: "25 de Marzo",
  },
];
