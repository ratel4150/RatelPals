import { createClient } from "redis";

export const connect = async () => {
  const redisClient = createClient({
    password: "rNUJ3CKkWXFF3RTfreSe57KGFmrzS6NT",
    socket: {
      host: "redis-16888.c267.us-east-1-4.ec2.cloud.redislabs.com",
      port: 16888,
    },
  });
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  console.log("Success");
  await redisClient.connect();
  return redisClient;
};


/* 
const prurbs = async()=>{
    const pruebita = await connect()
 
  
    const KEY = "RATEL"
     // Utiliza promesas o try-catch para manejar errores de manera más efectiva
  try {
    const t=await pruebita.set('raziel', 'raziel');
    const beerOfRedis = await pruebita.get('raziel');
    

    if (beerOfRedis) {
      console.log(beerOfRedis);
      return JSON.parse(beerOfRedis);
    } else {
      console.log("No hay datos en Redis para la clave:", KEY);
      // Puedes manejar este caso de alguna manera específica
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos de Redis:", error);
    // Puedes lanzar una excepción o manejar el error de otra manera según tu lógica de la aplicación
  }
   
}

prurbs()
 */