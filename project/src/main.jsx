import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { Protected, Login } from './components/index.js';
import AddPost from './pages/AddPost';
import Signup from './pages/Signup';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import AllPosts from './pages/AllPosts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: (
                    <Protected authentication={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: '/signup',
                element: (
                    <Protected authentication={false}>
                        <Signup />
                    </Protected>
                ),
            },
            {
                path: '/all-posts',
                element: (
                    <Protected authentication={true}>
                        <AllPosts />
                    </Protected>
                ),
            },
            {
              path: '/add-post',
              element: (
                  <Protected authentication={true}>
                      <AddPost />
                  </Protected>
              ),
          },
            {
                path: '/edit-post/:slug',
                element: (
                    <Protected authentication={true}>
                        <EditPost />
                    </Protected>
                ),
            },
            {
                path: '/post/:slug',
                element: <Post />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);