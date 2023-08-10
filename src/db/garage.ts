import mongoose from 'mongoose';

const GarageSchema = new mongoose.Schema({
  information: {
    typePage: { type : String } ,
    typeCreation: { type : String },
    garageType: { type : String },
    basic: {
      name: { type : String },
      nickname: { type : String },
      nicknameCode: { type : String },
      abbreviation: { type : String },
      about: { type : String },
      avatarImg: { type : String },
      coverImg: { type : String },
      categorie: { type : String },
      title: { type : String }
    },
    website: { type : String },
    address: {
      id: { type : String },
      city: { type : String },
      country: { type : String },
      neighborhood: { type : String },
      codepostal: { type : String },
      address: { type : String },
      latitude: { type : String },
      longitude: { type : String },
      default: { type : String },
      status: { type : String }
    },
    admin: {
      _id: { type : String },
      date: { type : String },
      code: { type : String }
    }
  },
  garageStatus: {
    status: { type : String },
    garageLocked: { type : String },
    adminBlocked: { type : String },
    audienceSignal: { type : String }
  },
  dateCreate: {
    datetimeGMT: { type : String },
    datetimeUser: { type : String },
    timezones: {
      zoneId: { type : String },
      zoneName: { type : String },
      gmtOffset: { type : String },
      gmtOffsetName: { type : String }
    }
  }
});

export const GarageModel = mongoose.model('Garage', GarageSchema);
export const getGarages = () => GarageModel.find();
export const getGarageById = (id:string) => GarageModel.findById(id);
export const getGarageByName = (name:string) => GarageModel.findOne( {"information.basic.name": name});
export const createGarage = (values:any) => GarageModel.create(values);
export const deleteGarageById = (id:string) => GarageModel.findOneAndDelete({ _id: id });
export const updateGarageById = (id:string, values: mongoose.UpdateQuery<{ services: mongoose.Types.ObjectId[]; name?: string; address?: string; phone?: string; mechanics?: string; information?: string; garageStatus?: { status?: string; garageLocked?: string; adminBlocked?: string; audienceSignal?: string; }; dateCreate?: { datetimeGMT?: string; datetimeUser?: string; timezones?: { zoneId?: string; zoneName?: string; gmtOffset?: string; gmtOffsetName?: string; }; }; }>) => GarageModel.findByIdAndUpdate(id, values);
