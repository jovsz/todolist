require('dotenv').config(); //usar dotenv para cargar las variables de entorno
//la razon de utilizar dotenv es para ocultar nuesta informacion con respeto a la conexion que realiizaremos con la base de datos
//dicha informacion se tiene que crear en un directorio protegido y en el archivo gitinorge, agregar los archivos .env para que no sean visibles
//en el directorio

module.exports ={
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    define: {
      createdAt: 'created_at', //avisamos como se llamara ese campo ahora
      updatedAt: 'updated_at' //para que los modulos cambien el formato de los campos
    }

  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
  
