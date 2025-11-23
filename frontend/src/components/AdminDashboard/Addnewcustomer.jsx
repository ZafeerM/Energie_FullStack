import axios from 'axios';
import React, { useState } from 'react';

const Addnewcustomer = () => {
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    fname: "",
    lname: "",
    contact: "",
    email: "",
    address1: "",
    address2: ""
  });

  // Generic handler for all inputs
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const Addcustomer = async(e) => {
    e.preventDefault();

    setLoading(true);

    try {
        const url = 'http://localhost:5050/addcustomer';
        const Token = localStorage.getItem('adminToken');
        const response = await axios.post(url, {firstn:formdata.fname, lastn:formdata.lname, number:formdata.contact, 
                                      mail:formdata.email, add1:formdata.address1, add2:formdata.address2},
                                    {headers : {'Authorization' : `Bearer ${Token}`}});
        console.log(response);
        alert("Customer Added.");
        window.location.reload();
        setFormdata({
          fname: "",
          lname: "",
          contact: "",
          email: "",
          address1: "",
          address2: ""
        });

    } catch (error) {
        if(error.response) {
            console.log("Error Status: ", error.response.status);
            console.log("Error Data: ", error.response.data);

            alert(`Error: ${error.response.data.message}`);
        }
        else if(error.request) {
            console.error("No response recieved.");
            alert('No Response, connect to server.')
        }
        else{
            console.error("Unexpected error.");
        }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Register New Customer</h1>
      <form className="flex flex-col w-md px-12 gap-y-3 py-12" onSubmit={Addcustomer}>
        
        <input
          required
          name="fname"
          value={formdata.fname}
          onChange={handleChange}
          className="p-1 border rounded-md"
          placeholder="Enter First Name"
        />

        <input
          required
          name="lname"
          value={formdata.lname}
          onChange={handleChange}
          className="p-1 border rounded-md"
          placeholder="Enter Last Name"
        />

        <input
          required
          name="contact"
          value={formdata.contact}
          onChange={handleChange}
          className="p-1 border rounded-md"
          placeholder="Enter Contact Number"
        />

        <input
          required
          name="email"
          type="email"
          value={formdata.email}
          onChange={handleChange}
          className="p-1 border rounded-md"
          placeholder="Enter Email"
        />

        <input
          required
          name="address1"
          value={formdata.address1}
          onChange={handleChange}
          className="p-1 border rounded-md"
          placeholder="Enter House No Street"
        />

        <input
          required
          name="address2"
          value={formdata.address2}
          onChange={handleChange}
          className="p-1 border rounded-md"
          placeholder="Enter Area"
        />

        <button
          type="submit"
          className="relative bg-emerald-500 rounded-md p-1 font-semibold mt-3 transition-all duration-200 cursor-pointer hover:opacity-80 flex justify-center"
        >
          <span className={`${loading ? 'opacity-0' : ''}`}>Register Customer</span>
          <span className={`absolute ${loading ? '' : 'opacity-0'}`}>Loading</span>
        </button>
      </form>
    </div>
  );
};

export default Addnewcustomer;
