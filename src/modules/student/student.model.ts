import { Schema, model } from 'mongoose';
import {
  // StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import { isAlpha, isEmail } from 'validator';
import bcrypt from 'bcrypt';
import config from '../../app/config';

//2. Create a Schema corresponding to the document interface/type.

// Sub-schemas to refactor / clean our code
const userNameSchema = new Schema<TUserName>({
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
const guardianSchema = new Schema<TGuardian>({
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
const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    // Schema class er generic e custom static er khetre 2ta parameter, custom iunstance er khetre 3ta.
    id: { type: String, required: [true, 'Id is required'], unique: true }, // String is an alternative(shorthand) for {type: String}
    // unique creates a mongodb index for id, to prevent duplicate id entry. need to restart the server to initialize any new index.
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password cannot be more than 20 charecters.'],
    },
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
    dateOfBirth: {
      type: String,
      required: [true, 'Date Of Birth is required'],
    },
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
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required'],
    },
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    // we can declare some options here,
    toJSON: {
      //  jehetu json data asteche , virtuals k true kore dao.
      virtuals: true, //
    },
  },
);

// studentSchema er Model er upor jokhon create() / save()  methods chalabo, then ei middlewares apply hobe

// pre save document middleware/hook
studentSchema.pre('save', async function (next) {
  // data save hobar age ei hook ta call hobe.
  // console.log(this, 'pre hook: we will save our data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // ekhane this reffers -> oi document ta jeta currently save hobe
  // hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/ hook
studentSchema.post('save', function (doc, next) {
  // data save hobar pore ei hook ta call hobe.
  // console.log(this, 'post hook: we saved our data'); // ekhane this/ doc -> updated document,j document ta jeta save hoyeche
  doc.password = '';
  next();
});

// pre find query middleware hook

// jodi delete howa document gulo find er khetre client k na pathate chai..->
studentSchema.pre('find', function (next) {
  // this-> here reffers to the current query.
  // purpose of this query-> we are giving the document which have isDeleted as false/ no isDeleted property,
  this.find({ isDeleted: { $ne: true } }); //  this query gets chained to the current query, and happens before the current query execution.

  // ekhane prothome e data ta filter hoye gelo, then oi filtered datar opor services er getStudentsFromDB function find chalabe.
  next();
});

//  jodi delete howa document findOne er khetre client k na pathate chai..->
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//  jodi delete howa document aggregate er khetre client k na pathate chai..->
studentSchema.pre('aggregate', function (next) {
  // her this reffers the current pipeline
  // console.log(this.pipeline()); // returns [ { '$match': { id: 'clien-hit-id' } } ] so we have to add another match before current $match, to filter findOne operation through aggregate too
  // bcz this.pipeline() gives an array we can push (unShift) another $match before current $match, as 1st element
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  //  the aggregate will look like -> [ { '$match': { isDeleted: {$ne: true} } },{ '$match': { id: 'clien-hit-id' } } ]
  // jehetu aggregate one ar aggregate all er khetre array e dibe, so alda kore findOne er moto onno kono aggregate er dorkar pore na.ei khanei sob type aggregation handle hoye jabe.

  next();
});

// mongoose virtuals
//  virtual takes the property that we want to show to client, and a get method that takes a callback wher we can set the value of that property derived from 'this', which reffers to current document.
// by default virtguals on thake na, schemar sathe arekta object option hisebe on korte hoy.
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Creating a custom static method

studentSchema.statics.doesUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// creating a custom instance method // schemar sathe method define kora jay methods property diye

// studentSchema.methods.doesUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

// 3. Create a Model.
// Making a model from studentSchema.
// call model from Mongoose, pass the type of the schema as generic,
// model takes two parameters. pass A name of the model and the schema as parameters.
// Mongoose will turn the name into plural, and make a collection in the db.here, the name of the collection will be 'students'
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
