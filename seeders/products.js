'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Perro de concreto',
        description: 'Diseño de perro estilo lobo totalmente fabricado en concreto solido',
        image: 'perro.jpg',
        category: 'concreto',
        price: 25.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gallina de concreto',
        description: 'Gallina decorativa de concreto para patio',
        image: 'galloina.jpg',
        category: 'concreto',
        price: 18.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Banca de parque',
        description: 'Banca grande para parque realizada en concreto',
        image: 'banca.jpg',
        category: 'concreto',
        price: 165.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fuente pequeña',
        description: 'Fuente de concreto de 3 niveles con  sistema de agua interno',
        image: 'fuentec.jpg',
        category: 'concreto',
        price: 120.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fuente Grande',
        description: 'Fuente grande de 2 niveles con diseño decotarivo y sistema de agua integrado',
        image: 'fuenteg.jpg',
        category: 'concreto',
        price: 250.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pote grande para planta',
        description: 'Pote de concreto grande para planta en forma de copa',
        image: 'poteg.jpg',
        category: 'concreto',
        price: 55.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pote pequeño para planca',
        description: 'Pote decorativo pequeño para plantas pequeñas realizado en concreto',
        image: 'potec.jpg',
        category: 'concreto',
        price: 10.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Figuras de concreto',
        description: 'Diferentes figuras de concreto para decoraciones',
        image: 'figuras.jpg',
        category: 'concreto',
        price: 18.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
