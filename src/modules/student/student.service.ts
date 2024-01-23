// student.service.ts-> Handles the business logic like Database interaction.

import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student); // query on Model of Mongoose, create is a mongoose query method

  return result;
};

const getStudentsFromDB = async () => {
  const allStudents = await StudentModel.find();
  return allStudents;
};

const getSingleStudentFromDB = async (id: string) => {
  const singleStudent = await StudentModel.findOne({ id });
  return singleStudent;
};

// To send service function to controller
export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getSingleStudentFromDB,
};
