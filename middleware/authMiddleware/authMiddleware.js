// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWY_SECRET_KEY || "raziel";
console.log(secretKey);

const authMiddleware = {
  authenticateToken: async (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log(authHeader);

    if (!authHeader) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    // Verifica el token JWT
    const token = authHeader.replace("Bearer ", ""); // Elimina el prefijo "Bearer"

    // Verifica el token JWT
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error(err); // Imprime el error para depuración
        return res.status(403).json({ error: "Token no válido" });
      } else {
        // El token es válido, y 'user' contiene la información decodificada
        console.log("Token válido:", user);
      }

      // Agrega el usuario decodificado a la solicitud para su uso posterior
      req.user = user;
      next();
    });
  },
  checkUserRole: (allowedRoles) => {
    console.log(allowedRoles);
    console.log("$$$$$$$$$$");
    return (req, res, next) => {
      console.log(req.user);
      const userRoles = req.user.roles; // Suponiendo que el rol del usuario se almacena en el campo 'roles' del objeto user

      // Verifica si todos los roles del usuario están en los roles permitidos
      const isAuthorized = userRoles.some((userRole) => {
        console.log(allowedRoles);
        console.log(userRole);

        return allowedRoles.includes(userRole);
      });
      console.log(isAuthorized);

      if (!isAuthorized) {
        return res
          .status(403)
          .json({ error: "Acceso no autorizado para este rol" });
      }

      next(); // Llama a 'next()' si el usuario tiene al menos un rol permitido
    };
  },
 
};

export default authMiddleware;
