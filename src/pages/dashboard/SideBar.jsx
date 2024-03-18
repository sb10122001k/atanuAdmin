import { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Offcanvas,
} from "react-bootstrap";
import {
  AiFillAppstore,
  AiFillDatabase,
  AiOutlineRise,
  AiFillSignal,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Contactlist from "../contact/Contactlist";
import logo from "./../../assets/images/xacco-logo.png";
function SideBar() {
  const handelClick = () => { };
  return (
    <div>
      {" "}
      <div className="bg-light">
        <img src={logo} width="80%" height="80%" className="m-auto" />
      </div>
      <div>
        <p className=" cursor fs-5">
{/*          <Link to="/career-list">Booking </Link>
*/}          <Link to="/booking">Booking </Link>

        </p>
        
        <p className=" cursor fs-5">
         {/* <Link to="/blog-list" className="">
            City{" "}
          </Link>*/}
          <Link to="/city" className="">
          City{" "}
        </Link>
        </p>
        <p className=" cursor fs-5">
         {/* <Link to="/career-list" className="">
            University{" "}
          </Link>*/}
          <Link to="/university" className="">
          University{" "}
        </Link>
        </p>
       {/* <p className=" cursor fs-5">
          <Link to="/SubscribeList"> Property </Link>
        </p>*/}
        <p className=" cursor fs-5">
        <Link to="/property"> Property </Link>
      </p>
       {/* <p className=" cursor fs-5">
          <Link to="/contact-list"> Contact Us</Link>
        </p>*/}

      </div>
    </div>
  );
}

export default SideBar;
