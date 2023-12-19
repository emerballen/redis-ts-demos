import Redis from "ioredis";

// Crear una nueva instancia de Redis
const redis = new Redis({
  host: "localhost", // o la dirección IP de tu servidor Redis
  port: 6379, // el puerto en el que se ejecuta Redis
  // password: 'tu_contraseña' // si tu instancia de Redis está protegida con contraseña
});

// Actualizar un campo en un hash
async function updateActorField(actorId: number, field: string, value: string) {
  await redis.hset(`actor:${actorId}`, field, value);
  console.log(`Campo ${field} actualizado para el actor con ID ${actorId}.`);
}

// Eliminar un campo de un hash
async function deleteActorField(actorId: number, field: string) {
  await redis.hdel(`actor:${actorId}`, field);
  console.log(`Campo ${field} eliminado para el actor con ID ${actorId}.`);
}

// Ejemplo de uso
async function runExample() {
  await updateActorField(1, "last_name", "DEMO-UPDATE-HASH");
  await deleteActorField(2, "last_name");
}

runExample()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
