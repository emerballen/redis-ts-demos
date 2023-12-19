import Redis from "ioredis";

// Configura la conexión a Redis
const redis = new Redis({
  host: "localhost", // o la dirección IP de tu servidor Redis
  port: 6379, // el puerto en el que se ejecuta Redis
  // password: 'tu_contraseña' // si tu instancia de Redis está protegida con contraseña
});

// Función para obtener campos específicos de un hash en Redis
async function getActorFields(actorId: number, fields: string[]) {
  const values = await redis.hmget(`actor:${actorId}`, ...fields);
  console.log("values", values);
  // Combina los campos y valores en un objeto
  const actorData: Record<string, string | null> = fields.reduce(
    (obj, field, index) => {
      obj[field] = values[index];
      return obj;
    },
    {} as Record<string, string | null>
  );

  console.log(actorData);
}

// Ejemplo de uso: obtener los campos 'first_name' y 'last_update' del actor con ID 1
getActorFields(1, ["last_update", "first_name"])
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
