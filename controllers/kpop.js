const { request, response } = require("express");
const pool = require("../db/connection");
const modelkpop = require ("../models/kpop");

const addkpop = async (req = request, res = response) =>{
    const {
        nombre, 
        debut,
        num_integrantes,
        nacionalidad,
        grupo_de,
        giras,
        discos,
        Activo = 'S'} = req.body
    
    if(!nombre|| 
        !debut||
        !num_integrantes||
        !nacionalidad||
        !grupo_de||
        !giras||
        !discos||
        !Activo)
    {
        res.status(400).json({msg:"Faltan Datos"})
        return
    }

    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        const [kpopExist] = await conn.query(modelkpop.querykpopExist,[nombre])

        if(kpopExist){
            res.status(400).json({msg: `El grupo ${Name} ya se encuntra registrado.`})
            return
        }
        //Generamos la consulta
        const result = await conn.query(modelkpop.queryaddkpop,[
        nombre, 
        debut,
        num_integrantes,
        nacionalidad,
        grupo_de,
        giras,
        discos,
        Activo], (error) => {if (error) throw error})

        if (result.affectedRows ===0){ //En caso de no haber registros lo informamos
            res.status(400).json({msg: `No se pudo agregar el grupo`})
            return
        }

        res.json({msg:`Se agrego satisfactoriamente el grupo`}) //Se manda la lista de usuarios
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }
    
    finally{
        if(conn) conn.end() //Termina la conexion
    }
    }

const deletekpopbyID = async (req = request, res = response) =>{
    const {id} = req.params
        let conn;
        
        try{
            conn = await pool.getConnection() //Realizamons la conexion
    
            //Generamos la consulta
            const result = await conn.query(modelkpop.queryDeletekpopByID, [id], (error) => {if (error) throw error})
    
            if (result.affectedRows ===0){ //En caso de no haber registros lo informamos
                res.status(404).json({msg: `No existen grupos registrado con el ID ${id}`})
                return
            }
    
            res.json({msg:`Se elimino satisfactoriamente el grupo`}) //Se manda la lista de usuarios
        }
        catch(error){
            console.log(error)
            res.status(500).json({msg: error}) //Informamos el error
        }
        
        finally{
            if(conn) conn.end() //Termina la conexion
        }
    
    }

const getkpop = async (req = request, res = response) =>{
    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        //Generamos la consulta
        const kpop = await conn.query(modelkpop.queryGetkpop, (error) => {if (error) throw error})

        if (kpop.length===0){ //En caso de no haber registros lo informamos
            res.status(404).json({msg: "No existen grupos registrados"})
            return
        }

        res.json({kpop}) //Se manda la lista de usuarios
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }
    
    finally{
        if(conn) conn.end() //Termina la conexion
    }
    }

const getkpopbyID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        //Generamos la consulta
        const [kpop] = await conn.query(modelkpop.queryGetkpopByID, [id], (error) => {if (error) throw error})

        if (!kpop){ //En caso de no haber registros lo informamos
            res.status(404).json({msg: `No existe personaje registrado con el ID ${id}`})
            return
        }

        res.json({kpop}) //Se manda la lista de usuarios
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }
    
    finally{
        if(conn) conn.end() //Termina la conexion
    }
    }

const updatekpopbyID = async (req = request, res = response) =>{
    const {id} = req.params
            const {
                nombre, 
                debut,
                num_integrantes,
                nacionalidad,
                grupo_de,
                giras,
                discos,
                Activo
                   } = req.body
            
            if(
                !nombre|| 
                !debut||
                !num_integrantes||
                !nacionalidad||
                !grupo_de||
                !giras||
                !discos||
                !Activo
               )
            {
                res.status(400).json({msg:"Faltan Datos"})
                return
            }

            let conn;
            
            try{
                conn = await pool.getConnection() //Realizamons la conexion
        
                //Generamos la consulta
                const result = await conn.query(`UPDATE kpop SET 
                nombre = '${nombre}', 
                debut = '${debut}',
                num_integrantes = ${num_integrantes},
                nacionalidad = '${nacionalidad}',
                grupo_de = '${grupo_de}',
                giras = '${giras}',
                discos = '${discos}',
                Activo = '${Activo}'
                WHERE ID = ${id}`, (error) => {if (error) throw error})
        
                if (result.affectedRows ===0){ //En caso de no haber registros lo informamos
                    res.status(400).json({msg: `No se pudo modificar el grupo`})
                    return
                }
        
                res.json({msg:`Se modifico satisfactoriamente el grupo`}) //Se manda la lista de usuarios
            }
            catch(error){
                console.log(error)
                res.status(500).json({msg: error}) //Informamos el error
            }
            
            finally{
                if(conn) conn.end() //Termina la conexion
            }
    }    
module.exports = {addkpop, deletekpopbyID, getkpop, getkpopbyID, updatekpopbyID}