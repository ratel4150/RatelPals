
import models from '../../models/index.js';
const {Menu} = models
import Joi from 'joi';


const menuController = {
  getMenus: async (req, res) => {
    try {
      // Obtiene todos los menús de la base de datos
      const menus = await Menu.find();

      // Responde con la lista de menús
      res.json(menus);
    } catch (error) {
      // Maneja otros errores de manera genérica
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  // Función para crear un nuevo menú
  createMenu: async (req, res) => {
    try {
      // Define el esquema de validación con Joi
      const menuSchema = Joi.object({
        title: Joi.string().required(),
        link: Joi.string().required(),
        icon: Joi.string(),
        submenus: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            link: Joi.string(),
            icon: Joi.string(),
          })
        ),
      });

      // Valida los datos del menú
      const { error, value } = menuSchema.validate(req.body, { abortEarly: false });

      if (error) {
        // Si hay errores de validación, responde con un error 400 y detalles de validación
        return res.status(400).json({ error: 'Error de validación', details: error.details });
      }

      // Crea un nuevo menú con los datos validados
      const newMenu = new Menu(value);

      // Guarda el menú en la base de datos
      await newMenu.save();

      // Responde con el menú recién creado
      res.json(newMenu);
    } catch (error) {
      // Maneja otros errores de manera genérica
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

export default menuController;