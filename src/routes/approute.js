'use strict';
const { get } = require('http');
const multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function (app) {
    //controlador
    var userController = require('../controller/userController')
    var cursoController = require('../controller/cursoController')
    var carreraController = require('../controller/carreraController')
    var homeworkController = require('../controller/homeworkController')
    var botController = require('../controller/botController')
    var authController = require('../controller/authController')
    var csvController = require('../controller/csvController')
    // USUARIO
    app.route('/users/')
        //.get(authController.auth, userController.getAllUsers)
        .get(userController.getAllUsers)
        .post(userController.createUser)


    app.route('/login')
        .post(userController.login)

    app.route('/users/:id')
        .get(userController.getAllUsers)
        .put(userController.updateUser)

    app.route('/users/:id')
        .delete(userController.deleteUser)

    // TAREA
    app.route('/homeworks')
        .get(homeworkController.getAllHomework)
        .post(homeworkController.createHomework)

    app.route('/homeworks/:id')
        .delete(homeworkController.deleteHomework)

    // TAREAS POR USUARIO-CURSO
    app.route('/homeworkuser/:username')
        .get(homeworkController.gethomeworkuser)

    // ESTATUS TAREAS
    app.route('/HomeworkStatus')
        .get(homeworkController.getAllHomeworkStatus)
        .post(homeworkController.createHomeworkStatus)

    app.route('/HomeworkStatus/:id')
        .delete(homeworkController.deleteHomeworkStatus)

    // CURSO
    app.route('/curso')
        .get(cursoController.getAllCursos)
        .post(cursoController.createCurso)

    app.route('/curso/:id')
        .get(cursoController.getAllCursos)
        .put(cursoController.updateCurso)
        .delete(cursoController.deleteCurso)


    // CARRERA
    app.route('/carrera')
        .get(carreraController.getAllCarrera)
        .post(carreraController.createCarrera)

    app.route('/carrera/:id')
        .get(carreraController.getCarrera)
        .put(carreraController.updateCarrera)

    app.route('/carrera/:id')
        .delete(carreraController.deleteCarrera)

    // TYPES USER
    app.route('/typesUser')
        .get(userController.getAllTypeUser)
        .post(userController.createTypeUser)

    app.route('/typesUser/:id')
        .delete(userController.deleteTypeUser)

    // CONECT CARRERA
    app.route('/carreraConect')
        .get(carreraController.getAllCarreraConect)
        .post(carreraController.createCarreraConect)

    app.route('/carreraConect/:id')
        .delete(carreraController.deleteCarreraConect)

    // CONECT CURSO
    app.route('/cursoConect')
        .get(cursoController.getAllCursoConect)
        .post(cursoController.createCursoConect)

    app.route('/cursoConect/:id')
        .delete(cursoController.deleteCursoConect)

    // USER NOTA
    app.route('/UserNota')
        .get(userController.getAllUser_nota)
        .post(userController.createUser_nota)

    app.route('/UserNota/:id')
        .delete(userController.deleteUser_nota)


    //BOT
    app.route('/bot')
    .get(botController.getbotAll)
    .post(botController.createbot)
    
    app.route('/bot/:id')
    .put(botController.updatebot)
    .get(botController.getBot)
    // csv
    app.route("/upload")
        .post(upload.single('file'), csvController.upload)

    // jwt
    app.use(authController.notFound)
    app.use(authController.errorMessage)



}
