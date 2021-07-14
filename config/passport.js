//definir la estategia local con todas sus configuraciones
const passport = require('passport');
const LocaStrategy = require('passport-local').Strategy;
const  { Users } = require('../models');
const bcrypt = require('bcryptjs');

passport.use(new LocaStrategy({
    usernameField: 'email',
},async(email, password, done)=>{
    //comprobar que exista el correo Electronico en la base de datos en
    try{
        let user = await Users.findOne({where: {email}});
        //user va estar definido si el correo se encuentra en la DB
        //user = null si el correo no se encuentra en la DB
        if(user && bcrypt.compareSync(password , user.password)){
            return done(null, user);
        }
        //las creedenciales del usuario son incorrectas / no existe el correo en la DB
        return done(null,false);
    }catch(error){
        done(error);
    }
    //despues comprobrar si la contrase;a de base de datos es la misma que la del cliente
}));

//Serializacion
passport.serializeUser((user, done) => {
    //firmarlos datos del usuario
    return done(null, user.id);
});
//deserializacion
passport.deserializeUser((id, done) => {
    //Vamos a obtener los datos del usuario a partir del ID
    try{
        let user = Users.findByPk(id, {plain: true});
        done(null, user); //request -> request.user
    }catch(error){
        done(error);
    }
})