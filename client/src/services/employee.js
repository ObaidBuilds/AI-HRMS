import axios from "axios";
import { configuration, URL } from "../utils";
import {
  failFetchingEmployeeById,
  startFetchingEmployeeById,
  setEmployeeById,
  failFetchingEmployees,
  startFetchingEmployees,
  setEmployees,
  startAddingEmployee,
  addEmployeeSuccess,
  failAddingEmployee,
  startEditingEmployee,
  editEmployeeSuccess,
  failEditingEmployee,
  startDeletingEmployee,
  deleteEmployeeSuccess,
  failDeletingEmployee,
} from "../store/slices/employee";
import toast from "react-hot-toast";

// Fetch all employees
const getAllEmployees = async (dispatch, currentPage, filters) => {
  const { department, role, status } = filters;

  dispatch(startFetchingEmployees());

  try {
    const queryParams = new URLSearchParams({
      page: currentPage,
      department: department || "",
      role: role || "",
      status: status || "",
    }).toString();

    const { data } = await axios.get(`${URL}/employees?${queryParams}`, {
      withCredentials: true,
    });

    dispatch(setEmployees(data));
  } catch (error) {
    dispatch(failFetchingEmployees());
    console.error(error.response?.data.message || "Client : " + error.message);
  }
};

// Fetch a single employee by ID
const getEmployeeById = async (dispatch, id) => {
  dispatch(startFetchingEmployeeById());

  try {
    const { data } = await axios.get(`${URL}/employees/${id}`, {
      withCredentials: true,
    });
    dispatch(setEmployeeById(data.employee));
  } catch (error) {
    dispatch(failFetchingEmployeeById());
    console.error(error.response?.data.message || "Client : " + error.message);
  }
};

// Create a new employee
const addEmployee = async (dispatch, employee) => {
  dispatch(startAddingEmployee());

  try {
    const { data } = await axios.post(
      `${URL}/employees`,
      employee,
      configuration
    );
    dispatch(addEmployeeSuccess(data.employee));
    toast.success(data.message);
  } catch (error) {
    dispatch(failAddingEmployee());
    toast.error(error.response?.data.message || "Client : " + error.message);
  }
};

// Update an existing employee
const editEmployee = async (dispatch, navigate, id, employee) => {
  dispatch(startEditingEmployee());

  try {
    const { data } = await axios.patch(
      `${URL}/employees/${id}`,
      employee,
      configuration
    );
    dispatch(editEmployeeSuccess(data.employee));
    navigate("/hrms/employees");
    toast.success(data.message);
  } catch (error) {
    dispatch(failEditingEmployee());
    toast.error(error.response?.data.message || "Client : " + error.message);
  }
};

// Delete an employee
const deleteEmployee = async (dispatch, id) => {
  dispatch(startDeletingEmployee());

  try {
    const { data } = await axios.delete(
      `${URL}/employees/${id}`,
      configuration
    );
    dispatch(deleteEmployeeSuccess(id));
    window.location.reload();
    toast.success(data.message);
  } catch (error) {
    dispatch(failDeletingEmployee());
    toast.error(error.response?.data.message || "Client : " + error.message);
  }
};

export {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  editEmployee,
  deleteEmployee,
};
