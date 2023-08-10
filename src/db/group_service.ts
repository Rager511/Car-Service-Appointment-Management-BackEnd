import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const GroupServiceSchema: Schema = new Schema({
  _id: { type: String },
  icon: { type: String },
  name: { type: String },
  businessname: { type: String },
  abbreviation: { type: String },
  description: { type: String },
  services: {type: Array},
});

export const GroupServiceModel = mongoose.model('GroupService', GroupServiceSchema);

export const getGroupServices = () => GroupServiceModel.find();
export const getGroupServiceById = (id: string) => GroupServiceModel.findById(id);
export const createGroupService = (values: Record<string, any>) => GroupServiceModel.create(values);
export const deleteGroupServiceById = (id: string) => GroupServiceModel.findByIdAndDelete(id);
export const updateGroupServiceById = (id: string, values: Record<string, any>) => GroupServiceModel.findByIdAndUpdate(id, values);