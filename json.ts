import Redis from "ioredis";

// Configuración de conexión a Redis
const redis = new Redis({
  host: "localhost", // o la dirección IP de tu servidor Redis
  port: 6379, // el puerto en el que se ejecuta Redis
  // Omitir la contraseña si tu instancia de Redis no la requiere
  // password: "tu_contraseña", // si tu instancia de Redis está protegida con contraseña
});

// Datos de los actores para guardar en Redis
const actors = [
  {
    id: 1,
    first_name: "PENELOPE",
    last_name: "GUINESS",
    last_update: "2006-02-15 04:34:33",
  },
  {
    id: 2,
    first_name: "NICK",
    last_name: "WAHLBERG",
    last_update: "2006-02-15 04:34:33",
  },
];

// Función asíncrona para guardar los datos de los actores en formato JSON
async function saveActorsDataAsJson(actors: any[]) {
  try {
    for (const actor of actors) {
      const actorJson = JSON.stringify({
        first_name: actor.first_name,
        last_name: actor.last_name,
        last_update: actor.last_update,
      });
      await redis.set(`actor:${actor.id}`, actorJson);
      console.log(`Actor con ID ${actor.id} guardado en Redis como JSON.`);
    }
  } catch (error) {
    console.error(
      "Error al guardar los datos de los actores como JSON:",
      error
    );
  }
}

// Guardar los datos de los actores en formato JSON
saveActorsDataAsJson(actors)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
