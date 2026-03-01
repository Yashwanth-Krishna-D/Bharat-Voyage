import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  location: {
    label: String,
    displayName: String,
    lat: String,
    lon: String,
  },
  bio: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;