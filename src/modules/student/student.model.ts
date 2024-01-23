import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

//2. Create a Schema corresponding to the document interface/type.

// Sub-schemas to refactor / clean our code
const userSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  ocpation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Main Schema, use Schema class from MOngoose, Pass a type as generic.
// Schema types starts with capital letter. required gulo specific kore deya jay.

const studentSchema = new Schema<Student>({
  id: { type: String }, // String is an alternative(shorthand) for {type: String}
  name: userSchema,
  email: { type: String, required: true },
  gender: ['male', 'female'],
  age: Number,
  dateOfBirth: { type: String, required: true },
  avatar: { type: String },
  contactNo: { type: String, required: true },
  bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'], // enum
  emmergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

// 3. Create a Model.
// Making a model from studentSchema.
// call model from Mongoose, pass the type of the schema as generic,
// model takes two parameters. pass A name of the model and the schema as parameters.
// Mongoose will turn the name into plural, and make a collection in the db.here, the name of the collection will be 'students'
export const StudentModel = model<Student>('Student', studentSchema);
