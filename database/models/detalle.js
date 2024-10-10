module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser nulo si no hay imagen
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'products', // Nombre de la tabla en la base de datos
      timestamps: false 
    });
  
    Product.associate = function(models) {
    
    };
  
    return Product;
  };