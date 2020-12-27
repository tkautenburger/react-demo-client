import React, { useEffect, useContext } from "react"
import { Formik, ErrorMessage } from 'formik'
import { FaSpinner, FaExclamationCircle } from "react-icons/fa"
import { AuthContext } from "../../providers/authProvider";

import * as Yup from 'yup';

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

export default function DepartmentForm({ state, dispatch }) {
    const { department, isUpdating, isDeleting, error } = state;
    const authContext = useContext(AuthContext);

    // effect hook to update a department entry
    useEffect(() => {
        if (isUpdating) {
            // alert(JSON.stringify(department, null, 2));
            if (authContext.isAuthenticated()) {
                const url = process.env.REACT_APP_DEPARTMENT_SERVICE + '/' + department.deptId.toString();
                fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(department),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'authorization': 'Bearer ' + authContext.getAccessToken()
                    }
                }).then(resp => resp.json())
                    .then(data => {
                        dispatch({
                            type: "UPDATE_DEPARTMENT_SUCCESS",
                            payload: data
                        })
                    })
                    .catch(error => dispatch({
                        type: "DEPARTMENT_ERROR",
                        payload: error
                    }));
            }
        }
    }, [isUpdating, authContext, dispatch])

    // effect hook to delete a department entry
    useEffect(() => {
        if (isDeleting) {
            // alert(JSON.stringify(department, null, 2));
            if (authContext.isAuthenticated()) {
                const url = process.env.REACT_APP_DEPARTMENT_SERVICE + '/' + department.deptId.toString();
                fetch(url, {
                    method: 'DELETE',
                    body: JSON.stringify(department),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'authorization': 'Bearer ' + authContext.getAccessToken()
                    }
                }).then(resp => resp.json())
                    .then(data => {
                        dispatch({
                            type: "DELETE_DEPARTMENT_SUCCESS",
                            payload: department.deptId
                        })
                    })
                    .catch(error => dispatch({
                        type: "DEPARTMENT_ERROR",
                        payload: error
                    }));
            }
        }
    }, [isDeleting, authContext, dispatch])

    function deleteDepartment(e) {
        dispatch({
            type: "DELETE_DEPARTMENT",
        });
    }

    return (
        <div className="app">
            <h2>Department Form</h2>
            <Formik
                enableReinitialize
                initialValues={department}
                validationSchema={DepartmentSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch({
                        type: "UPDATE_DEPARTMENT",
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
                            <label htmlFor="deptId">Department ID</label>
                            <input
                                readOnly
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
                        <button type="button" disabled={isSubmitting} onClick={deleteDepartment} className={'button delete'}>
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
                    <FaSpinner />&nbsp;Updating department data...
                </div>
            }
            { !error && isDeleting &&
                <div>
                    <FaSpinner />&nbsp;Deleting department data...
                </div>
            }
        </div>
    );
}