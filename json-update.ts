import Redis from "ioredis";

// Crear una nueva instancia de Redis
const redis = new Redis({
  host: "localhost", // o la dirección IP de tu servidor Redis
  port: 6379, // el puerto en el que se ejecuta Redis
  // password: 'tu_contraseña' // si tu instancia de Redis está protegida con contraseña
});


// Actualizar un campo en un objeto JSON
async function updateActorJsonField(
  actorId: number,
  field: string,
  value: any
) {
  await redis.call(
    "JSON.SET",
    `actor:${actorId}`,
    field,
    JSON.stringify(value)
  );
  console.log(`Campo ${field} actualizado para el actor con ID ${actorId}.`);
}

// Eliminar un campo de un objeto JSON
async function deleteActorJsonField(actorId: number, field: string) {
  await redis.call("JSON.DEL", `actor:${actorId}`, field);
  console.log(`Campo ${field} eliminado para el actor con ID ${actorId}.`);
}

// Ejemplo de uso
async function runExample() {
  await updateActorJsonField(1, ".last_name", "DEMO-UPDATE-JSON");
  await deleteActorJsonField(2, ".last_name");
}

runExample()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
