import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import axios from 'axios'
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import baseURL from "../../Service/Url";

const AddTeam = () => {
  /** State Management **/
  const [loader, setLoader] = useState(false)
  const [addMemberForm, setAddMemberForm] = useState({
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
  const [addMemberFormErrors, setAddMemberFormErrors] = useState({
    name: '',
    surname: '',
    disignation: '',
    description:'',
    image: ''
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
      setAddMemberForm({
        ...addMemberForm, [event.target.name]: event.target.value
      })
    }
    setAddMemberFormErrors({
      ...addMemberFormErrors, [event.target.name]: null
    })
  }

  /** Form Validation **/
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const textReg = /[A-Za-z]/
    const newErros = {}
    const { name, surname, disignation ,description } = addMemberForm
    const { image } = file
    if (!name) {
      newErros.name = 'please enter name'
    } else if (name && !textReg.test(name)) {
      newErros.name = 'numbers is not allowed'
    }
    else if (name && name.length > 50) {
      newErros.name = 'name should be below 50 charecters'
    }

    // if (!surname) {
    //   newErros.surname = 'please enter surname'
    // } else if (surname && !textReg.test(surname)) {
    //   newErros.surname = 'numbers is not allowed'
    // }
    // else if (surname && surname.length > 50) {
    //   newErros.surname = 'surname should be below 50 charecters'
    // }


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
  const handleSubmit = async () => {
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setAddMemberFormErrors(handleValidationObject)
    } else {

      setLoader(true)
      let formData = new FormData();
      formData.append("name", addMemberForm.name);
      formData.append("image", file.image);
      formData.append("designation", addMemberForm.disignation);
      formData.append("description", addMemberForm.description);
      formData.append("category", 'management');

      // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // },

      axios({
        url: `${baseURL}/create`,
        method: "POST",
        data: formData,
      }).then((res) => {
        if (res.status == 200) {
          setLoader(false)
          toast.success('Successfully Created Member')
          setAddMemberForm({
            ...addMemberForm,
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
            setLoader(false)
            toast.error('Token is Expaired')
            setAddMemberForm({
              ...addMemberForm,
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


    }
  }


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
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <div className="row my-2">
            <div className="col-md-4"></div>
            <div className="col-md-3">
              <h3>
                <b>Add Member </b>
              </h3>
            </div>
            <div className="col-md-4 text-end">
              {" "}
              <button type="button" className="btn btn-outline-success mx-1">
                <Link to="/about-team"> Team List</Link>
              </button>
              <button
                type="button"
                className="btn btn-outline-success mx-1"
                disabled
              >
                <Link to="/about-add-team">Add Member </Link>
              </button>
            </div>
          </div>

          <div className="row m-auto my-3">
            <div className="col-md-3"></div>

            <div className="col-md-6">
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name='name'
                    value={addMemberForm.name}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                  <span className="text-danger" >{addMemberFormErrors.name}</span>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Designation"
                  name='disignation'
                  value={addMemberForm.disignation}
                  onChange={handleChange}
                  autoComplete='off'
                />
                <span className="text-danger" >{addMemberFormErrors.disignation}</span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name='description'
                  value={addMemberForm.description}
                  onChange={handleChange}
                  autoComplete='off'
                />
                <span className="text-danger" >{addMemberFormErrors.description}</span>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label> Select Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Product Heading"
                    className="w-50"
                    name='image'
                    value={addMemberForm.image}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                  <span className="text-danger" >{addMemberFormErrors.image}</span>
                </Form.Group>
              </Row>
              <div className="text-center m-auto my-2">
                {
                  loader == false &&
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                }
                {
                  loader == true && <Spinner animation="border" variant="Primary" />
                }
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
