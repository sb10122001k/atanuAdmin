import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import axios from 'axios'
import baseURL from "../../Service/Url";
const BlogEnquiry = () => {
    const [ProductList, setPoductList] = useState([])
    const [reloadPage, setReloadPage] = useState(1)

    useEffect(() => {
        productsListApi()
    }, [reloadPage])

    /** Product List **/
    const productsListApi = () => {
        axios({
            mathod: "GET",
            url: `${baseURL}/category/enquiry`,
        }).then((res) => {
            if (res.status == 200) {
                setPoductList(res.data)
            }
        }).catch((err) => {
            console.log(err, 'err');
        })
    }


    return (
        <div>
            <div>
                <div class="sidebar">
                    <SideBar />
                </div>

                <div class="content">
                    <div className="container ">
                        <FirstNavbar />

                        <div className="row my-2">
                            <div className="col-md-3">
                                <h3>
                                    <b> Blog Enquiry </b>
                                </h3>
                            </div>
                            <div className="col-md-4 text-end">
                                <button type="button" className="btn btn-outline-success mx-1">
                                    <Link to="/blog-add">Add Product </Link>
                                </button>
                                <button type="button" className="btn btn-outline-success mx-1">
                                    <Link to="/blog-list"> Product List</Link>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-success mx-1"
                                    disabled
                                >
                                    <Link to="/blog-enquiry"> Product Enquiry</Link>
                                </button>
                            </div>
                        </div>
                        <table className="table table-bordered w-100 my-2">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Full Name</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ProductList.map((ele, ind) => {
                                        return (
                                            <tr>
                                                <th>{ind + 1}</th>
                                                <td>{ele.name} </td>
                                                <td>{ele.mobile_no}</td>
                                                <td>{ele.email}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogEnquiry;
