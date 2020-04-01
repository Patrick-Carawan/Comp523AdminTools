import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const StudentProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticatedAsStudent()) {
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
                if (auth.isAuthenticatedAsAdmin()) {
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