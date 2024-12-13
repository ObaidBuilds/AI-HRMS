import axios from "axios";
import { configuration, URL } from "../utils";
import {
  failFetchingRoles,
  setRoles,
  startFetchRoles,
  startAddRole,
  addRoleSuccess,
  addRoleFail,
  startEditRole,
  editRoleSuccess,
  editRoleFail,
  startDeleteRole,
  deleteRoleSuccess,
  deleteRoleFail,
} from "../store/slices/role";
import toast from "react-hot-toast";

// Fetch Roles
const getRoles = async (dispatch) => {
  dispatch(startFetchRoles());

  try {
    const { data } = await axios.get(`${URL}/roles`, configuration);
    dispatch(setRoles(data.role));
  } catch (error) {
    dispatch(failFetchingRoles());
    console.error(error.response?.data.message || "Failed to fetch roles");
  }
};

// Add Role
const addRole = async (dispatch, role) => {
  dispatch(startAddRole());

  try {
    const { data } = await axios.post(`${URL}/roles`, role, configuration);
    dispatch(addRoleSuccess(data.role));
    toast.success(data.message)
  } catch (error) {
    dispatch(addRoleFail());
    toast.error(error.response?.data.message || "Failed to add role");
  }
};

// Edit Role
const editRole = async (dispatch, id, role) => {
  dispatch(startEditRole());

  try {
    const { data } = await axios.patch(
      `${URL}/roles/${id}`,
      role,
      configuration
    );
    dispatch(editRoleSuccess(data.role));
    toast.success(data.message)
  } catch (error) {
    dispatch(editRoleFail());
    toast.error(error.response?.data.message || "Failed to edit role");
  }
};

// Delete Role
const deleteRole = async (dispatch, id) => {
  dispatch(startDeleteRole());

  try {
    const { data } = await axios.delete(`${URL}/roles/${id}`, configuration);
    dispatch(deleteRoleSuccess(data.role));
    toast.success(data.message)
  } catch (error) {
    dispatch(deleteRoleFail());
    toast.error(error.response?.data.message || "Failed to delete role");
  }
};

export { getRoles, addRole, editRole, deleteRole };
