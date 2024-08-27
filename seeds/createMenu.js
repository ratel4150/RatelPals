import mongoose from "mongoose";
import models  from "../models/index.js";
const {Menu}=models
export const createMenu = async () => {
    
        const menu = new Menu({
            _id: new mongoose.Types.ObjectId("668eea62e8cc804c5bf8e8db"),
            title: "Configuración",
            link: "/settings",
            icon: "settings-icon",
            active: false,
            submenus: [
              {
                title: "Configuración General",
                link: "settings/general",
                icon: "general-icon",
                active: false,
              },
              {
                title: "Perfil de Usuario",
                link: "account",
                icon: "profile-icon",
                active: false,
              },
              {
                title: "Configuración de la App",
                link: "settings/app",
                icon: "app-icon",
                active: false,
              },
              {
                title: "Seguridad",
                link: "settings/security",
                icon: "security-icon",
                active: false,
              },
              {
                title: "Notificaciones",
                link: "settings/notifications",
                active: false,
              },
              {
                title: "Integraciones",
                link: "settings/integrations",
                icon: "integrations-icon",
                active: false,
              },
              {
                title: "Gestión de Permisos",
                link: "settings/permissions",
                icon: "permissions-icon",
                active: false,
              },
              {
                title: "Configuración de Alertas",
                link: "settings/alerts",
                icon: "alerts-icon",
                active: false,
              },
            ],
            createdAt: new Date(),
          })
    
          const savedMenu = await menu.save();
          console.log("Menú creado:", savedMenu);
        
          // Retorna el menú guardado
          return savedMenu;
  };