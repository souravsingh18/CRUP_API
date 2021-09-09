// groups
// {
//     _id:1;
//     groupName: "A",
//     studentEnrolledId: [1,2,3,...]
// }

// students
// {
//     _id: 1;
//     studentName: "xyz";
//     courseId: [1,2,3];

// }

// courses
// {
//     _id: 1;
//     courseName: "Math";
    // 1:few
//     teacherId: 1;
//     studentId: [1,2,3,...]
// }

// teachers
// {
//     _id: 1;
//     teacherName: "abc";
    // 1:few < 16MB
//     courseId: 1;
    // group: [1]
//     sudents: []
// }



// QUERY
// --------------------------------------------------------------------

// Q. find the subjects teach by teacherId: 1

// const a = teachers.find();
// a.students


//  db.students.aggregate([
//     {
//         $lookup: {
//             to: courses,
//             localFeild: "_id",
//             foriegnFeild: "",
//             as teacherDetails
//         }
//     }
// ])


// -----------------------------------------------------------------------

// course: -->
// {
//     "math",
//     "t1",
// }





// : express generator, structure, 

// 2 : schemas >>> mongoose >> with objectid ref

//  - student
//  - teacher
//  - subject


//  pwd ---> E7aizNCw34ZJJ3b

// -------------------------------------------------
//  students/getall

//----------------------------------------------------------------------------------------------------------------------
// Date --> 9/9/21
// required,
// unique,
// index
// enum
// populate
// find({}).populate('studentId').limit().skip()

// Promise.parallel
// Promise.all

// await user
// await stue
// await tea

//Read all this topic 
// [userres, stuere, testresult ]   = promiseall []

// asdf