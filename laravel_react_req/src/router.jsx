import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import Users from './views/users.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import UserForm from './views/UserForm.jsx';
import Requisiciones from './views/requisiciones.jsx';
import RequisicionForm from './views/RequisicionForm.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/users/new",
                element: <UserForm key="UserCreate" />
            },
            {
                path: "/users/:id",
                element: <UserForm key="UserUpdate" />
            }, 
            {
                path: "/requisiciones",
                element: <Requisiciones />
            },
            {
                path: "/requisiciones/nueva",
                element: <RequisicionForm key="RequisicionCreate" />
            },
            {
                path: "/requisiciones/:id",
                element: <RequisicionForm key="RequisicionUpdate" />
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            
        ]
    }
]);

export default router;