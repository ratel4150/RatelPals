import database from '../../config/index.js';

const { Schema } = database;

const SubmenuSchema = new Schema({
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
});

export default SubmenuSchema;