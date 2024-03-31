import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

export function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });

    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [token, setUser]);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.get('/logout').then(() => {
      setUser(null);
      setToken(null);
    });
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 w-full">
      {user && (
        <>
        <li>
          <Typography
            as="a"
            href="#"
            variant="paragraph"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            
            <a href="/users" className="flex items-center font-semibold hover:text-blue-gray-700">
              {user.name}
            </a>
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            variant="paragraph"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium hover:text-blue-gray-700"
          >
            
            <a href="#" className="flex items-center">
              usuarios
            </a>
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            variant="paragraph"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium hover:text-blue-gray-700"
          >
            
            <a href="#" className="flex items-center">
              requisiciones
            </a>
          </Typography>
        </li>

        </>

        
      )}
    </ul>
  );

  return (
    <div className="h-full px-8 mt-2 pt-2">
      <div className="flex items-center justify-between  text-gray-900 w-full"  >
        <Typography
          as="a"
          href="#"
          className="cursor-pointer font-semibold text-gray-950"
        >
          Requisiciones
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center">
          {user ? (
            <Button onClick={onLogout} variant="filled" size="sm" className="hidden lg:inline-block">
              <span>Cerrar sesión</span>
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="filled" size="sm" color="gray" className="hidden lg:inline-block">
                  <span>Iniciar sesión</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block text-gray-950"
                >
                  <span>Registrarse</span>
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav} className="">
        {!user ? (
          <div className="container mx-auto">
            {navList}
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <Button fullWidth variant="text" size="sm" className="text-gray-950">
                  <span>Iniciar sesión</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button fullWidth variant="gradient" size="sm" className="text-gray-950">
                  <span>Registrarse</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="container mx-auto">
            {navList}
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="filled" size="sm" onClick={onLogout} className="">
                <span>Cerrar sesión</span>
              </Button>
            </div>
          </div>
        )}
      </MobileNav>
    </div>
  );
}
