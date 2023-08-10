import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: String },
  information: {
    type: { type: String },
    UserAgent: { type: String },
    basic: {
      searchname: { type: String },
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
    multiMedia: [
      {
        id: { type: String },
        name: { type: String },
        about: { type: String },
        type: { type: String },
        url: { type: String },
      },
    ],
    address: [
      {
        id: { type: String },
        type: { type: String },
        city: { type: String },
        country: { type: String },
        neighborhood: { type: String },
        codepostal: { type: String },
        address: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        default: { type: String },
        status: { type: String },
      },
    ],
    loginCredentials: {
      loginAuthentication: { type: String },
      username: { type: String },
      password: { type: String },
      bearerId: { type: String },
      internToken: { type: String },
      externToken: { type: String },
      mailBackup: { type: String },
      secretQuestions: [
        {
          question: { type: String },
          answer: { type: String },
        },
      ],
    },
    phone: [
      {
        id: { type: String },
        countryCode: { type: String },
        number: { type: String },
        type: { type: String },
        default: { type: String },
        status: { type: String },
      },
    ],
    mail: [
      {
        id: { type: String },
        email: { type: String },
        type: { type: String },
        default: { type: String },
        status: { type: String },
      },
    ],
    socialnetwork: [
      {
        id: { type: String },
        icon: { type: String },
        title: { type: String },
        url: { type: String },
        type: { type: String },
        label: { type: String },
        status: { type: String },
      },
    ],
    language: [
      {
        languageCode: { type: String },
        default: { type: String },
      },
    ],
    privacy: { type: String },
  },
  userRole: { type: String },
  isProfessionalAccount: { type: String },
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
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken:any) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id:any) => UserModel.findById(id);
export const createUser = (values:any) => UserModel.create(values);
export const deleteUserById = (id:any) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id:any, values: mongoose.UpdateQuery<{ _id?: string; information?: { type?: string; }; userRole?: string; isProfessionalAccount?: string; accountStatus?: { status?: string; adminBlocked?: string; audienceSignal?: string; }; connect?: { status?: string; color?: string; connectDate?: { datetimeGMT?: string; datetimeUser?: string; timezones?: { zoneId?: string; zoneName?: string; gmtOffset?: string; gmtOffsetName?: string; }; }; }; dateCreate?: { datetimeGMT?: string; datetimeUser?: string; timezones?: { zoneId?: string; zoneName?: string; gmtOffset?: string; gmtOffsetName?: string; }; }; }>) =>
  UserModel.findByIdAndUpdate(id, values);
