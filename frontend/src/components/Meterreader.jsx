import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MeterReaderForm() {
  const EnterReadingURL = "http://localhost:5050/EnterReading";
  const navigate = useNavigate();
  const [values, setValues] = useState({
    MeterID: "",
    ReadingValue: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
  };
  
  const Meterlogout = () => {
        localStorage.removeItem('meterToken');
        navigate('/Login', {replace : true});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("inHandleSubmit");

    if (values.ReadingValue < 0) {
      alert("Error: Meter Reading cannot be Negative!");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are 0-indexed
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const ReadingDate = `${formattedDate} ${formattedTime}`;

    try {
      const data = axios.post(EnterReadingURL, {
        MeterID: values.MeterID,
        ReadingValue: values.ReadingValue,
        ReadingDate,
      });
      alert("Meter Reading Entered Successfully.");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(`Server Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("Network Error: Could not reach backend");
      } else {
        alert("Unexpected Error");
      }
    }
  };
  return (
    <>
      <div
        className='bg-[url("./assets/MRPattern.jpg")] bg-contain text-white items-center justify-center flex flex-col h-screen'
        id="Readings-Form"
      >
        <div className="bg-black/30 p-15 rounded-2xl backdrop-blur-md">
          <div>
            <h1 className="text-4xl text-center">Readings Entry</h1>
          </div>
          <br></br>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* <label htmlFor="MeterID">Meter ID:</label> */}
            <input
              className="w-border-0 bg-[#0000008c] backdrop-blur-md text-white rounded-xl p-4 text-lg 
                                  focus:ring-amber-200 focus:ring outline-none transition-all duration-200 "
              type="number"
              id="MeterID"
              placeholder="Enter Meter ID"
              name="MeterID"
              value={values.MeterID}
              onChange={handleInput}
              required
            ></input>
            <br></br>
            {/* <label htmlFor="ReadingValue">Reading Value:</label> */}
            <input
              className="w-border-0 bg-[#0000008c] backdrop-blur-md text-white rounded-xl p-4 text-lg 
                                  focus:ring-amber-200 focus:ring outline-none transition-all duration-200"
              type="number"
              id="ReadingValue"
              placeholder="Enter Current Reading"
              name="ReadingValue"
              value={values.ReadingValue}
              onChange={handleInput}
              required
            ></input>
            <br></br>
            <button
              className="bg-black/50  rounded-2xl p-4 font-medium
                                                hover:opacity-85 hover:cursor-pointer hover:shadow-amber-200 hover:shadow-xs
                                                transition-all duration-200 text-2xl
                                                  "
              type="submit"
            >
              Submit Reading
            </button>
          </form>

          <div className="w-full flex justify-center mt-8">
          <button className='bg-red-600 py-2.5 px-10 rounded-md text-white font-bold
                                    hover:opacity-80 hover:cursor-pointer' 
                        onClick={Meterlogout}>Log Out</button>
          </div>
        </div>
      </div>
    </>
  );
}
