import React from 'react';
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {departments} from '../data.json'

// add the "please select" department to the list
departments.push({"deptId": 0, "deptName": "Please select...", "deptDescription": ""})

// Validation Schema of form components
const EmployeeSchema = Yup.object().shape({
  empId: Yup.number()
    .positive('Must be a positive number'),
  lastName: Yup.string()
    .required('Required')
    .max(50, 'Maximum length exceeded (50 chars)'),
  firstName: Yup.string()
    .max(50, 'Maximum length exceeded (50 chars)'),
  deptId: Yup.number()
    .positive('Please select a department')
});

const EmployeeForm = (props) => (
  <div className="app">
    <h2>Employee Form</h2>
    <Formik
      enableReinitialize
      initialValues={props.employee}
      validationSchema={EmployeeSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
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
              <label htmlFor="lastName">Lastname</label>
              <input
                type="lastName"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                className={
                  errors.lastName && touched.lastName
                    ? "text-input error"
                    : "text-input"
                }
              />
              <div className="input-feedback">
                <ErrorMessage name="lastName" />
              </div>
            </div>
            <p />
            <div className="form-group">
              <label htmlFor="firstName">Firstname</label>
              <input
                type="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                className={
                  errors.firstName && touched.firstName
                    ? "text-input error"
                    : "text-input"
                }
              />
              <div className="input-feedback">
                <ErrorMessage name="firstName" />
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
                    {department.deptName}
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
          </form>
        )}
    </Formik>
  </div>
);

// Use PropTypes to type-check property arguments for component
EmployeeForm.propTypes = {
  employee: PropTypes.shape({
    empId: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    deptId: PropTypes.number.isRequired
  })
}

export default EmployeeForm;