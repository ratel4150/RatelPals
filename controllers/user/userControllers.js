// controllers/userController.js

// Importa los modelos y las bibliotecas necesarios

import models from "../../models/index.js";
const { User, UserProfile, Role, UserRole } = models;
import readPermissionSchemaUser from "../../permissions/index.js";

// Define funciones para manejar solicitudes relacionadas con usuarios
const userController = {

  getUserRoles: async (req, res) => {
    const { userId } = req.params;
    

    try {
      const userRoles = await UserRole.find({ user: userId }).populate('user').populate('role').populate('assignedBy');

      if (!userRoles.length) {
        return res.status(404).json({ message: 'Roles not found for the user' });
      }

      res.status(200).json({
        message: 'Roles retrieved successfully',
        roles: userRoles,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
  assignRoleToUser: async (req, res) => {
    const { userId, roleId, adminId } = req.body; // Asumiendo que recibes userId, roleId y adminId en el cuerpo de la solicitud
  
    try {
      // Validar que se recibieron userId, roleId y adminId
      if (!userId || !roleId || !adminId) {
        return res
          .status(400)
          .json({
            error: "Missing userId, roleId, or adminId in request body",
          });
      }

      // Buscar el usuario y el rol en la base de datos
      const user = await User.findById(userId);
      const role = await Role.findById(roleId);

      // Verificar si el usuario y el rol existen
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }

      // Crear una nueva asignación de rol
      const userRole = new UserRole({
        user: user._id,
        role: role._id,
        assignedBy: user._id,
      });

      // Guardar la asignación de rol en la base de datos
      const savedUserRole = await userRole.save();

      // Responder con éxito
      res.status(201).json({
        message: "Role assigned successfully",
        userRole: savedUserRole,
      });
    } catch (error) {
      console.log(error);
      // Manejar errores específicos
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: errors });
      }
      console.error("Error assigning role:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  createUserWithProfile: async (req, res) => {
    try {
      const { username, email, password, roles, bio, profileImage, status } =
        req.body;
    } catch (error) {}
  },
  example: async (req, res) => {
    const user = req.user; // Usuario autenticado
    if (readPermissionSchemaUser.canRead(user)) {
      try {
        const users = await UserProfile.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
      }
    } else {
      res.status(403).json({ error: "No tienes permiso para ver usuarios" });
    }
  },
  // Ejemplo: función para obtener todos los usuarios
  getAllUsers: async (req, res) => {
    const user = req.user; // Usuario autenticado
    if (readPermissionSchemaUser.canRead(user)) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
      }
    } else {
      res.status(403).json({ error: "No tienes permiso para ver usuarios" });
    }
  },
  // Función para crear un nuevo usuario
  createUser: async (req, res) => {
    try {
      // Crear y guardar el usuario
      const newUser = new User(req.body); // Pasar directamente req.body
      const savedUser = await newUser.save();

      // Crear y guardar el perfil del usuario
      const newUserProfile = new UserProfile({
        user: savedUser._id,
        ...req.body, // Spread the rest of the profile data from req.body
      });
      const savedUserProfile = await newUserProfile.save();

      res.status(201).json({
        message: "User and profile created successfully",
        user: savedUser,
        userProfile: savedUserProfile,
      });
    } catch (error) {
      // Analiza el error para identificar la causa
      if (error.name === "ValidationError") {
        // El error es debido a una validación fallida
        // Puedes acceder a los detalles del error de validación
        const validationErrors = {};
        for (const field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
        return res
          .status(400)
          .json({ error: "Error de validación", details: validationErrors });
      } else if (error.code === 11000) {
        // El error es debido a un valor duplicado (índice único)
        return res
          .status(400)
          .json({
            error: "Error de duplicado",
            message: "El usuario o el correo electrónico ya existen.",
          });
      } else {
        // Maneja otros errores de manera genérica
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  },

  // Función para actualizar un usuario existente
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  },

  // Función para eliminar un usuario
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  },
  getAllUsersWithPagination: async (page, limit, filter) => {
    try {
      const skip = (page - 1) * limit;

      const query = User.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .select("username email roles bio profileImage createdAt");

      const users = await query.exec();

      return users;
    } catch (error) {
      throw new Error(
        `Error al obtener usuarios con paginación: ${error.message}`
      );
    }
  },

  // Otras funciones de controlador aquí
};

// Exporta el controlador
export default userController;
