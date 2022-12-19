const modelkpop = {
    queryGetkpop: "SELECT * FROM kpop",
    queryGetkpopByID: `SELECT * FROM kpop WHERE ID = ?`,
    queryDeletekpopByID: `UPDATE kpop SET Activo = 'N' WHERE ID = ?`,
    querykpopExist: `SELECT nombre FROM kpop WHERE nombre = ? `,
    queryaddkpop: `INSERT INTO kpop(
        nombre, 
        debut,
        num_integrantes,
        nacionalidad,
        grupo_de,
        giras,
        discos,
        Activo) 
    VALUES(
        ?,?,?,?,?,?,?,?)`,
}

module.exports = modelkpop