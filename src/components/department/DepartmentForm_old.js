import React from 'react';
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Validation Schema of form components
const DepartmentSchema = Yup.object().shape({
    deptId: Yup.number()
        .positive('Must be a positive number'),
    name: Yup.string()
        .required('Required')
        .max(50, 'Maximum length exceeded (50 chars'),
    description: Yup.string()
        .notRequired()
        .max(250, 'Maximum length exceeded (250 chars')
});

const DepartmentForm = ({ department }) => (
    <div className="app">
        <h2>Department Form</h2>
        <Formik
            enableReinitialize
            initialValues={department}
            validationSchema={DepartmentSchema}
            onSubmit={(values, { setSubmitting }) => {
                // insert logic to PUT entry to backend service (useEffect)
                // changed entry must be updated in the departments list
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
                            <label htmlFor="deptId">Department ID</label>
                            <input
                                type="deptId"
                                name="deptId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.deptId}
                                className={
                                    errors.deptId && touched.deptId
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="deptId" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="name">Department Name</label>
                            <input
                                type="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={
                                    errors.name && touched.name
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                rows='2'
                                type="description"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                className={
                                    errors.description && touched.description
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="description" />
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
DepartmentForm.propTypes = {
    department: PropTypes.shape({
        deptId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
    })
}

export default DepartmentForm;