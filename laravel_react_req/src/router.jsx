import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import Users from './views/users.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import UserForm from './views/UserForm.jsx';
import Requisiciones from './views/requisiciones.jsx';
import RequisicionForm from './views/RequisicionForm.jsx';
import Pagina404 from './views/Pagina404.jsx';
import LandingPage from './views/LandingPage.jsx';

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

            {
                path: "*",
                element: <Pagina404 />
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/landing",
                element: <LandingPage />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },

            {
                path: "*",
                element: <Pagina404 />
            }

        ]
    }
]);

export default router;