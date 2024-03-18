import axios from "axios";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  NavDropdown,
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
import baseURL from "../../Service/Url";
import Contactlist from "../contact/Contactlist";
import logo from "./../../assets/images/logo.png";
import FirstNavbar from "./FirstNavbar";
import SideBar from "./SideBar";
export default function Main() {
  const [countList, setCountList] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      axios({
        mathod: "GET",
        url: `${baseURL}/count`,
      })
        .then((res) => {
          if (res.status == 200) {
            setCountList(res?.data);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
    fetchMyAPI();
  }, []);

  return (
    <>
      <div>
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container">
            <FirstNavbar />
            <div className="row my-1">
              {countList.map((ele) => (
                <div className="col-md-4 my-1">
                  <Card className="">
                    <Card.Body>
                      <Card.Title className="fs-2">
                        <div className="row">
                          <div className="col-md-9">
                            <b>
                              {" "}
                              {ele._id == "subscribe" ? <b>Subscribe</b> : ""}
                              {ele._id == "career" ? <b>Career</b> : ""}
                              {ele._id == "news" ? <b>News</b> : ""}
                              {ele._id == "products" ? <b>Products</b> : ""}
                              {ele._id == "createjob" ? <b>Jobs</b> : ""}
                              {ele._id == "responsibility" ? (
                                <b>Responsibility</b>
                              ) : (
                                ""
                              )}{" "}
                              {ele._id == "applyjob" ? <b>Apply job</b> : ""}
                              {ele._id == "joinus" ? <b>Join us</b> : ""}
                              {ele._id == "contactus" ? <b>Contact us</b> : ""}
                              {ele._id == "managemenet" ? <b> Team</b> : ""}
                              {ele._id == "reports" ? (
                                <b>Annual Reports</b>
                              ) : (
                                ""
                              )}{" "}
                              {ele._id == "treatment" ? <b> Treatment</b> : ""}
                              {ele._id == "awards" ? <b> Awards</b> : ""}
                              {ele._id == "management" ? (
                                <b> Management</b>
                              ) : (
                                ""
                              )}
                              {ele._id == "blogs" ? <b> Blogs</b> : ""}
                              {ele._id == "enquiry" ? <b> Enquiry</b> : ""}
                              {ele._id == "director" ? <b> Director</b> : ""}
                              {ele._id == "faq" ? <b> FAQ</b> : ""}
                            </b>
                          </div>
                          <div className="col-md-3">
                            <AiOutlineShoppingCart className="fs-1" />
                          </div>
                        </div>
                      </Card.Title>
                      <Card.Text>{ele.count}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            <div className="row"></div>
          </div>
        </div>
      </div>
    </>
  );
}
