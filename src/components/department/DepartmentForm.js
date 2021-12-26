import React, { useState, useEffect, useContext } from "react"
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

import * as Yup from 'yup'
import { IDENTITY_CONFIG } from '../../utils/authConst'

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
    const { department, selectedDepartment, isUpdating, isDeleting, isAdding, isAddSubmit, error } = state;
    const authContext = useContext(AuthContext);
    const userRoles = authContext.parseJwt(authContext.getAccessToken()).resource_access[IDENTITY_CONFIG.client_id].roles;

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmResult, setConfirmResult] = useState(false);
    const [popup, setPopup] = useState({ open: false, severity: "info", text: "", duration: 0 });

    // effect hook to UPDATE a department entry
    useEffect(() => {
        let errorText;
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
                }).then(data => {
                    dispatch({
                        type: "UPDATE_DEPARTMENT_SUCCESS",
                        payload: data
                    });
                    setPopup({ open: true, severity: "success", text: "Department updated", duration: 3000 });
                }).catch(error => {
                    dispatch({
                        type: "DEPARTMENTS_ERROR",
                        payload: error
                    })
                    setPopup({ open: true, severity: "error", text: "Error while updating", duration: 3000 });

                });
            }
        }
    }, [isUpdating, department, authContext, dispatch])

    // effect hook to DELETE a department entry
    useEffect(() => {
        let errorText;
        if (isDeleting) {
            // alert(JSON.stringify(department, null, 2));
            if (authContext.isAuthenticated()) {
                const url = process.env.REACT_APP_DEPARTMENT_SERVICE + '/' + department.deptId.toString();
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Length': '0',
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
                        type: "DELETE_DEPARTMENT_SUCCESS",
                        payload: department.deptId
                    })
                    setPopup({ open: true, severity: "success", text: "Department deleted", duration: 3000 });
                }).catch(error => {
                    dispatch({
                        type: "DEPARTMENTS_ERROR",
                        payload: error
                    })
                    setPopup({ open: true, severity: "error", text: "Error while deleting", duration: 3000 });
                });
            }
        }
    }, [isDeleting, department.deptId, authContext, dispatch])

    // effect hook to POST a new department entry
    useEffect(() => {
        let errorText;
        if (isAddSubmit) {
            // alert(JSON.stringify(department, null, 2));
            if (authContext.isAuthenticated()) {
                const url = process.env.REACT_APP_DEPARTMENT_SERVICE;
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(department),
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
                }).then(data => {
                    dispatch({
                        type: "ADD_DEPARTMENT_SUCCESS",
                        payload: data
                    })
                    setPopup({ open: true, severity: "success", text: "Department added", duration: 3000 });
                }).catch(error => {
                    dispatch({
                        type: "DEPARTMENTS_ERROR",
                        payload: error
                    })
                    setPopup({ open: true, severity: "error", text: "Error while adding", duration: 3000 });
                });
            }
        }
    }, [isAddSubmit, department, authContext, dispatch])

    useEffect(() => {
        if (confirmResult) {
            dispatch({
                type: "DELETE_DEPARTMENT"
            });
            setConfirmResult(false);
        }
    }, [confirmResult, dispatch])

    function addDepartment(e) {
        // this clears the fields in the form and
        // enables the department ID field for input
        dispatch({
            type: "ADD_DEPARTMENT"
        });
    }

    function cancelAdd(e) {
        dispatch({
            type: "ADD_DEPARTMENT_CANCEL",
            payload: selectedDepartment
        });
        setPopup({ open: true, severity: "warning", text: "Operation canceled", duration: 3000 });

    }

    function deleteDepartment(e) {
        setConfirmOpen(true);
    }

    function isAdmin() {
        return userRoles.includes(process.env.REACT_APP_ROLE_ADMIN)
    }
        
    return (
        <div className="app">
            { isAdmin() &&
                <button type="button" disabled={isAdding}
                    onClick={addDepartment}
                    className={'button add'}>
                    <FaPlusCircle style={{ marginRight: '0.5em' }} />Add
                </button>
            }
            {isAdding && <h2>New Department</h2>}
            {!isAdding && <h2>Selected Department</h2>}
            <Formik
                enableReinitialize
                initialValues={department}
                validationSchema={DepartmentSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (isAdding) {
                        dispatch({
                            type: "ADD_DEPARTMENT_SUBMIT",
                            payload: values
                        });
                    } else {
                        dispatch({
                            type: "UPDATE_DEPARTMENT",
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
                            <label htmlFor="deptId">Department ID</label>
                            <input
                                readOnly={!isAdding}
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
                                onClick={deleteDepartment}
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
                text="Do you really want to delete this department?"
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
                    <FaSpinner style={{ marginRight: '1em' }} />Updating department data...
                </div>
            }
            { !error && isDeleting &&
                <div>
                    <FaSpinner style={{ marginRight: '1em' }} />Deleting department data...
                </div>
            }
            { !error && isAddSubmit &&
                <div>
                    <FaSpinner style={{ marginRight: '1em' }} />Adding department data...
                </div>
            }
        </div>
    );
}