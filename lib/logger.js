import { createLogger, transports, format } from "winston";
import chalk from "chalk";
import moment from "moment-timezone";
import syslog from "winston-syslog";
// Define la zona horaria de México
const mexicoTimeZone = "America/Mexico_City";

// Mapea cada nivel de registro a un estilo de color de chalk
const levelColors = {
  fatal: chalk.red,
  error: chalk.redBright,
  warn: chalk.yellowBright,
  notice: chalk.greenBright,
  info: chalk.whiteBright,
  verbose: chalk.cyanBright,
  debug: chalk.blueBright,
  silly: chalk.magentaBright,
};

// Define un formato personalizado para la salida a la consola (CLI)
const cliFormat = format.combine(
  format.timestamp({
    format: () => moment().tz(mexicoTimeZone).format("YYYY-MM-DD HH:mm:ss"),
  }),
  format.printf(({ level, message, timestamp }) => {
    console.log(level);
    const style = levelColors[level] ;

    return `${timestamp} ${style(level)}: ${style(message)}`;
  })
);

// Define un formato para los archivos de registro
const fileFormat = format.combine(
  format.timestamp({
    format: () => moment().tz(mexicoTimeZone).format("YYYY-MM-DD HH:mm:ss"),
  }),
  format.json()
);

const createFileLogger = (filename, level) => {
  return createLogger({
    level: level,
    format: fileFormat,
    defaultMeta: {
      service: "admin-service",
    },
    transports: [
      new transports.File({
        filename: `logs/${filename}.log`,
        level: level,
      }),
    ],
  });
};

const logger = createLogger({
  level: "silly", // Nivel de registro predeterminado
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: {
    service: 'admin-service',
  },
  transports: [
    // Transporte para registrar en la consola con formato CLI
    new transports.Console({ format: cliFormat }),

    // Transporte para registrar en un archivo de error
    createFileLogger("error", "error"),
    createFileLogger("access", "access"),
    createFileLogger("http", "http"),
    createFileLogger("info", "info"),
    createFileLogger("silly", "silly"),
    createFileLogger("verbose", "verbose"),
    createFileLogger("warn", "warn"),

    // Transporte para registrar en Syslog con formato RFC5424
    new syslog.Syslog({
      protocol: "udp4",
      host: "localhost", // Cambia esto al servidor Syslog adecuado
      port: 514, // Puerto estándar para Syslog
      app_name: "tu-aplicacion", // Cambia esto al nombre de tu aplicación
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
    }),
  ],
});


// Child logger específico para la configuración de la base de datos
const dbConfigLogger = createFileLogger("db-config", "info");

export { logger, dbConfigLogger };