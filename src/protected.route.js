import React from "react";
import { Route, Redirect } from "react-router-dom";

export const StudentProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (window.localStorage.getItem("studentUser")==="true") {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export const AdminProtectedRoute = ({
   component: Component,
   ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (window.localStorage.getItem("adminUser")==="true") {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};