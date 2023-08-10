import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, unique: true },
  Permissions: [],
});

RoleSchema.virtual('administrator', {
  ref: 'Administrator',
  localField: 'name',
  foreignField: 'role',
  justOne: false,
});

export const RoleModel = mongoose.model('Role', RoleSchema);
export const getRoleByName = (name: string) => RoleModel.findOne({ name });
export const getRoleById = (id: any) => RoleModel.findById(id);
export const createRole = (values: any) => RoleModel.create(values);

export default () => RoleModel.find();
