// student.controller.ts-> Only handles request and response

import { Request, Response } from 'express';
import { StudentServices } from './student.service';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body; // destructure instead of req.body.student

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // Send response  ( can be sent in different format. but we'll follow below example).
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; // or const studentId = req.params.studentId  // query by sudent id not objecId
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
