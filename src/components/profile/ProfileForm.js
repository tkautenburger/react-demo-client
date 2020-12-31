import React, { useContext, useEffect } from "react"
import { Formik, ErrorMessage } from 'formik'
import { AuthContext } from "../../providers/authProvider";

import * as Yup from 'yup';

// Validation Schema of form components
const ProfileSchema = Yup.object().shape({
    family_name: Yup.string()
        .notRequired(),
    given_name: Yup.string()
        .notRequired(),
    email: Yup.string()
        .required(),
    preferred_username: Yup.string()
        .required(),
    sub: Yup.string()
        .required(),
    access_token: Yup.string()
        .required(),
    id_token: Yup.string()
        .required(),
    session_state: Yup.string()
        .required(),
    roles: Yup.array().of(Yup.string())
});

export default function ProfileForm({ state, dispatch }) {
    const authContext = useContext(AuthContext);

    // get user data from session store on mount
    useEffect(() => {
        if (authContext.isAuthenticated()) {
            const user = authContext.getUserData();
            const accessToken = authContext.parseJwt(user.access_token);
            console.log("Access Token\n" + JSON.stringify(accessToken, null, 2));
            dispatch({
                type: "GET_USER",
                payload: { user, accessToken }
            })
        }
    }, [authContext, dispatch]);

    return (
        <div className="app">
            <h2>User Profile</h2>
            <Formik
                enableReinitialize
                initialValues={state}
                validationSchema={ProfileSchema}
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
                    <form>
                        <div className="form-group">
                            <label htmlFor="family_name">Family Name</label>
                            <input
                                readOnly
                                type="family_name"
                                name="family_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.family_name}
                                className={
                                    errors.family_name && touched.family_name
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="family_name" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="given_name">Given Name</label>
                            <input
                                readOnly
                                type="given_name"
                                name="given_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.given_name}
                                className={
                                    errors.given_name && touched.given_name
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="given_name" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                readOnly
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={
                                    errors.email && touched.email
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="preferred_username">Username</label>
                            <input
                                readOnly
                                type="preferred_username"
                                name="preferred_username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.preferred_username}
                                className={
                                    errors.preferred_username && touched.preferred_username
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="preferred_username" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="sub">User Subject UUID</label>
                            <input
                                readOnly
                                type="sub"
                                name="sub"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sub}
                                className={
                                    errors.sub && touched.sub
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="sub" />
                            </div>
                        </div>
                        <p />

                        <label >User Roles</label>
                        <ul>
                            {state.roles.map(role => (
                                <li key={role}>{role}</li>
                            ))}
                        </ul>

                        <p />
                        <div className="form-group">
                            <label htmlFor="access_token">Access Token</label>
                            <textarea
                                readOnly
                                rows='3'
                                type="access_token"
                                name="access_token"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.access_token}
                                className={
                                    errors.access_token && touched.access_token
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="access_token" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="id_token">ID Token</label>
                            <textarea
                                readOnly
                                rows='3'
                                type="id_token"
                                name="id_token"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.id_token}
                                className={
                                    errors.id_token && touched.id_token
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="id_token" />
                            </div>
                        </div>
                        <p />
                        <div className="form-group">
                            <label htmlFor="session_state">Session Token</label>
                            <input
                                readOnly
                                type="session_state"
                                name="session_state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.session_state}
                                className={
                                    errors.session_state && touched.session_state
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            <div className="input-feedback">
                                <ErrorMessage name="session_state" />
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}