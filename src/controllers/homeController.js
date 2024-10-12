const products = [
    { id: 1, name: "Perro de concreto", description: "Diseño de perro estilo lobo totalmente fabricado en concreto solido", price: 25.00, image: "/images/img/perro.jpg" },
    { id: 2, name: "Gallina de concreto", description: "Gallina decorativa de concreto para patio", price: 18.00, image: "/images/img/galloina.jpg" },
    { id: 3, name: "Banca de parque", description: "Banca grande para parque realizada en concreto", price: 165.00, image: "/images/img/banca.jpg" }
  ];
  
  module.exports = {
    index: (req, res) => {
      res.render('home', { products }); 
    }
  };
  
