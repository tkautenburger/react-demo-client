import React, { useState, useEffect, useContext } from 'react'
import { Formik, ErrorMessage } from 'formik'
import {
  FaSpinner,
  FaExclamationCircle,
  FaTrash,
  FaSave,
  FaUndo,
  FaPlusCircle
} from "react-icons/fa"
import { MdCancel } from "react-icons/md"
import { AuthContext } from "../../providers/authProvider"
import { ConfirmDelete } from "../dialog/ConfirmDelete"
import { Popup } from "../popup/Snackbar.js"

import * as Yup from 'yup';
import { IDENTITY_CONFIG } from '../../utils/authConst'

// this must be replaced with a real fetch for departments
// import { departments } from '../../data.json'

// add the "please select" department to the list
// departments.push({"deptId": 0, "name": "Please select...", "description": ""})

// Validation Schema of form components
const EmployeeSchema = Yup.object().shape({
  empId: Yup.number()
    .positive('Must be a positive number'),
  lastname: Yup.string()
    .required('Required')
    .max(50, 'Maximum length exceeded (50 chars)'),
  firstname: Yup.string()
    .max(50, 'Maximum length exceeded (50 chars)'),
  deptId: Yup.number()
    .positive('Please select a department')
});

export default function EmployeeForm({ state, dispatch }) {
  const { employee, selectedEmployee, departments, isUpdating, isDeleting, isAdding, isAddSubmit, error } = state;
  const authContext = useContext(AuthContext);
  const userRoles = authContext.parseJwt(authContext.getAccessToken()).resource_access[IDENTITY_CONFIG.client_id].roles;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmResult, setConfirmResult] = useState(false);
  const [popup, setPopup] = useState({ open: false, severity: "info", text: "", duration: 0 });

  // effect hook to load the current department list
  useEffect(() => {
    let errorText;
    // check if the user is authenticated before fetching the data
    // use the current access token to authenticate with the  
    // downstreamservice
    if (authContext.isAuthenticated()) {
      dispatch({ type: "FETCH_DEPTLIST_REQUEST" });

      fetch(process.env.REACT_APP_DEPARTMENT_SERVICE, {
        method: 'GET',
        headers: {
          'Content-Type': 'applicaton/json',
          'authorization': 'Bearer ' + authContext.getAccessToken()
        }
      }).then(resp => {
        if (!resp.ok) {
          if (!resp.statusText || resp.statusText === '') {
            errorText = 'HTTP Error';
          } else {
            errorText = resp.statusText;
          }
          console.log("Response status: ", resp.status, errorText);
          throw new Error(resp.status + ' - ' + errorText);
        }
        return resp.json()
      })
        .then(data => {
          dispatch({
            type: "FETCH_DEPTLIST_SUCCESS",
            payload: [...data, { "deptId": 0, "name": "Please select...", "description": "" }]
          })
        })
        .catch(error => dispatch({
          type: "EMPLOYEES_ERROR",
          payload: error
        }));
    }
  }, [authContext, employee, dispatch]);

  // effect hook to update a employee entry
  useEffect(() => {
    let errorText;
    if (isUpdating) {
      // alert(JSON.stringify(department, null, 2));
      if (authContext.isAuthenticated()) {
        const url = process.env.REACT_APP_EMPLOYEE_SERVICE + '/' + employee.empId.toString();
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(employee),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': 'Bearer ' + authContext.getAccessToken()
          }
        }).then(resp => {
          if (!resp.ok) {
            if (!resp.statusText || resp.statusText === '') {
              errorText = 'HTTP Error';
            } else {
              errorText = resp.statusText;
            }
            console.log("Response status: ", resp.status, errorText);
            throw new Error(resp.status + ' - ' + errorText);
          }
          return resp.json()
        })
          .then(data => {
            dispatch({
              type: "UPDATE_EMPLOYEE_SUCCESS",
              payload: data
            })
            setPopup({ open: true, severity: "success", text: "Employee updated", duration: 3000 });
          })
          .catch(error => {
            dispatch({
              type: "EMPLOYEES_ERROR",
              payload: error
            })
            setPopup({ open: true, severity: "error", text: "Error while updating", duration: 3000 });
          });
      }
    }
  }, [isUpdating, employee, authContext, dispatch])

  // effect hook to delete an employee entry
  useEffect(() => {
    let errorText;
    if (isDeleting) {
      // alert(JSON.stringify(department, null, 2));
      if (authContext.isAuthenticated()) {
        const url = process.env.REACT_APP_EMPLOYEE_SERVICE + '/' + employee.empId.toString();
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Length': 0,
            'authorization': 'Bearer ' + authContext.getAccessToken()
          }
        }).then(resp => {
          if (!resp.ok) {
            if (!resp.statusText || resp.statusText === '') {
              errorText = 'HTTP Error';
            } else {
              errorText = resp.statusText;
            }
            console.log("Response status: ", resp.status, errorText);
            throw new Error(resp.status + ' - ' + errorText);
          }
          dispatch({
            type: "DELETE_EMPLOYEE_SUCCESS",
            payload: employee.empId
          })
          setPopup({ open: true, severity: "success", text: "Employee deleted", duration: 3000 });
        }).catch(error => {
          dispatch({
            type: "EMPLOYEES_ERROR",
            payload: error
          })
          setPopup({ open: true, severity: "error", text: "Error while deleting", duration: 3000 });
        });
      }
    }
  }, [isDeleting, employee.empId, authContext, dispatch])

  // effect hook to add a new employee entry
  useEffect(() => {
    let errorText;
    if (isAddSubmit) {
      // alert(JSON.stringify(employee, null, 2));
      if (authContext.isAuthenticated()) {
        const url = process.env.REACT_APP_EMPLOYEE_SERVICE;
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(employee),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': 'Bearer ' + authContext.getAccessToken()
          }
        }).then(resp => {
          if (!resp.ok) {
            if (!resp.statusText || resp.statusText === '') {
              errorText = 'HTTP Error';
            } else {
              errorText = resp.statusText;
            }
            console.log("Response status: ", resp.status, errorText);
            throw new Error(resp.status + ' - ' + errorText);
          }
          return resp.json()
        })
          .then(data => {
            dispatch({
              type: "ADD_EMPLOYEE_SUCCESS",
              payload: data
            })
            setPopup({ open: true, severity: "success", text: "Employee added", duration: 3000 });
          })
          .catch(error => {
            dispatch({
              type: "EMPLOYEES_ERROR",
              payload: error
            })
            setPopup({ open: true, severity: "error", text: "Error while adding", duration: 3000 });
          });
      }
    }
  }, [isAddSubmit, employee, authContext, dispatch])

  useEffect(() => {
    if (confirmResult) {
      dispatch({
        type: "DELETE_EMPLOYEE"
      });
      setConfirmResult(false);
    }
  }, [confirmResult, dispatch])

  function deleteEmployee(e) {
    setConfirmOpen(true);
  }

  function addEmployee(e) {
    // this clears the fields in the form and
    // enables the employee ID field for input
    dispatch({
      type: "ADD_EMPLOYEE"
    });
  }

  function cancelAdd(e) {
    dispatch({
      type: "ADD_EMPLOYEE_CANCEL",
      payload: selectedEmployee
    });
    setPopup({ open: true, severity: "warning", text: "Operation canceled", duration: 3000 });

  }

  function isAdmin() {
    return userRoles.includes(process.env.REACT_APP_ROLE_ADMIN)
}

  return (
    <div className="app">
      { isAdmin() &&
        <button type="button" disabled={isAdding}
          onClick={addEmployee}
          className={'button add'}>
          <FaPlusCircle style={{ marginRight: '0.5em' }} />Add
      </button>
      }
      {isAdding && <h2>New Employee</h2>}
      {!isAdding && <h2>Selected Employee</h2>}
      <Formik
        enableReinitialize
        initialValues={employee}
        validationSchema={EmployeeSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (isAdding) {
            dispatch({
              type: "ADD_EMPLOYEE_SUBMIT",
              payload: values
            });
          } else {
            dispatch({
              type: "UPDATE_EMPLOYEE",
              payload: values
            });
          }
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="form-group">
              <label htmlFor="empId">Employee ID</label>
              <input
                readOnly={!isAdding}
                type="empId"
                name="empId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.empId}
                className={
                  errors.empId && touched.empId
                    ? "text-input error"
                    : "text-input"
                }
              />
              <div className="input-feedback">
                <ErrorMessage name="empId" />
              </div>
            </div>
            <p />
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="lastname"
                name="lastname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                className={
                  errors.lastname && touched.lastname
                    ? "text-input error"
                    : "text-input"
                }
              />
              <div className="input-feedback">
                <ErrorMessage name="lastname" />
              </div>
            </div>
            <p />
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="firstname"
                name="firstname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                className={
                  errors.firstname && touched.firstname
                    ? "text-input error"
                    : "text-input"
                }
              />
              <div className="input-feedback">
                <ErrorMessage name="firstname" />
              </div>
            </div>
            <p />
            <div className="form-group">
              <label htmlFor="deptId">Department</label>
              <select
                type="deptId"
                name="deptId"
                disabled={!isAdmin}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deptId}
                className={
                  errors.deptId && touched.deptId
                    ? "text-input error"
                    : "text-input"
                }>
                {departments.sort((a, b) => a.deptId - b.deptId).map((department) => (
                  <option key={department.deptId} value={department.deptId}>
                    {department.deptId + ' - ' + department.name}
                  </option>
                ))}
              </select>
              <div className="input-feedback">
                <ErrorMessage name="deptId" />
              </div>
            </div>
            <p />
            { isAdmin() &&
              <button type="submit" disabled={isUpdating || isSubmitting}>
                <FaSave style={{ marginRight: '0.5em' }} />{isSubmitting ? 'Submitting' : 'Submit'}
              </button>
            }
            { isAdmin() && !isAdding &&
              <button type="reset" disabled={isUpdating || isSubmitting}
                className={'button reset'}>
                <FaUndo style={{ marginRight: '0.5em' }} />Reset
              </button>
            }
            { isAdmin() && isAdding &&
              <button type="button"
                onClick={cancelAdd}
                className={'button cancel'}>
                <MdCancel style={{ marginRight: '0.5em' }} />Cancel
              </button>
            }
            { isAdmin() &&
              <button type="button" disabled={isDeleting || isAdding}
                onClick={deleteEmployee}
                className={'button delete'}>
                <FaTrash style={{ marginRight: '0.5em' }} />Delete
              </button>
            }
          </form>
        )}
      </Formik>
      <Popup
        settings={popup} close={setPopup} />
      <ConfirmDelete
        title="Confirm Delete"
        text="Do you really want to delete this employee?"
        open={confirmOpen} setOpen={setConfirmOpen}
        result={confirmResult} setResult={setConfirmResult}
      />
      { error &&
        <div>
          <FaExclamationCircle style={{ marginRight: '1em' }} />{error.message}
        </div>
      }
      { !error && isUpdating &&
        <div>
          <FaSpinner style={{ marginRight: '1em' }} />Updating employee data...
        </div>
      }
      { !error && isDeleting &&
        <div>
          <FaSpinner style={{ marginRight: '1em' }} />Deleting employee data...
        </div>
      }
      { !error && isAddSubmit &&
        <div>
          <FaSpinner style={{ marginRight: '1em' }} />Adding employee data...
        </div>
      }
    </div>
  );
}