const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

//ejs enginee
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Lectura de formator y cargar de archivo estaticos
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


//middleware de aplicacion
//reques- (solicitud/peticion del usuario)
//response - (respuesta hacia el usuario)
//nex - es continuar con la ejecucion del siguiente middleware
app.get('/',(request,response, nex) => {
    return response.render('pages/home', {title:'Home'});

});

//registro
app.get('/registro', (request,response) =>{
    return response.render('pages/register', {title:'Registro'});
})

app.post('/registro', async (request,response,nex) =>{
    let {firstName, lastName,email, password} = request.body;
    try{
    
    }catch(e){

    }
});

//login user
app.get('/login', (request,response) =>{
    return response.render('pages/login',{title: 'Login'})
});

//categoria
app.get('/categorias', (request,response) =>{
    return response.render('pages/categories', {title: 'Categorias'})
});

//inicializamos el servidor
app.listen(PORT, () => {
    console.log(PORT)
});