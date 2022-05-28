var Db  = require('./dbcategoria');
var Categoria = require('./categoria');
const dbocategoria = require('./dbcategoria');
//Requerido en todos
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

/* TODO:Documentacion con SWAGGER */
//https://www.npmjs.com/package/swagger-jsdoc
const swaggerJsdoc = require('swagger-jsdoc');
//https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express');

/* TODO : Ejemplo Swagger https://editor.swagger.io/ */
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version:"1.0.1",
            title: 'API REST Categorias',
            description: 'API REST Categorias',
            contact: {
                name: 'AnderCode Developer'
            },
            servers :["http://localhost:8090"]
        }
    },
    apis: ["api.js"]
};

/* TODO: Documentacion con Swawgger y Ruta */
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);//Ruta principal

// Routes
/**
 * @swagger
 * /api/categoria:
 *  get:
 *      description: Use para obtener todas las categorias
 *      responses:
 *          '200':
 *              description: Listados Correctamente
 */
//Ruta para todas las categorias
router.route('/categoria').get((request,response)=>{
    dbocategoria.getCategoria().then(result => {
        response.json(result[0]);
    })
})

// Routes
/**
 * @swagger
 * /api/Categoria/{id}:
 *  get:
 *    description: Obtener categoria por ID
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *        '200':
 *          description: Categoria obtenida correctamente
 */
//Ruta para una categoria por id
router.route('/categoria/:id').get((request,response)=>{
    dbocategoria.getCategoria_x_id(request.params.id).then(result => {
        response.json(result[0]);
    })
})

// Routes
/**
 * @swagger
 * /api/categoria/guardar:
 *  post:
 *      description: Use para guardar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                 cat_id: ""
 *                 cat_nom: "Categoria 1"
 *                 cat_obs: "Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria guardada correctamente
 *          content:
 *              application/json:
 *                type: object
 */
//Ruta para una guardar una categoria segun clase categoria
router.route('/categoria/guardar').post((request,response)=>{
    let categoria = {...request.body}
    dbocategoria.insertCategoria(categoria).then(result => {
       response.json(result[0]);
    })
})

// Routes
/**
 * @swagger
 * /api/categoria/actualizar:
 *  put:
 *      description: Use para actualizar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                cat_id: "1"
 *                cat_nom: "Actualizar Categoria 1"
 *                cat_obs: "Actualizar Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria actualizada correctamente
 *          content:
 *              application/json:
 *                type: object
 */
//Ruta para una actualizar una categoria segun clase categoria
router.route('/categoria/actualizar').put((request,response)=>{
    let categoria = {...request.body}
    dbocategoria.updateCategoria(categoria).then(result => {
       response.json(result[0]);
    })
})

var port = process.env.PORT || 8090; //Declarando puerto de inicio
app.listen(port); //Puerto de escucha
console.log('Categoria API Iniciado en el puerto : ' + port); //Mensaje de inicio de servicio