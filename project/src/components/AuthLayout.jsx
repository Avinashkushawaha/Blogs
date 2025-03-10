import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const isMounted = useRef(true); // Track component mount state

    useEffect(() => {
        // Cleanup function to handle unmounting
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        // Only proceed if component is mounted
        if (!isMounted.current) return;

        console.log("Final check - authentication:", authentication, "authStatus:", authStatus);

        if (authStatus === undefined || authStatus === null) return;

        // 1. Authentication REQUIRED but user NOT logged in
        if (authentication && !authStatus) {
            console.log("ProtectedRoute: Redirecting to login");
            navigate("/login", { state: { from: window.location.pathname }, replace: true });
        }
        // 2. Authentication NOT REQUIRED but user IS logged in
        else if (!authentication && authStatus) {
            console.log("ProtectedRoute: Redirecting to home");
            navigate("/", { replace: true });
        }
        // 3. Allowed access
        else {
            console.log("ProtectedRoute: Allowing access");
            setLoader(false);
        }

    }, [authStatus, navigate, authentication]);

    return loader ? (
        <div className="loading-container">
            <h1>Checking authentication...</h1>
            <div className="spinner"></div>
        </div>
    ) : <>{children}</>;
};

export default React.memo(Protected);