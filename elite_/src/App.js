import React, { useState } from 'react';
import './App.css';
import { fetchStudentByRollNumber,fetchStudentsByCollege,fetchStudentsByCollegeAndDepartment} from './fetchD';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [collegeName, setCollegeName] = useState('');
  const [collegeName2, setCollegeName2] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const [error, setError] = useState('');
  // const sayHello = () => {
  // const getdet = async () => {
  //   const rest = await axios.get('http://localhost:5000')
  //     .then(response => {
  //       // Handle the API response here
  //       console.log('Response:', response.data);
  //       setStudentData(response.data);
  //     })
  //     .catch(error => {
  //       // Handle errors here
  //       console.error('Error:', error);
  //     });

  // };
  //   getdet();
  // }
  const fetchStudentDetails = () => {
    const getdet = async () => {
      const data = await fetchStudentByRollNumber(rollNumber);
      setStudentData(data);
      if (data.length !== 0) {
              setError('');
            } else {
              setStudentData(null);
              setError('Student not found');
            }
    }
    getdet();
  };

  const fetchAllStudentsByCollege = () => {
    if (collegeName.trim() === '') {
      setError('Please enter a valid college name');
      return;
    }
    const getdet = async () => {
        const data = await fetchStudentsByCollege(collegeName);
        setStudentData(data);
        if (data.length !== 0) {
          setStudentData(data);
          setError('');
        } else {
          setStudentData(null);
          setError('Student not found');
        }
    }
    getdet();
  };

  const fetchAllStudentsByCollegeAndDepartment = () => {
    if (collegeName2.trim() === '' || department.trim() === '') {
      setError('Please enter a valid college name and department');
      return;
    }
    const getdet = async () => {
        try {
          const data = await fetchStudentsByCollegeAndDepartment(collegeName2, department);
    
          if (data.length !== 0) {
            setStudentData(data);
            setError('');
          } else {
            setStudentData(null);
            setError('Student not found');
          }
        } catch (error) {
          setError('Error fetching student data by college and department');
        }
    }
    getdet();
  };
  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleCollegeNameChange = (event) => {
    setCollegeName(event.target.value);
  };
  const handleCollegeNameChange2 = (event) => {
    setCollegeName2(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleHover = (index) => {
    setTimeout(() => {
      const student = studentData[index]
      setHoveredStudent(student);
    }, 500);
  };
  const handleleft = (index) => {
    // const student = studentData[index];
    // const setter = {
    //   "roll_number": student.roll_number,
    //   "name": student.name
    // }
    setHoveredStudent(null);
  }
  return (
    <div className="container">
      <h1>Student Information</h1>
      {/* <button onClick={sayHello}>Fetch All</button> */}
      <section>
        <h2>Fetch Individual Student Data</h2>
        <div>
          <input
            type="String"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={handleRollNumberChange}
          />
          <button onClick={fetchStudentDetails}>Fetch Student</button>
        </div>
      </section>
      <section>
        <h2>Fetch All Students by College</h2>
        <div>
          <input
            type="text"
            placeholder="Enter College Name"
            value={collegeName}
            onChange={handleCollegeNameChange}
          />
          <button onClick={fetchAllStudentsByCollege}>Fetch Students</button>
        </div>
      </section>
      <section>
        <h2>Fetch All Students by College and Department</h2>
        <div>
          <input
            type="text"
            placeholder="Enter College Name"
            value={collegeName2}
            onChange={handleCollegeNameChange2}
          />
          <input
            type="text"
            placeholder="Enter Department"
            value={department}
            onChange={handleDepartmentChange}
          />
          <button onClick={fetchAllStudentsByCollegeAndDepartment}>Fetch Students</button>
        </div>
      </section>
      {studentData && studentData.length === 1 && (
        <section>
          <h2>Student Details</h2>
          <div className="student">
            <span>Roll Number: {studentData[0].roll_number}</span>
            <span>Name: {studentData[0].name}</span>
            <span>Email: {studentData[0].email}</span>
            <span>College: {studentData[0].college}</span>
            <span>Department: {studentData[0].department}</span>
          </div>
        </section>
      )}
      {studentData && studentData.length > 1 && (
        <section>
          <h2>Student List</h2>
          {studentData.map((student, index) => (
            <div
              key={student.roll_number}
              className="student"
              onMouseEnter={() => { handleHover(index) }}
              onMouseLeave={() => { handleleft(index) }}
            >
              <span>{student.roll_number}</span>
              <span>{student.name}</span>
              
              {hoveredStudent && hoveredStudent.roll_number === student.roll_number && (
                    <div className="student-group">
                      <span>Email: {student.email}</span>
                      <span>College: {student.college}</span>
                      <span>Department: {student.department}</span>
                    </div>
                  )}
            </div>
          ))}
        </section>
      )}
      {error && (
        <div className="error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default App;
