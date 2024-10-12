const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const cors = require('cors'); 
const app = express();


const db = require('./models'); 


const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

const productsAPIRoutes = require('./src/api/products/products');  
const usersAPIRoutes = require('./src/api/users/users');       


app.use('/api/products', productsAPIRoutes);
app.use('/api/users', usersAPIRoutes);


app.use(cors());


app.use(cors({
  origin: 'http://localhost:3001'
}))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use(methodOverride('_method'));

app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true
}));


app.use('/products', productRoutes);
app.use('/users', userRoutes);


app.get('/', (req, res) => {
  res.render('home', { req });  
});

db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  });

// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
