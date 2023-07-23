import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchStudentByRollNumber = async (rollNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roll_no`, {
      params: { roll_number: rollNumber },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};
export const fetchStudentsByCollege = async (collegeName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/college`, {
      params: { college: collegeName },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching student data by college:', error);
    throw error;
  }
};
export const fetchStudentsByCollegeAndDepartment = async (collegeName, department) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clgAndDept`, {
      params: { college: collegeName, department },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching student data by college and department:', error);
    throw error;
  }
};