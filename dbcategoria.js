var config = require('./dbconfig');//Instanciamos el archivo dbconfig
const sql = require('mssql');//Se necesita paquete mssql

//Funcion Async : Asyncrona esta devuelve un objeto

async function getCategoria() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT * FROM TM_CATEGORIA");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getCategoria_x_id(cat_id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, cat_id)
            .query("SELECT * from TM_CATEGORIA where CAT_ID = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function insertCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let insertCate = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .input('cat_nom', sql.VarChar, categoria.cat_nom)
            .input('cat_obs', sql.VarChar, categoria.cat_obs)
            .execute('SP_I_CATEGORIA_01');
        return insertCate.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function updateCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let updateCate = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .input('cat_nom', sql.VarChar, categoria.cat_nom)
            .input('cat_obs', sql.VarChar, categoria.cat_obs)
            .execute('SP_U_CATEGORIA_01');
        return updateCate.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCategoria : getCategoria,
    getCategoria_x_id : getCategoria_x_id,
    insertCategoria : insertCategoria,
    updateCategoria : updateCategoria
}