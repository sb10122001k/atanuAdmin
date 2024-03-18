import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Form } from "react-bootstrap";
import SideBar from "../dashboard/SideBar";
import FirstNavbar from "../dashboard/FirstNavbar";
import axios from 'axios'
import baseURL from "../../Service/Url";
import { AgGridReact } from "ag-grid-react";

function Contactlist() {
  const [ProductList, setPoductList] = useState([])
  const [reloadPage, setReloadPage] = useState(1)
  const [rowData, setRowData] = useState()
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {  
    productsListApi("contactus");
  }, [reloadPage]);


  /** Product List **/
  const productsListApi = (category) => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/${category}`,
    }).then((res) => {
      if (res.status == 200) {
        setRowData(res.data)
      }
    }).catch((err) => {
      console.log(err, 'err');
    })
  }
  const handleButtonClick = (category) => {
    productsListApi(category);
  };

  /***** Pagenation Table******/
  const rowHeight = 50;
  const DefaultColumnSetting = {
    sortable: true,
    filter: true,

    floatingFilter: true,
    flex: 1,
    resizable: true,
    //minWidth: 120,
  };

  const [colDefs, setColDefs] = useState([
    {
      headerName: "Id",
      valueGetter: "node.rowIndex + 1",
      filter: true,
      lockPosition: true,
    },
    {
      headerName: "Full Name",
      filter: true,
      field: "name",
    },
    {
      headerName: "Email",
      filter: true,
      field: "email",
    },
    {
      headerName: "Message",
      filter: true,
      field: "description",
    },
    {
      headerName: "Category",
      filter: true,
      field: "category",
    },
    {
      headerName: "Resume",
      filter: true,
      field: "image",
      cellRenderer: (params) => {
        const imageUrl = params.data.image; // Assuming the "image" field contains the URL
    
        return imageUrl ? (
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            Open Resume
          </a>
        ) : null;
      },
    },
    {
      headerName: "Date / Time",
      filter: true,
      field: "updatedAt",
    }
  ]);

  return (
    <div>
      <div>
        <div>
          <div class="sidebar">
            <SideBar />
          </div>

          <div class="content">
            <div className="container">
              <FirstNavbar />

              <div className="row">
                <div className="row my-2">
                  <div className="col-md-4">
                    <h3>
                      <b>All Contact Us List </b>
                    </h3>
                  </div>
                  <div className="col-md-4" style={{display:"flex", gap: "50px"}}>
                    <button className={`btn ${activeButton === "contactus" ? "btn btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleButtonClick("contactus")}>General</button>
                    <button className={`btn ${activeButton === "humanresource" ? "btn btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleButtonClick("humanresource")}>Human</button>
                    <button className={`btn ${activeButton === "adverseevent" ? "btn btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleButtonClick("adverseevent")}>Event</button>
                    <button className={`btn ${activeButton === "investor" ? "btn btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleButtonClick("investor")}>Investor</button>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-10">
                        <Form.Control
                          type="text"
                          placeholder="Search..."
                          className="rounded-pill"
                        />
                      </div>
                      <div className="col-md-2">
                        <button type="button" class="btn btn-outline-success">
                          Search
                        </button>
                      </div>
                    </div>
                  </div> */}

                </div>
                {/* <table className="table table-bordered w-100 my-2">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Date / Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      ProductList.map((ele, ind) => {
                        return (
                          <tr>
                            <th>{ind + 1}</th>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>{ele.description}</td>
                            <td>{ele.updatedAt}</td>
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
      </div>
    </div >
  );
}

export default Contactlist;
