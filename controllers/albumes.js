import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
        const albumes = (await conn.query(`
        SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista 
        FROM albumes 
        JOIN artistas ON albumes.artista = artistas.id
    `))[0];
    res.json(albumes);
};

const getAlbum = async (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
        const { id } = req.params;
        const album = (await conn.query(`
            SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista 
            FROM albumes 
            JOIN artistas ON albumes.artista = artistas.id 
            WHERE albumes.id = ?
        `, [id]))[0][0];
        res.json(album);
};

const createAlbum = async (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        const { nombre, artista } = req.body;
        await conn.query(`
            INSERT INTO albumes (nombre, artista) 
            VALUES (?, ?)
        `, [nombre, artista]);
        res.status(201).json({ message: 'Album creado' });
};

const updateAlbum = async (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        const { id } = req.params;
        const { nombre, artista } = req.body;
        await conn.query(`
            UPDATE albumes 
            SET nombre = ?, artista = ? 
            WHERE id = ?
        `, [nombre, artista, id]);
        res.json({ message: 'Album cambiado' });
};

const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const { id } = req.params;
        await conn.query("DELETE FROM albumes WHERE id = ?", [id]);
        res.json({ message: 'Album borrado' });
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const { id } = req.params;
        const canciones = (await conn.query(`
            SELECT canciones.id, canciones.nombre, canciones.duracion, canciones.reproducciones 
            FROM canciones 
            WHERE album = ?
        `, [id]))[0];
        res.json(canciones);
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
