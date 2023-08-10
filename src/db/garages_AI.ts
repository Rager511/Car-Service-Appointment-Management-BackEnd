import mongoose from 'mongoose';

const garageAISchema = new mongoose.Schema({
    _id: String,
    garage_id: String,
    team: [],
    branches: [],
    services: [],
    reviews: [],
});

export const GarageAIModel = mongoose.model('GarageAI', garageAISchema);

export const getGarageAI = () => GarageAIModel.find();
export const getGarageAIByEmail = (email:string) => GarageAIModel.findOne({ email });
export const getGarageAIBySessionToken = (sessionToken:any) =>
  GarageAIModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getGarageAIById = (id:any) => GarageAIModel.findById(id);
export const createGarageAI = (values:any) => GarageAIModel.create(values);
export const deleteGarageAIById = (id:any) => GarageAIModel.findByIdAndDelete(id);
export const updateGarageAIById = (id:any, values: mongoose.UpdateQuery<{ education: mongoose.Types.DocumentArray<any> | any[] | { [x: string]: any; }[] | any[]; experience: { tasks: { id?: string; title?: string; dateBegin?: string; dateEnd?: string; description?: string; }[]; id?: string; garageId?: string; jobTitle?: string; dateBegin?: string; dateEnd?: string; }[]; _id?: string; user_id?: string; label?: string; title?: string; }>) => GarageAIModel.findByIdAndUpdate(id, values);
