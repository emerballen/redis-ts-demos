import Redis from "ioredis";

// Configuración de conexión a Redis
const redis = new Redis({
  host: "localhost", // o la dirección IP de tu servidor Redis
  port: 6379, // el puerto en el que se ejecuta Redis
  // password: 'tu_contraseña' // si tu instancia de Redis está protegida con contraseña
  // Si no usas contraseña, simplemente omite la opción 'password'
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

// Función asíncrona para guardar los datos de los actores
async function saveActorsData(actors: any[]) {
  try {
    for (const actor of actors) {
      const key = `actor:${actor.id}`;
      await redis
        .multi()
        .hset(
          key,
          "first_name",
          actor.first_name,
          "last_name",
          actor.last_name,
          "last_update",
          actor.last_update
        )
        .expire(key, 60) // Establece un TTL de 60 segundos (1 minuto)
        .exec(); // Ejecuta la transacción
      console.log(`Actor con ID ${actor.id} guardado en Redis.`);
    }
  } catch (error) {
    console.error("Error al guardar los datos de los actores:", error);
  }
}

// Guardar los datos de los actores
saveActorsData(actors)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
