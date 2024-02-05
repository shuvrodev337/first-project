// student.service.ts-> Handles the business logic like Database interaction.

import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.doesUserExist(studentData.id)) {
    // (Student model er sathe custom method add)
    throw new Error('User Already Exists');
  }
  const result = await Student.create(studentData); // Buil in static Method    ( model class er upor)

  // const student = new Student(studentData); // create instance
  // // custom instance method Add, (student instance er sathe custom method add)
  // if (await student.doesUserExist(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save(); // Built in instance Method    (provided by mongoose)

  return result;
};

const getStudentsFromDB = async () => {
  const allStudents = await Student.find();
  // const allStudents = await Student.aggregate([]);
  return allStudents;
};

const getSingleStudentFromDB = async (id: string) => {
  // const singleStudent = await Student.findOne({ id });
  const singleStudent = await Student.aggregate([{ $match: { id: id } }]);

  return singleStudent;
};
const deleteStudentFromDB = async (id: string) => {
  const singleStudent = await Student.updateOne({ id }, { isDeleted: true });
  // In real life , we should not delete a data , bcz it may cause inconsistency throughout the db.
  return singleStudent;
};

// To send service function to controller
export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
