import mongoose from 'mongoose';

const AdministratorSchema = new mongoose.Schema({
  _id: { type: String },
  information: {
    Admin_type: { type: String },
    UserAgent: { type: String },
    location: { type: String },
    settings: {},
    email: { type: String },
    basic: {
      profilePic: { type: String }, 
      username: { type: String },
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      fullName: { type: String },
      abbreviation: { type: String },
      nickname: { type: String },
      nicknameCode: { type: String },
      about: { type: String },
      gender: { type: String },
      birthday: { type: String },
      avatarImg: { type: String },
      coverImg: { type: String },
    },
    authentication: {
      password: { type: String, required: true },
      salt: { type: String },
      sessionToken: { type: String, select: false },
    },
    phone: {
      id: { type: String },
      countryCode: { type: String },
      number: { type: String },
    },
    language: [
      {
        languageCode: { type: String },
        default: { type: String },
      },
    ],
  },
  department: { type: String },
  role: { type: String },
  socialLinks: [
     {
      platform: { type: String },
      url: { type: String },
    },
  ],
  accountStatus: {
    status: { type: String },
    adminBlocked: { type: String },
    audienceSignal: { type: String },
  },
  
  connect: {
    status: { type: String },
    color: { type: String },
    connectDate: {
      datetimeGMT: { type: String },
      datetimeUser: { type: String },
      timezones: {
        zoneId: { type: String },
        zoneName: { type: String },
        gmtOffset: { type: String },
        gmtOffsetName: { type: String },
      },
    },
  },
  dateCreate: {
    datetimeGMT: { type: String },
    datetimeUser: { type: String },
    timezones: {
      zoneId: { type: String },
      zoneName: { type: String },
      gmtOffset: { type: String },
      gmtOffsetName: { type: String },
    },
  },
  employmentStartDate: { type: Date },
  employmentEndDate: { type: Date },
  LoginHistory: [
    {
      date_history: { type: Date },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  failedLoginAttempts: { type: Number, default: 0 },
  workSchedule: { type: String },
  emergencyContact: {
    name: { type: String },
    phoneNumber: { type: String },
  },
  logHistory: [
    {
      action: { type: String },
      timestamp: { type: Date },
    },
  ],
});

AdministratorSchema.set('timestamps', true);

export const AdministratorModel = mongoose.model('Administrator', AdministratorSchema);
export const getAdministrators = () => AdministratorModel.find();
export const getAdministratorbyEmail = (email:string) => AdministratorModel.findOne({'information.email': email});
export const getAdministratorbySessionToken = (sessionToken:string) => AdministratorModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getAdministrator = (id: string) => AdministratorModel.findById(id).populate('garage');
export const createAdministrator = (values: Record<string, any>) => new AdministratorModel(values).save().then((admin) => admin.toObject());
export const deleteAdministratorById = (id: string) => AdministratorModel.findOneAndDelete({ _id: id });
export const updateAdministratorById = (id: string, values: Record<string, any>) => AdministratorModel.findByIdAndUpdate(id, values);
export const updateAdministratorSessionTokenById = (id: string, sessionToken: string) => AdministratorModel.findByIdAndUpdate(id, { 'authentication.sessionToken': sessionToken });
export const updateAdministratorPasswordById = (id: string, password: string, salt: string) => AdministratorModel.findByIdAndUpdate(id, { 'authentication.password': password, 'authentication.salt': salt });