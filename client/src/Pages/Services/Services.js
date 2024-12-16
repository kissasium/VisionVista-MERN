import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react'
import Simage from "../../Components/Assets/bronze.png"
import Simage2 from "../../Components/Assets/silver.png"
import Simage3 from "../../Components/Assets/gold.png"
import "./Services.css"
import axios from 'axios'

const Services = () => {

  const [comments, setComments] = useState("");
  const [val, setVal] = useState(-1);

  const handleService = async (e) => {
    e.preventDefault();
    const obj = {
      'package': val,
      'comments': comments
    }

    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`/api/v1/order/${userId}/createOrder`, obj);
      console.log(response.data);
      alert('Order Created Successfully');
    } catch (error) {
      console.error('Error Creating peace and order', error);
    }

  }


  return (
    <div className="Services">
      <div className="container-fluid services-body">
        <div className="card-group">
          <div className="card col-sm-12 col-md-4 m-2" style={{ width: "20rem" }}>
            <img src={Simage} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Basic</h5>
              <p className="card-text">Capture your moments effortlessly with our Basic Package! Enjoy 2 hours of professional photography, 50 edited digital images, and the freedom to print your favorites.</p>
            </div>
          </div>

          <div className="card col-sm-12 col-md-4 m-2" style={{ width: "20rem" }}>
            <img src={Simage2} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Standard</h5>
              <p className="card-text">Elevate your event with our Standard Package! Get 4 hours of coverage, around 100 edited digital images, an online gallery for sharing, and tangible keepsakes like prints and a custom USB drive.</p>
            </div>
          </div>

          <div className="card col-sm-12 col-md-4 m-2" style={{ width: "20rem" }}>
            <img src={Simage3} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Premium</h5>
              <p className="card-text">Go all out with our Premium Package! Enjoy full-day coverage, approximately 200 edited digital images, a custom-designed photo album, prints, an engagement session, and the option for an additional canvas print.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '200px', margin: '20px' }}>
        <label className='lbl' for="">Select a package:</label>
        <select className="form-select" value={val} onChange={(e) => setVal(e.target.value)}>
          <option value="Basic Package">Basic</option>
          <option value="Standard Package">Standard</option>
          <option value="Premium Package">Premium</option>
        </select>
      </div>

      <form className='form-group m-3'>
        <label className='lbl' for="">Additional Details:</label>
        <input type="text" onChange={(e) => setComments(e.target.value)} style={{ marginLeft: "2px" }} />
        <button className="servicebtn" onClick={handleService}>Order Now</button>
      </form>
    </div>
  )
}

export default Services;