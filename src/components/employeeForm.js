import React from 'react';
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Dummy option for departments

const options = [
  { id: 0, name: "Please select..."},
  { id: 4711, name: "Human Ressources"},
  { id: 4712, name: "IT Department"},
  { id: 4713, name: 'Marketing'}
];

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
  <div>
    <h1>Employee Form</h1>
    <Formik
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
        isSubmitting
      }) => (
          <form onSubmit={handleSubmit}>
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
                  errors.deptDescription && touched.deptDescription
                    ? "text-input error"
                    : "text-input"
                }>
                {options.map((option) => (
                  <option key={option.id } value={option.id}>{option.name}</option>
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