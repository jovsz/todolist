const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
let {sequelize} = require("./models");
const { Users } = require("./models");
const app = express();
const PORT = 8000;
require('./config/passport');

//configurar nuestra aplicacion para procesar datos urlencoded
app.use(express.urlencoded({extended: true}));

//ejs enginee
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Lectura de formator y cargar de archivo estaticos
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//middleware de terceros 
app.use(session({
    secret: 'academlo secret',
    resave: false,
    saceUninitialized: true
}));

const passportLocalStrategy = passport.authenticate('local', {
    successRedirect: '/categorias',
    failureRedirect: '/login'
})

app.use(passport.initialize());
app.use(passport.session());
//middleware de aplicacion
//reques- (solicitud/peticion del usuario)
//response - (respuesta hacia el usuario)
//nex - es continuar con la ejecucion del siguiente middleware
app.get('/',(request,response, nex) => {
    return response.render('pages/home', {title:'Home'});

});
//login user
app.get('/login', (request,response) =>{
    return response.render('pages/login',{title: 'Login'})
});

app.post('/login', passportLocalStrategy,(err) =>{
    if (err){
        return console.log(err);
    }
})

//registro
app.get('/registro', (request,response) =>{
    return response.render('pages/register', {title:'Registro'});
})

app.post("/registro", async (request, response, next) => {
    let {firstname, lastname, email, password} = request.body;
    try{
      await Users.create({firstname, lastname, email, password});
      response.redirect("/registro");
    }catch(error){
      next(error);
    }
});


//categoria
app.get('/categorias', (request,response,next) =>{
    //let username = `${request.user.firstname} ${request.user.lastname}`
    if(request.isAuthenticated()){
        return response.render('pages/categories', {title: 'Categorias', username: 'usuario'})
    }
    return response.redirect('/login');
});

//logout
app.get('/logout', (request,response) => {
    request.logout()
    return response.redirect('/login');
});

//inicializamos el servidor
app.listen(PORT, () => {
    console.log(PORT)
});