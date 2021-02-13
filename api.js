var Db  = require('./dbcategoria');
var Categoria = require('./categoria');
const dbocategoria = require('./dbcategoria');
//Requerido en todos
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);//Ruta principal

//Ruta para todas las categorias
router.route('/categoria').get((request,response)=>{
    dbocategoria.getCategoria().then(result => {
        //console.log(result);
        response.json(result[0]);
    })
})

//Ruta para una categoria por id
router.route('/categoria/:id').get((request,response)=>{
    dbocategoria.getCategoria_x_id(request.params.id).then(result => {
        //console.log(result);
        response.json(result[0]);
    })
})

//Ruta para una guardar una categoria segun clase categoria
router.route('/categoria/guardar').post((request,response)=>{
    let categoria = {...request.body}
    dbocategoria.insertCategoria(categoria).then(result => {
       response.json(result[0]);
    })
})

//Ruta para una actualizar una categoria segun clase categoria
router.route('/categoria/actualizar').post((request,response)=>{
    let categoria = {...request.body}
    dbocategoria.updateCategoria(categoria).then(result => {
       response.json(result[0]);
    })
})

var port = process.env.PORT || 8090; //Declarando puerto de inicio
app.listen(port); //Puerto de escucha
console.log('Categoria API Iniciado en el puerto : ' + port); //Mensaje de inicio de servicio