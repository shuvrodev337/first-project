// Doc-  https://mongoosejs.com/docs/typescript.html
// Interface -> Schema -> Model -> DbQuery

import { Model } from 'mongoose';

// 1. Create types/ interface representing a document in MongoDB.

// Sub types
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// Main type
export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  dateOfBirth: string;
  avatar?: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  emmergencyContactNo: string;
  presentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// use 1 or 2

//1. For creating custom static method

export interface StudentModel extends Model<TStudent> {
  doesUserExist(id: string): Promise<TStudent | null>;
}

//2. For creating custom instance method

// custom instance method
// Put all user instance methods in this interface:
// export type StudentMethods = {
//   doesUserExist(id: string): Promise<TStudent | null>;
// };

// Create a new Model type that knows about StudentMethods...
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
