import React from 'react';
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import PropTypes from 'prop-types';

// Validation Schema of form components
const DepartmentSchema = Yup.object().shape({
    deptId: Yup.number()
        .positive('Must be a positive number'),
    deptName: Yup.string()
        .required('Required')
        .max(50, 'Maximum length exceeded (50 chars'),
    deptDescription: Yup.string()
        .notRequired()
        .max(250, 'Maximum length exceeded (250 chars')
});

const DepartmentForm = (props) => (
    <div>
        <h1>Department Form</h1>
        <Formik
            initialValues={props.department}
            validationSchema={DepartmentSchema}
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
                            <label htmlFor="deptName">Department Name</label>
                            <input
                                type="deptName"
                                name="deptName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.deptName}
                                className={
                                    errors.deptName && touched.deptName
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="deptName" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="deptDescription">Description</label>
                            <textarea
                                rows='2'
                                type="deptDescription"
                                name="deptDescription"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.deptDescription}
                                className={
                                    errors.deptDescription && touched.deptDescription
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="deptDescription" />
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
        deptName: PropTypes.string.isRequired,
        deptDescription: PropTypes.string
    })
}

export default DepartmentForm;