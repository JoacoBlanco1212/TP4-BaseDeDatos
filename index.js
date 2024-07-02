import express from "express";
const app = express();
const port = 3000;

import artistas from "./controllers/artistas.js";
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

app.use(express.json());

import {conn} from './db.js';

//Checkea la conexion
async function testConnection() {
  try {
    const connection = await conn;
    console.log('Connected to the database');
    
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

testConnection();

app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});



// Artistas
app.get("/artistas", artistas.getArtistas);
app.get("/artistas/:id", artistas.getArtista);
app.post("/createArtista", artistas.createArtista);
app.put("/updateArtista/:id", artistas.updateArtista);
app.delete("/deleteArtista/:id", artistas.deleteArtista);
app.get("/artistas/canciones/:id", artistas.getCancionesByArtista); 
app.get("/artistas/albumes/:id", artistas.getAlbumesByArtista);  

// Albumes 
app.get("/albumes", albumes.getAlbumes);
app.get("/albumes/:id", albumes.getAlbum);
app.post("/createAlbum", albumes.createAlbum);
app.put("/updateAlbum/:id", albumes.updateAlbum);
app.delete("/deleteAlbum/:id", albumes.deleteAlbum);
app.get("/albumes/artista/:id", albumes.getCancionesByAlbum);

// Canciones
app.get("/canciones", canciones.getCanciones);
app.get("/canciones/:id", canciones.getCancion);
app.post("/createCancion", canciones.createCancion);
app.put("/updateCancion/:id", canciones.updateCancion);
app.delete("/deleteCancion/:id", canciones.deleteCancion);
app.put("/canciones/artista/:id", canciones.reproducirCancion);
/* ------------------- Rutas ------------------- */

// Artistas
// Completar con las rutas de artistas
// Para acceder a cada funcion de artistas, se debe hacer de la siguiente forma:
// artistas.getArtistas;
// artistas.getArtista;


// Albumes
// Completar con las rutas de albumes
// Para acceder a cada funcion de albumes, se debe hacer de la siguiente forma:
// albumes.getAlbumes;
// albumes.getAlbum;
// ...

// Canciones
// Completar con las rutas de canciones
// Para acceder a cada funcion de canciones, se debe hacer de la siguiente forma:
// canciones.getCanciones;
// canciones.getCancion;
// ...

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
