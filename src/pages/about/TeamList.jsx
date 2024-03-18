import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../Service/ApiService";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { GrDocumentUpdate } from 'react-icons/gr';
import axios from 'axios'
import baseURL from "../../Service/Url";
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Row, Form, Col, Spinner } from 'react-bootstrap';
import { AgGridReact } from "ag-grid-react";


const TeamList = () => {
  const [ProductList, setPoductList] = useState([])
  const [reloadPage, setReloadPage] = useState(1)
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false)
  const [rowData, setRowdata] = useState();

  useEffect(() => {
    productsListApi()
  }, [reloadPage])


  /** State Management **/
  const [updateMemberForm, setupdateMemberForm] = useState({
    name: '',
    surname: '',
    disignation: '',
    description:''
  })
  const [file, setFile] = useState({
    image: ''
  })
  const [fileErrors, setFileErrors] = useState({
    image: ''
  })
  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
    name: '',
    // surname: '',
    disignation: '',
    image: '',
    description:''
  })
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

  const [updateID, setUpdateId] = useState('')

  const handleUpdate = (ele) => {
    setupdateMemberForm({
      ...updateMemberForm,
      name: ele?.name.split(/(\s+)/)[0],
      // surname: ele?.name.split(/(\s+)/)[2],
      disignation: ele?.designation,
      description: ele?.description,
      image: ''
    })

    setShow(true)
    setUpdateId(ele)
  }


  /** Form Validation **/
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const textReg = /[A-Za-z]/
    const newErros = {}
    const { name, surname, disignation ,description} = updateMemberForm
    const { image } = file
    if (!name) {
      newErros.name = 'please enter name'
    } else if (name && !textReg.test(name)) {
      newErros.name = 'numbers is not allowed'
    }
    else if (name && name.length > 50) {
      newErros.name = 'name should be below 50 charecters'
    }

    if (!surname) {
      newErros.surname = 'please enter surname'
    } else if (surname && !textReg.test(surname)) {
      newErros.surname = 'numbers is not allowed'
    }
    else if (surname && surname.length > 50) {
      newErros.surname = 'surname should be below 50 charecters'
    }


    if (!disignation) {
      newErros.disignation = 'please enter disignation'
    } else if (disignation && !textReg.test(disignation)) {
      newErros.disignation = 'numbers is not allowed'
    }
    else if (disignation && disignation.length > 50) {
      newErros.disignation = 'disignation should be below 50 charecters'
    }


    if (!description) {
      newErros.description = 'please enter description'
    } else if (description && !textReg.test(description)) {
      newErros.description = 'numbers is not allowed'
    }
    else if (description && description.length > 150) {
      newErros.description = 'description should be below 50 charecters'
    }
    if (!image) {
      newErros.image = 'please select file'
    }
    return newErros
  }

  /** Submit Form Dtata **/
  const handleUpdateSubmit = () => {
    // const handleValidationObject = handleValidation()
    // if (Object.keys(handleValidationObject).length > 0) {
    //   setupdateMemberFormErrors(handleValidationObject)
    // } else {
    setLoader(true)
    let formData = new FormData();
    if (updateMemberForm.name) {
      formData.append("name", updateMemberForm.name);
    }
    if (file.image) {
      formData.append("image", file.image);
    }
    if (updateMemberForm.disignation) {
      formData.append("designation", updateMemberForm.disignation);
    }
    if (updateMemberForm.description) {
      formData.append("description", updateMemberForm.description);
    }
    formData.append("category", 'management');

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
        toast.success('Successfully Updated Member')
        setLoader(false)
        setupdateMemberForm({
          ...updateMemberForm,
          name: '',
          surname: '',
          disignation: '',
          description:''
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
            description:''
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
      name: '',
      surname: '',
      disignation: '',
      description:''
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





  /** Product List **/
  const productsListApi = () => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/management`,
    }).then((res) => {
      if (res.status == 200) {
        setRowdata(res.data)
      }
    }).catch((err) => {
      console.log(err, 'err');
    })
  }

  const token = 'b837ddd120919da4b174c651dc92a26c6f6459e8'
  const [deleleId, setDelelete] = useState('')
  const handleDelete = (ele) => {
    setShowDelete(true)
    setDelelete(ele)
  }

  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false);
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
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then((res) => {
      if (res.status == 200) {
        toast.success('Successfully Deleted')
        setReloadPage(reloadPage + 1)
        setShowDelete(false)
        setLoader(false)
      }
    }).catch((err) => {
      if (err.response.status == 401) {
        toast.error('Token is Expaired')
        setReloadPage(reloadPage + 1)
        setShowDelete(false)
        setLoader(false)
      }
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
      headerName: "Name",
      filter: true,
      field: "name",
    },
    {
      headerName: "Designation",
      filter: true,
      field: "designation",
    },
    {
      headerName: "description",
      filter: true,
      field: "description",
    },
    {
      headerName: "Image",
      filter: false,
      cellRendererFramework: (params) => (
        // <center>
        <div>
          <img style={{ width: '50px', height: '50px' }} src={params.data.image} />
        </div>
        // </center>
      ),
    },
    {
      headerName: "Update",
      filter: false,
      cellRendererFramework: (params) => (
        // <center
        //   onClick={() => handleUpdate(params.data)}
        // >
        <div onClick={() => handleUpdate(params.data)} >
          <button type="button" class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg></button>
        </div>
        // </center>
      ),
    },
    {
      headerName: "Delete",
      filter: false,
      cellRendererFramework: (params) => (
        // <center
        //   onClick={() => handleDelete(params.data)}
        // >
        <div onClick={() => handleDelete(params.data)} >
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
        </div>
        // </center>
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
      <div>
        <Modal
          show={showDelete}
          onHide={handleDeleteClose}
        >
          <Modal.Header closeButton >
            <Modal.Title>Delete Team Member
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
                  {loader == false &&
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
            <Modal.Title>Update Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12">
              <Row className="mb-6">
                <Form.Group as={Col}>
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name='name'
                    value={updateMemberForm.name}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                  <span className="text-danger" >{updateMemberFormErrors.name}</span>
                </Form.Group>
              </Row>
              {/* <Row className="mb-6">
                <Form.Group as={Col}>
                  <Form.Label> Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Surname"
                    name='surname'
                    value={updateMemberForm.surname}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                  <span className="text-danger">{updateMemberFormErrors.surname}</span>
                </Form.Group>
              </Row> */}
              <Form.Group className="mb-6">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Designation"
                  name='disignation'
                  value={updateMemberForm.disignation}
                  onChange={handleChange}
                  autoComplete='off'
                />
                <span className="text-danger" >{updateMemberFormErrors.disignation}</span>
              </Form.Group>
              <Form.Group className="mb-6">
                <Form.Label>description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name='description'
                  value={updateMemberForm.description}
                  onChange={handleChange}
                  autoComplete='off'
                />
                <span className="text-danger" >{updateMemberFormErrors.description}</span>
              </Form.Group>

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
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
            {
              loader == false &&
              <Button variant="primary"
                onClick={handleUpdateSubmit}
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
        <div class="sidebar">
          <SideBar />
        </div>
        <div class="content">
          <div className="container ">
            <FirstNavbar />

            <div className="row my-2">
              <div className="col-md-3">
                <h3>
                  <b>Management Team List </b>
                </h3>
              </div>
              <div className="col-md-4 text-end">
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/about-add-team">Add Member </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/about-team"> Team List</Link>
                </button>
              </div>
            </div>
            {/* <table className="table table-bordered w-100 my-2 text-center"  >
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Image</th>
                  <th>Delete</th>
                  <td>Update</td>
                </tr>
              </thead>
              <tbody>
                {
                  ProductList && ProductList?.map((ele, ind) => {
                    return (
                      <tr  >
                        <td>{ind + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.designation}</td>
                        <td className="text-center" ><img width='50px' height='50px' src={ele.image} /></td>
                        <td className="text-center">
                          <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(ele)} >
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
                        <td onClick={() => handleUpdate(ele)} >
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
};

export default TeamList;
