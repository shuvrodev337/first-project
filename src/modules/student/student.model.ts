import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
import validator, { isAlpha, isEmail } from 'validator';
//2. Create a Schema corresponding to the document interface/type.

// Sub-schemas to refactor / clean our code
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true, // Removes blank spaces from before and after the input
    required: [true, 'First Name is required'], // custom error msg
    maxlength: [20, 'First Name cannot be more than 20 charecters.'],
    validate: {
      //  to define a validator function in mongoose, we have to use 'validate' property.
      // Custom validation wit validator function.
      validator: function (value: string) {
        // value-> the value of firstName that came from client
        const capitalizedFirstName =
          value.charAt(0).toUpperCase() + value.slice(1);
        return value === capitalizedFirstName;
      },
      message: '{VALUE} is not in cpitalized format',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'First Name cannot be more than 20 charecters.'],
    validate: {
      validator: (value: string) => isAlpha(value),
      // isAlpha function from validator package. We can use arrow function instead of normal function, cz we'll not have to use 'this' here.
      message: '{VALUE} is not valid',
    },
  },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,

    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// Main Schema, use Schema class from MOngoose, Pass a type as generic.
// Schema types starts with capital letter. required gulo specific kore deya jay.

const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'Id is required'], unique: true }, // String is an alternative(shorthand) for {type: String}
  // unique creates a mongodb index for id, to prevent duplicate id entry. need to restart the server to initialize.
  name: { type: userNameSchema, required: [true, 'Name is required'] }, // to validate the 'name' field
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: '{VALUE} is not valid email type',
    },
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'], // enum : one of the mentioned string literals , as value will be accepted
      message:
        "{VALUE} is not valid. The gender field can only be one of the following : 'male', 'female' or 'other'",
      // error message in case of wrong user input. we can access the user given input by {VALUE} inside  ' '
    },
    required: [true, 'Gender is required'], // error message in case gender field has not come
  },
  age: {
    type: Number,
  },
  dateOfBirth: { type: String, required: [true, 'Date Of Birth is required'] },
  avatar: { type: String },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
  },
  emmergencyContactNo: {
    type: String,
    required: [true, 'Emmergency contact is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  guardian: { type: guardianSchema, required: [true, 'Guardian is required'] },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian is required'],
  },
  profileImg: { type: String, required: [true, 'Profile Image is required'] },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active', //by default the value will be 'active'
  },
});

// 3. Create a Model.
// Making a model from studentSchema.
// call model from Mongoose, pass the type of the schema as generic,
// model takes two parameters. pass A name of the model and the schema as parameters.
// Mongoose will turn the name into plural, and make a collection in the db.here, the name of the collection will be 'students'
export const StudentModel = model<Student>('Student', studentSchema);
