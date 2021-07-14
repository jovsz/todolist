module.exports ={
  development: {
    username: "postgres",
    password: "admin",
    database: "todolist",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      createdAt: 'created_at', //avisamos como se llamara ese campo ahora
      updatedAt: 'updated_at' //
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
  
