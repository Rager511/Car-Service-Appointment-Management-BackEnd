import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const  DemandeSchema = new mongoose.Schema({
  utilisateur : {
      type_user: {
          type: String , 
          required: true,
          enum: ['Client','MV_Team'],
          enumerable: true},
      id_user: { type: Number, required: true },
      infos : {}
  },
  garageID: { type: mongoose.Schema.Types.ObjectId, ref: 'Garage' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group_Service' },
  serviceName : { type: mongoose.Schema.Types.String, ref: 'Group_Service' },
  date : { type: Date, default: Date.now },
  Description : { type: String },
  CodePromo : { type: String },
  infoService : {},
   status: { 
     type: String  ,
     enum: ['En attente', 'Confirmé', 'Annulé'],
     enumerable: true 
   },
   Price : { type: Number },
   PayementMethod : { 
      type: String  ,
      enum: ['Cash', 'Card', 'AjiPay'],
      enumerable: true 
    },
    isPayed : { type: Boolean, default: false },

});
DemandeSchema.virtual('group_service', {
  ref: 'Group_Service',
  localField: 'serviceName',
  foreignField: 'name',
  justOne: false,
});

 DemandeSchema.virtual('garage', {
  ref: 'Garage',
  localField: 'garageID',
  foreignField: '_id',
  justOne: false,
});

 DemandeSchema.virtual('group_service', {
  ref: 'Group_Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: false,
});

 DemandeSchema.set('toObject', { virtuals: true });
 DemandeSchema.set('toJSON', { virtuals: true });
export const  DemandeModel = mongoose.model(' Demande',  DemandeSchema);
export const getDemandes = () =>  DemandeModel.find().populate('user garage group_service');
export const getDemandeById = (id: string) =>  DemandeModel.findById(id).populate('user garage group_service');
export const createDemande = (values: Record<string, any>) => new  DemandeModel(values).save().then((appointment) => appointment.toObject());
export const deleteDemandeById = (id: string) =>  DemandeModel.findOneAndDelete({ _id: id });
export const updateDemandeById = (id: string, values: Record<string, any>) =>  DemandeModel.findByIdAndUpdate(id, values);
