// config/index.js

// Importa y exporta la configuración de la base de datos desde otro archivo (database.js, por ejemplo)
import database from '../config/database.js'
console.log(database.connection);
// Otras configuraciones pueden importarse aquí y exportarse de la misma manera

export default database
