// models/user/User.js

import database from '../../config/index.js';
import bcrypt from 'bcrypt';
import UserProfile from './UserProfile.js';
const {Schema} = database
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        const user = await this.constructor.findOne({ email: value });
        return !user;
      },
      message: 'El correo electrónico ya está en uso',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      enum: [
        "Driver",                      // Conductor de taxi
        "Passenger",                   // Pasajero
        "Dispatcher",                  // Despachador
        "Admin",                       // Administrador de la plataforma de taxis
        "FleetManager",                // Gerente de flota
        "CustomerSupport",             // Soporte al cliente
        "FinancialAnalyst",            // Analista financiero
        "MarketingSpecialist",         // Especialista en marketing
        "MaintenanceTechnician",       // Técnico de mantenimiento
        "SafetyInspector",             // Inspector de seguridad
      ],
    },
  ],

  bio: String,
  profileImage: String,
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
    enum: ['Active', 'Inactive', 'Suspended', 'PendingVerification', 'Banned'],
    default: 'PendingVerification',
  },
  // Otros campos relacionados con el usuario
  fillPercentage: Number, // Campo para almacenar el porcentaje de llenado
  missingFields: [String], // Campo para almacenar la lista de campos faltantes
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Middleware 'pre' para calcular el porcentaje de llenado antes de guardar prueba
userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;

  
  
  const excludedFields = ['updatedAt', 'updatedBy', 'createdAt', 'createdBy', '_id', 'roles', '__v', 'missingFields', 'fillPercentage'];
  const totalFields = Object.keys(userSchema.paths).filter((field) => !excludedFields.includes(field)).length;
  const filledFields = Object.keys(this._doc).filter((field) => !!this[field] && !excludedFields.includes(field)).length;
  const fillPercentage = (filledFields / totalFields) * 100;
  this.fillPercentage = fillPercentage;


  const missingFields = Object.keys(userSchema.paths)
    .filter((field) => !excludedFields.includes(field) && !this[field])
    .map((field) => field);

  this.missingFields = missingFields;
  
  next();
});



const User = database.model('User', userSchema);

export default User
