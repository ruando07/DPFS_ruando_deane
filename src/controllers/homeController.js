const products = [
    { id: 1, name: "Laptop A", description: "Laptop potente", price: 1000, image: "/img/laptop1.jpg" },
    { id: 2, name: "Laptop B", description: "Laptop básica", price: 500, image: "/img/laptop2.jpg" },
    { id: 3, name: "Laptop C", description: "Laptop premium", price: 1500, image: "/img/laptop3.jpg" }
  ];
  
  module.exports = {
    index: (req, res) => {
      res.render('home', { products }); 
    }
  };
  