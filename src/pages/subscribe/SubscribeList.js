import React, { useEffect, useState } from "react";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../Service/Url";
import { Modal, Button, Row, Form, Col, Spinner } from "react-bootstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyStatefulEditor from "../Components/RichText";
import { AgGridReact } from "ag-grid-react";

function SubscribeList() {
  const [ProductList, setPoductList] = useState([]);
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [rowData, setRowdata] = useState();

  const [updateMemberForm, setupdateMemberForm] = useState({
    heading: "",
    text: "",
    image: "",
  });
  const [file, setFile] = useState({
    image: "",
  });
  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
    heading: "",
    text: "",
    image: "",
  });

  useEffect(() => {
    productsListApi();
  }, [reloadPage]);

  /** Product List **/
  const productsListApi = () => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/subscribe`,
    })
      .then((res) => {
        if (res.status == 200) {
          setRowdata(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  console.log(rowData, "rowData");
  /* list */
  const [deleleId, setDelelete] = useState("");
  const handleDelete = (ele) => {
    setShowDelete(true);
    setDelelete(ele);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteClear = () => {
    setShowDelete(false);
  };

  const handleDeleteSubmit = () => {
    setLoader(true);
    axios
      .delete(`${baseURL}/${deleleId.id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Successfully Deleted");
          setLoader(false);
          setReloadPage(reloadPage + 1);
          setShowDelete(false);
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error("Token is Expaired");
          setLoader(false);
          setReloadPage(reloadPage + 1);
          setShowDelete(false);
        }
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  /* update */
  const [updateID, setUpdateId] = useState("");
  const [show, setShow] = useState(false);

  /** handle Change **/
  const handleChange = (event) => {
    if (event.target.name == "image") {
      setFile({
        ...file,
        [event.target.name]: event?.target?.files[0],
      });
      setFileErrors({
        ...file,
        image: "",
      });
    } else {
      setupdateMemberForm({
        ...updateMemberForm,
        [event.target.name]: event.target.value,
      });
    }
    setupdateMemberFormErrors({
      ...updateMemberFormErrors,
      [event.target.name]: null,
    });
  };

  const handleUpdate = (ele) => {
    setShow(true);
    setupdateMemberForm({
      ...updateMemberForm,
      heading: ele.title,
      text: ele.description,
      image: "",
    });
    setShow(true);
    setUpdateId(ele);
  };

  const handleSubmit = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("category", "career");

    if (updateMemberForm.heading) {
      formData.append("title", updateMemberForm.heading);
    }

    if (updateMemberForm.text) {
      formData.append("description", updateMemberForm.text);
    }

    if (file.image) {
      formData.append("image", file.image);
    }

    axios({
      url: `${baseURL}/${updateID.id}`,
      method: "PUT",
      data: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.success("Successfully Updated Meamber");
          setLoader(false);
          setupdateMemberForm({
            ...updateMemberForm,
            name: "",
            surname: "",
            disignation: "",
          });
          setFile({
            ...file,
            image: "",
          });
          setFileErrors({
            ...fileErrors,
            image: "",
          });
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.error("Token is Expaired");
          setLoader(false);
          setupdateMemberForm({
            ...updateMemberForm,
            name: "",
            surname: "",
            disignation: "",
          });
          setFile({
            ...file,
            image: "",
          });
          setFileErrors({
            ...fileErrors,
            image: "",
          });
        }
      });
    // }
  };

  const handleClear = () => {
    setupdateMemberForm({
      ...updateMemberForm,
      heading: "",
      text: "",
      image: "",
    });
    setFile({
      ...file,
      image: "",
    });
    setFileErrors({
      ...fileErrors,
      image: "",
    });
  };
  const handleData = (value) => {
    // setRichTextdata(value)
    setupdateMemberForm({
      ...updateMemberForm,
      ["text"]: value,
    });
    setupdateMemberFormErrors({
      ...updateMemberFormErrors,
      ["text"]: null,
    });
  };

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
      headerName: "email",
      filter: true,
      field: "email",
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
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container ">
            <FirstNavbar />

            <div className="row my-2">
              <div className="col-md-3">
                <h3>
                  <b>Subscribe List</b>
                </h3>
              </div>
            </div>

            <div
              className="ag-theme-alpine"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowHeight={rowHeight}
                columnDefs={colDefs}
                defaultColDef={DefaultColumnSetting}
                pagination={true}
                paginationPageSize={10}
                rowData={rowData}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeList;
