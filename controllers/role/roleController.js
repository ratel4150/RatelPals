import models from '../../models/index.js';
const {Role} = models
const roleController = {
   
    // Ejemplo: función para obtener todos los usuarios
    getAllRoles: async (req, res) => {
      const role = req.user; // Usuario autenticado
 /*      if (readPermissionSchemaUser.canRead(user)) { */
        try {
          const roles = await Role.find();
          res.json(roles);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener roles' });
        }
        
     /*  } else {
        res.status(403).json({ error: 'No tienes permiso para ver usuarios' });
        
      } */
     
    },
    // Función para crear un nuevo usuario
    createRole: async (req, res) => {
      try {
        
         // Crear y guardar el usuario
      const newRole = new Role(req.body); // Pasar directamente req.body
      const savedRole = await newRole.save();
  
      // Crear y guardar el perfil del usuario
      
  
      res.status(201).json({
        message: 'Role created successfully',
        role: savedRole,
     
      });
      } catch (error) {
        // Analiza el error para identificar la causa
        if (error.name === 'ValidationError') {
          // El error es debido a una validación fallida
          // Puedes acceder a los detalles del error de validación
          const validationErrors = {};
          for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message;
          }
          return res.status(400).json({ error: 'Error de validación', details: validationErrors });
        } else if (error.code === 11000) {
          // El error es debido a un valor duplicado (índice único)
          return res.status(400).json({ error: 'Error de duplicado', message: 'El usuario o el correo electrónico ya existen.' });
        } else {
          // Maneja otros errores de manera genérica
          console.error(error);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
      }
    },
  
    // Función para actualizar un usuario existente
  /*   updateRole: async (req, res) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      }
    },
   */
    // Función para eliminar un usuario
  /*   deleteRole: async (req, res) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
      }
    },
    getAllRoleWithPagination: async (page, limit, filter) => {
      try {
        const skip = (page - 1) * limit;
  
        const query = User.find(filter)
          .skip(skip)
          .limit(parseInt(limit))
          .select('username email roles bio profileImage createdAt');
  
        const users = await query.exec();
  
        return users;
      } catch (error) {
        throw new Error(`Error al obtener usuarios con paginación: ${error.message}`);
      }
    }, */
  
  
  };
  
  // Exporta el controlador
  export default roleController