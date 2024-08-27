import database from '../../config/index.js';
import SubmenuSchema from '../submenu/Submenu.model.js';

const {Schema} = database


const menuSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: String,
  active: {
    type: Boolean,
    default: false,
  },
  submenus: [SubmenuSchema],
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
});

  const Menu = database.model('Menu', menuSchema);

export default Menu;