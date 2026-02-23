import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";



export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { isLogin, setLogin ,userData} = useContext(authContext);

  

  const navigate = useNavigate()

  function logOut() {
    setLogin(null);
    localStorage.removeItem('token')
    navigate('/')
  }

  const links = ["Home"];

  const auths = [
    { path: "/", link: "Login" },
    { path: "/register", link: "Register" },
  ];

  const menuItems = ["Profile", "Home", "Login", "Register", "Log Out"];

  return (
    <Navbar
      maxWidth="xl"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
         
          <p className="font-bold text-inherit">Social App</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          
          <NavLink to={'/home'} className="font-bold text-inherit">Social App</NavLink>
        </NavbarBrand>

       {
        isLogin &&<>
        <NavLink to={'/profile'} className={`flex gap-4 items-center`}>
          <span>{userData?.name}</span>
          <img  src={userData?.photo} alt="Profile" className="w-8 h-8 rounded-full" />
        </NavLink>
        </>
       }
      </NavbarContent>

      {!isLogin && (
        <NavbarContent justify="end" className="hidden sm:flex gap-4">
          {auths.map((link) => (
            <NavbarItem key={link}>
              <NavLink color="foreground" to={`${link.path}`}>
                {link.link}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {isLogin && (
        <NavbarContent justify="end" className="hidden sm:flex gap-4">
          <NavbarItem>
            <p className="cursor-pointer" onClick={logOut}>LogOut</p>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              to={`/${item}`}
              size="lg"
            >
              {item}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
