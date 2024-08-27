// models/Role.js
import database from '../../config/index.js';
const { Schema } = database;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  permissions: [{
    type: String,
    enum: [
      'createUser',
      'deleteUser',
      'updateUser',
      'viewReports',
      'manageRoles',
      'accessDashboard',
      'viewAnalytics',
      // Agrega aquí los permisos específicos que necesites
    ],
    required: true,
  }],
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
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  // Metadatos adicionales
  metadata: {
    type: Schema.Types.Mixed,
  },
  // Historial de cambios
  history: [{
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    modificationDate: {
      type: Date,
      default: Date.now,
    },
    changes: {
      type: String,
      required: true,
    },
  }],
});

const Role = database.model('Role', roleSchema);

export default Role;