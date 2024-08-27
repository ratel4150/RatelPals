import database from '../../config/index.js';
import bcrypt from 'bcrypt';
import User from './User.js';
const {Schema} = database


const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: String,
  lastName: String,
  fullName: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  address: {
    street: String,
    city: String,
    zipCode: String,
  },
  phoneNumbers: [
    {
      type: String,
    },
  ],
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: Date,
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // Campo de estado más complejo
  status: {
    type: String,
    enum: [
      "PendingVerification",         // Pendiente de verificación
      "Active",                     // Activo
      "Inactive",                   // Inactivo
      "Complete Profile",           // Perfil completo
      "Incomplete Profile",         // Perfil incompleto
      "Available for Service",      // Disponible para servicio
      "Not Available for Service",  // No disponible para servicio
      "Pending Interview",          // Pendiente de entrevista
      "Pending Job Assignment",     // Pendiente de asignación de trabajo
      "Assigned Job",               // Trabajo asignado
      "Job Completed",               // Trabajo completado
      "Pending Payment",            // Pendiente de pago
      "Payment Received",           // Pago recibido
      "Vehicle Maintenance",        // Mantenimiento de vehículo
      "On Break",                   // En pausa
      "On Duty",                    // En servicio
      "Off Duty",                   // Fuera de servicio
      // Agrega más estados según sea necesario para tu lógica de negocio
  ],
    default: 'PendingVerification',
  },
  // Otros campos relacionados con el perfil de usuario
});

const UserProfile = database.model('UserProfile', userProfileSchema);

export default UserProfile;
