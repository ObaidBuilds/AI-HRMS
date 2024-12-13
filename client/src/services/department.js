import axios from "axios";
import { configuration, URL } from "../utils";
import {
  failFetchingDepartments,
  setDepartment,
  startFetchDepartment,
  startAddDepartment,
  addDepartmentSuccess,
  addDepartmentFail,
  startEditDepartment,
  editDepartmentSuccess,
  editDepartmentFail,
  startDeleteDepartment,
  deleteDepartmentSuccess,
  deleteDepartmentFail,
} from "../store/slices/department";
import toast from "react-hot-toast";

// Fetch Departments
const getDepartments = async (dispatch) => {
  dispatch(startFetchDepartment());

  try {
    const { data } = await axios.get(`${URL}/departments`, configuration);
    dispatch(setDepartment(data.department));
  } catch (error) {
    dispatch(failFetchingDepartments());
    console.error(
      error.response?.data.message || "Failed to fetch departments"
    );
  }
};

// Add Department
const addDepartment = async (dispatch, department) => {
  dispatch(startAddDepartment());

  try {
    const { data } = await axios.post(
      `${URL}/departments`,
      department,
      configuration
    );
    dispatch(addDepartmentSuccess(data.department));
    toast.success(data.message);
  } catch (error) {
    dispatch(addDepartmentFail());
    toast.error(error.response?.data.message || "Failed to add department");
  }
};

// Edit Department
const editDepartment = async (dispatch, department) => {
  dispatch(startEditDepartment());

  try {
    const { data } = await axios.patch(
      `${URL}/departments/${id}`,
      department,
      configuration
    );
    dispatch(editDepartmentSuccess(data.department));
    toast.success(data.message);
  } catch (error) {
    dispatch(editDepartmentFail());
    toast.error(error.response?.data.message || "Failed to add department");
  }
};

// Delete Department
const deleteDepartment = async (dispatch, id) => {
  dispatch(startDeleteDepartment());

  try {
    const { data } = await axios.delete(
      `${URL}/departments/${id}`,
      configuration
    );
    dispatch(deleteDepartmentSuccess(data.department));
    toast.success(data.message);
  } catch (error) {
    dispatch(deleteDepartmentFail());
    toast.error(error.response?.data.message || "Failed to add department");
  }
};

export { getDepartments, addDepartment, editDepartment, deleteDepartment };
