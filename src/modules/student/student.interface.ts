// Doc-  https://mongoosejs.com/docs/typescript.html
// Interface -> Schema -> Model -> DbQuery

import { Schema, model, connect } from 'mongoose';

// 1. Create types/ interface representing a document in MongoDB.

// Sub types
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  ocpation: string;
  contactNo: string;
  address: string;
};

// Main type
export type Student = {
  id: string;
  name: UserName;
  email: string;
  gender: 'male' | 'memale';
  age: number;
  dateOfBirth: string;
  avatar?: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  emmergencyContactNo: string;
  presentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
