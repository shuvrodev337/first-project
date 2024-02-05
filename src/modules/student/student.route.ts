// student.routes.ts->  Only Handles the routes
import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router(); // gives router object ,so that we can apply get,post,patch,put,delete on that object

//  '/api/v1/students' is the root route for student related routes
//  Here we can handle get/post/patch/put/delete requests.

//  When client hit post request at '/api/v1/students/create-student', will call the createStudent controller function,
router.post('/create-student', StudentController.createStudent);

// When client hit get request at 'api/v1/students' , will call the getAllStudents controller function
router.get('/', StudentController.getAllStudents);

// When client hit get request at 'api/v1/students/:studentId' , will call the getSingleStudent controller function
router.get('/:studentId', StudentController.getSingleStudent);

// When client hit delete request at 'api/v1/students/:studentId' , will call the deleteStudent controller function

router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router; // Do not need to send in an object, bcz router itself is an object
