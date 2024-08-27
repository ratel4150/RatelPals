// models/UserRole.js
import database from '../../config/index.js';
const { Schema } = database;

const userRoleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  // Estado del rol asignado
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Revoked'],
    default: 'Active',
  },
  // Historial de cambios
  history: [
    {
      action: {
        type: String,
        enum: ['Assigned', 'Updated', 'Revoked'],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      performedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    }
  ],
});

// Middleware para manejar el historial
userRoleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.history.push({
      action: 'Assigned',
      performedBy: this.assignedBy,
    });
  } else {
    this.history.push({
      action: 'Updated',
      performedBy: this.assignedBy,
    });
  }
  next();
});

const UserRole = database.model('UserRole', userRoleSchema);

export default UserRole;