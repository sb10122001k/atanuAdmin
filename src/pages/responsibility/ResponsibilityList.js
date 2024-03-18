import React, { useEffect, useState } from "react";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from 'axios'
import baseURL from "../../Service/Url";
import { Modal, Button, Row, Form, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyStatefulEditor from "../Components/RichText";
import { AgGridReact } from "ag-grid-react";
import htmlToDraft from 'html-to-draftjs';


function ResponsibilityList() {

    const [ProductList, setPoductList] = useState([])
    const [reloadPage, setReloadPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState()

    const [updateMemberForm, setupdateMemberForm] = useState({
        heading: '',
        text: '',
        image: '',
    })
    const [file, setFile] = useState({
        image: ''
    })
    const [fileErrors, setFileErrors] = useState({
        image: ''
    })

    const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
        heading: '',
        text: '',
        image: '',
    })

    useEffect(() => {
        productsListApi()
    }, [reloadPage])

    /** Product List **/
    const productsListApi = () => {
        axios({
            mathod: "GET",
            url: `${baseURL}/category/responsibility`,
        }).then((res) => {
            if (res.status == 200) {
                setRowData(res.data)
            }
        }).catch((err) => {
            console.log(err, 'err');
        })
    }

    /* list */
    const [deleleId, setDelelete] = useState('')
    const handleDelete = (ele) => {
        setShowDelete(true)
        setDelelete(ele)
    }

    const [showDelete, setShowDelete] = useState(false)
    const handleDeleteClose = () => {
        setShowDelete(false)
    }

    const handleDeleteClear = () => {
        setShowDelete(false)
    }

    const handleDeleteSubmit = () => {
        setLoader(true)
        axios.delete(`${baseURL}/${deleleId.id}`, {
            // headers: {
            //   Authorization: `Bearer ${token}`
            // },
        }).then((res) => {
            if (res.status == 200) {
                toast.success('Successfully Deleted')
                setLoader(false)
                setReloadPage(reloadPage + 1)
                setShowDelete(false)
            }
        }).catch((err) => {
            console.log(err, '222');
            if (err.response.status == 401) {
                toast.error('Token is Expaired')
                setLoader(false)
                setReloadPage(reloadPage + 1)
                setShowDelete(false)
            }
        })
    }

    const handleClose = () => {
        setShow(false);
    }

    /* update */
    const [updateID, setUpdateId] = useState('')
    const [show, setShow] = useState(false);

    /** handle Change **/
    const handleChange = (event) => {
        if (event.target.name == 'image') {
            setFile({
                ...file, [event.target.name]: event?.target?.files[0]
            })
            setFileErrors({
                ...file,
                image: ""
            })
        } else {
            setupdateMemberForm({
                ...updateMemberForm, [event.target.name]: event.target.value
            })
        }
        setupdateMemberFormErrors({
            ...updateMemberFormErrors, [event.target.name]: null
        })
    }


    const handleUpdate = (ele) => {
        setShow(true)
        setupdateMemberForm({
            ...updateMemberForm,
            heading: ele.title,
            text: ele.description,
            image: ''
        })
        setShow(true)
        setUpdateId(ele)
    }

    /** Form Validation **/

    // const handleValidation = () => {
    // const textReg = /[A-Za-z]/
    // const newErros = {}
    // const { heading, text } = updateMemberForm
    // const { image } = file
    // if (!heading) {
    //     newErros.heading = 'please enter name'
    // } else if (heading && !textReg.test(heading)) {
    //     newErros.heading = 'numbers is not allowed'
    // }
    // else if (heading && heading.length > 50) {
    //     newErros.name = 'name should be below 50 charecters'
    // }

    // if (!text) {
    //     newErros.text = 'please enter disignation'
    // } else if (text && !textReg.test(text)) {
    //     newErros.text = 'numbers is not allowed'
    // }
    // else if (text && text.length > 50) {
    //     newErros.text = 'disignation should be below 50 charecters'
    // }
    // if (!image) {
    //   newErros.image = 'please select file'
    // }
    // return newErros
    // }


    const handleSubmit = () => {
        // const handleValidationObject = handleValidation()
        // if (Object.keys(handleValidationObject).length > 0) {
        //     setupdateMemberFormErrors(handleValidationObject)
        // } else {
        setLoader(true)
        let formData = new FormData();
        formData.append("category", 'responsibility');
        formData.append("title", updateMemberForm.heading);
        formData.append("description", updateMemberForm.text);
        formData.append("image", file.image);

        // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        axios({
            url: `${baseURL}/${updateID.id}`,
            method: "PUT",
            data: formData,
        }).then((res) => {
            if (res.status == 200) {
                setReloadPage(reloadPage + 1)
                setShow(false)
                toast.success('Successfully Updated Meamber')
                setLoader(false)
                setupdateMemberForm({
                    ...updateMemberForm,
                    name: '',
                    surname: '',
                    disignation: '',
                })
                setFile({
                    ...file,
                    image: ''
                })
                setFileErrors({
                    ...fileErrors,
                    image: ''
                })
            }
        })
            .catch((err) => {
                if (err.response.status == 401) {
                    setReloadPage(reloadPage + 1)
                    setShow(false)
                    toast.error('Token is Expaired')
                    setLoader(false)
                    setupdateMemberForm({
                        ...updateMemberForm,
                        name: '',
                        surname: '',
                        disignation: '',
                    })
                    setFile({
                        ...file,
                        image: ''
                    })
                    setFileErrors({
                        ...fileErrors,
                        image: ''
                    })
                }
            });
        // }
    }

    const handleClear = () => {
        setupdateMemberForm({
            ...updateMemberForm,
            heading: '',
            text: '',
            image: '',
        })
        setFile({
            ...file,
            image: ''
        })
        setFileErrors({
            ...fileErrors,
            image: ''
        })
    }
    const handleData = (value) => {
        // setRichTextdata(value)
        setupdateMemberForm({
            ...updateMemberForm, ['text']: value
        })
        setupdateMemberFormErrors({
            ...updateMemberFormErrors, ['text']: null
        })
    }

    /***** Pagenation Table******/
    const rowHeight = 50;
    const DefaultColumnSetting = {
        sortable: true,
        filter: true,

        floatingFilter: true,
        flex: 1,
        resizable: true,
        minWidth: 120,
    };

    const [colDefs, setColDefs] = useState([
        {
            headerName: "Id",
            valueGetter: "node.rowIndex + 1",
            filter: true,
            lockPosition: true,
        },
        {
            headerName: "Responsibility Heading",
            filter: true,
            field: "title",
        },
        // {
        //     headerName: "Responsibility Text",
        //     filter: true,
        //     field: "description",
        // },
        {
            headerName: "Responsibility Text",
            filter: true,
            cellRendererFramework: (params) => (
                <center>
                    <p>{JSON.stringify(htmlToDraft(params.data.description).contentBlocks[0].text)}</p>
                </center>
            ),
        },
        {
            headerName: "Responsibility Image",
            filter: false,
            cellRendererFramework: (params) => (
                <center>
                    <img style={{ width: '50px', height: '50px' }} src={params.data.image} />
                </center>
            ),
        },
        {
            headerName: "Update",
            filter: false,
            cellRendererFramework: (params) => (
                <center
                    onClick={() => handleUpdate(params.data)}
                >
                    <button type="button" class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg></button>
                </center>
            ),
        },
        {
            headerName: "Delete",
            filter: false,
            cellRendererFramework: (params) => (
                <center
                    onClick={() => handleDelete(params.data)}
                >
                    <button type="button" class="btn btn-outline-danger"  >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </center>
            ),
        },
    ]);


    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                transition={Zoom}
                delay={500}
                limit={1}
            />
            <Modal
                show={showDelete}
                onHide={handleDeleteClose}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Delete Meamber
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Modal.Body>
                        <div className="d-flex" >
                            <div style={{ marginLeft: '50px' }} >
                                <Button variant="secondary"
                                    onClick={handleDeleteClear}
                                >
                                    Cancel
                                </Button>
                            </div>
                            <div style={{ marginLeft: '150px' }} >
                                {
                                    loader == false &&
                                    <Button variant="danger"
                                        onClick={handleDeleteSubmit}
                                    >
                                        Delete

                                    </Button>
                                }
                                {
                                    loader == true &&
                                    <Spinner animation="border" variant="Primary" />
                                }
                            </div>
                        </div>
                    </Modal.Body>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12">
                        <Row className="mb-6">
                            <Form.Group as={Col}>
                                <Form.Label> Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name='heading'
                                    value={updateMemberForm.heading}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                                <span className="text-danger" >{updateMemberFormErrors.heading}</span>
                            </Form.Group>
                        </Row>
                        <Row>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>blog Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Product Text"
                                    name='text'
                                    value={updateMemberForm.text}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                                <span className="text-danger" >{updateMemberFormErrors.text}</span>
                            </Form.Group> */}
                            <label>Blog Text</label>
                            <MyStatefulEditor handleData={handleData} updateMemberForm={updateMemberForm} />
                        </Row>

                        <Row className="mb-6">
                            <Form.Group as={Col}>
                                <Form.Label> Select Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Product Heading"
                                    className="w-50"
                                    name='image'
                                    value={updateMemberForm.image}
                                    onChange={handleChange}
                                    autoComplete='off'
                                />
                                <span className="text-danger" >{updateMemberFormErrors.image}</span>
                            </Form.Group>
                        </Row>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                    {
                        loader == false &&
                        <Button variant="primary"
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    }
                    {
                        loader == true &&
                        <Spinner animation="border" variant="Primary" />
                    }
                </Modal.Footer>
            </Modal>
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
                                    <b>All Responsibility  List </b>
                                </h3>
                            </div>

                            <div className="col-md-4 text-end">
                                <button type="button" className="btn btn-outline-success mx-1">
                                    <Link to="/responsibility-add">Add Responsibility </Link>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-success mx-1"
                                    disabled
                                >
                                    <Link to="/responsibility-list"> Responsibility List</Link>
                                </button>
                            </div>
                        </div>
                        {/* <table className="table table-bordered w-100 my-2 text-center">
                            <thead>
                                <tr className="col-12" >
                                    <th className="col-3" >Sr No.</th>
                                    <th className="col-3">Responsibility Heading</th>
                                    <th className="col-1" >Responsibility Text</th>
                                    <th className="col-1" >Responsibility Image</th>
                                    <th className="col-2" >Delete</th>
                                    <th className="col-2">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ProductList.map((ele, ind) => {
                                        return (
                                            <tr>
                                                <th>{ind + 1}</th>
                                                <td>{ele.title}</td>
                                                <td style={{ width: "100px" }} >
                                                    {ele.description}
                                                </td>
                                                <td><img src={ele.image} width='50px' height='50px' /></td>
                                                <td className="text-center">
                                                    <button type="button" class="btn btn-outline-danger"
                                                        onClick={() => handleDelete(ele)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            class="bi bi-trash-fill"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td
                                                    onClick={() => handleUpdate(ele)}
                                                >
                                                    <button type="button" class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" >
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> */}
                        <div
                            className="ag-theme-alpine"
                            style={{ height: "70vh", width: "100%" }}
                        >
                            <AgGridReact
                                rowHeight={rowHeight}
                                // columnDefs={columns}
                                columnDefs={colDefs}
                                defaultColDef={DefaultColumnSetting}
                                pagination={true}
                                paginationPageSize={10}
                                // onGridReady={onGridReady}
                                rowData={rowData}
                            />{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResponsibilityList;
