import mongoose from 'mongoose';

const UserCVSchema = new mongoose.Schema({
    _id: String,
    user_id: String,
    label: String,
    title: String,
    education: [],
    experience: [
      {
        id: String,
        garageId: String,
        jobTitle: String,
        dateBegin: String,
        dateEnd: String,
        tasks: [
          {
            id: String,
            title: String,
            description: String,
            dateBegin: String,
            dateEnd: String
          }
        ]
      }
    ]
});

export const UserCVModel = mongoose.model('UserCV', UserCVSchema);

export const getUsersCV = () => UserCVModel.find();
export const getUserCVByEmail = (email:string) => UserCVModel.findOne({ email });
export const getUserCVBySessionToken = (sessionToken:any) =>
  UserCVModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserCVById = (id:any) => UserCVModel.findById(id);
export const createUserCV = (values:any) => UserCVModel.create(values);
export const deleteUserCVById = (id:any) => UserCVModel.findByIdAndDelete(id);
export const updateUserCVById = (id:any, values: mongoose.UpdateQuery<{ education: mongoose.Types.DocumentArray<any> | any[] | { [x: string]: any; }[] | any[]; experience: { tasks: { id?: string; title?: string; dateBegin?: string; dateEnd?: string; description?: string; }[]; id?: string; garageId?: string; jobTitle?: string; dateBegin?: string; dateEnd?: string; }[]; _id?: string; user_id?: string; label?: string; title?: string; }>) => UserCVModel.findByIdAndUpdate(id, values);
