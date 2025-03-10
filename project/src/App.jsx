import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import './App.css';
import { authLogin, authLogout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        let isActive = true; // Prevent race conditions

        // Fetch the current user and update Redux state
        authService.getCurrentUser()
            .then((userData) => {
                if (!isActive) return; // Skip if component is unmounted
                if (userData) {
                    dispatch(authLogin(userData)); // Dispatch login action with user data
                } else {
                    dispatch(authLogout()); // Dispatch logout action if no user is found
                }
            })
            .catch((error) => {
                console.error("Error fetching current user:", error);
                dispatch(authLogout()); // Dispatch logout action on error
            })
            .finally(() => {
                if (isActive) setLoading(false); // Stop loading only if component is still mounted
            });

        // Cleanup function to prevent state updates after unmount
        return () => {
            isActive = false;
        };
    }, [dispatch]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-400">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );
    }

    // Render the app layout once authentication check is complete
    return (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet /> {/* Render nested routes */}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;