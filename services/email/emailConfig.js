// src/services/email/emailConfig.js

export default {
    smtp: {
      host: 'smtp.example.com',        // Servidor SMTP
      port: 587,                       // Puerto SMTP
      secure: false,                   // Usar SSL/TLS (true o false)
      auth: {
        user: 'tu_correo@example.com', // Dirección de correo electrónico
        pass: 'tu_contraseña',         // Contraseña de la cuenta de correo
      },
    },
    from: 'tu_correo@example.com',     // Dirección "De" predeterminada para correos enviados
  };
  