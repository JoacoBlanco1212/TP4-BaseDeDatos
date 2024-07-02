import { conn } from "../db.js";

const getArtistas = async (_, res) => {

    const artistas = (await conn.query("SELECT * FROM artistas"))[0];
    
    res.json(artistas);
    return artistas;
};

const getArtista = async (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
        const { id } = req.params;
        const artista = (await conn.query("SELECT * FROM artistas WHERE id = ?", [id]))[0][0];
        res.json(artista);
};

const createArtista = async (req, res) => {

    const { nombre } = req.body;
        await conn.query("INSERT INTO artistas (nombre) VALUES (?)", [nombre]);
        res.status(201).json({ message: 'Artista creado' });
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
};

const updateArtista = async (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
        const { id } = req.params;
        const { nombre } = req.body;
        await conn.query("UPDATE artistas SET nombre = ? WHERE id = ?", [nombre, id]);
        res.json({ message: 'Artista cambiado' });
};

const deleteArtista = async (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const { id } = req.params;
        await conn.query("DELETE FROM artistas WHERE id = ?", [id]);
        res.json({ message: 'Artista borrado' });

};

const getAlbumesByArtista = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes

    const { id } = req.params;
        const albumes = (await conn.query("SELECT * FROM albumes WHERE artista = ?", [id]))[0];
        res.json(albumes);
};

const getCancionesByArtista = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const { id } = req.params;
        const canciones = (await conn.query(`
            SELECT canciones.* FROM canciones 
            JOIN albumes ON canciones.album = albumes.id 
            WHERE albumes.artista = ?`, [id]))[0];
        res.json(canciones);
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
