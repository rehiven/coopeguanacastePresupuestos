const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
var bodyParser = require("body-parser");
//settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({             //perminte acceder a codigo en comun dentro del proyecto
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
//routes

app.use(require('./routes/index.js'));
app.use(require('./routes/materials.js'));
app.use(require('./routes/mounts.js'));
app.use(require('./routes/budgets.js'));
//app.use(require('./routes/users.js'));
//static files

app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;