import React, { useEffect, useContext } from 'react';
import { Formik, ErrorMessage } from 'formik'
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"
import { AuthContext } from "../../providers/authProvider";

import * as Yup from 'yup';

// this must be replaced with a real fetch for departments
import { departments } from '../../data.json'

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
  const { employee, isUpdating, isDeleting, error } = state;
  const authContext = useContext(AuthContext);

  // effect hook to update a employee entry
  useEffect(() => {
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
        }).then(resp => resp.json())
          .then(data => {
            dispatch({
              type: "UPDATE_EMPLOYEE_SUCCESS",
              payload: data
            })
          })
          .catch(error => dispatch({
            type: "EMPLOYEE_ERROR",
            payload: error
          }));
      }
    }
  }, [isUpdating, authContext, dispatch])

  // effect hook to delete an employee entry
  useEffect(() => {
    if (isDeleting) {
      // alert(JSON.stringify(department, null, 2));
      if (authContext.isAuthenticated()) {
        const url = process.env.REACT_APP_EMPLOYEE_SERVICE + '/' + employee.empId.toString();
        fetch(url, {
          method: 'DELETE',
          body: JSON.stringify(employee),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': 'Bearer ' + authContext.getAccessToken()
          }
        }).then(resp => resp.json())
          .then(data => {
            dispatch({
              type: "DELETE_EMPLOYEE_SUCCESS",
              payload: employee.empId
            })
          })
          .catch(error => dispatch({
            type: "EMPLOYEE_ERROR",
            payload: error
          }));
      }
    }
  }, [isDeleting, authContext, dispatch])

  function deleteEmployee(e) {
    dispatch({
      type: "DELETE_EMPLOYEE",
    });
  }

  return (
    <div className="app">
      <h2>Employee Form</h2>
      <Formik
        enableReinitialize
        initialValues={employee}
        validationSchema={EmployeeSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch({
            type: "UPDATE_EMPLOYEE",
            payload: values
          });
          setSubmitting(false);
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
                readOnly
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deptId}
                className={
                  errors.deptId && touched.deptId
                    ? "text-input error"
                    : "text-input"
                }>
                {departments.map((department) => (
                  <option key={department.deptId} value={department.deptId}>
                    {department.name}
                  </option>
                ))}
              </select>
              <div className="input-feedback">
                <ErrorMessage name="deptId" />
              </div>
            </div>
            <p />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
            <button type="reset" disabled={isSubmitting} className={'button reset'}>
              Reset
            </button>
            <button type="button" disabled={isSubmitting} onClick={deleteEmployee} className={'button delete'}>
              Delete
            </button>
          </form>
        )}
      </Formik>
      { error &&
        <div>
          <FaExclamationCircle />&nbsp;{error.message}
        </div>
      }
      { !error && isUpdating &&
        <div>
          <FaSpinner />&nbsp;Updating employee data...
        </div>
      }
      { !error && isDeleting &&
        <div>
          <FaSpinner />&nbsp;Deleting employee data...
        </div>
      }
    </div>
  );
}