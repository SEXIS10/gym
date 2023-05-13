import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SidebarProps {
  selectedView: string;
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedView, setSelectedView }) => {
  const [showAddPersonWindow, setShowAddPersonWindow] = useState<boolean>(false);
  const [name, setName] = useState(""); 
  const [tempSex, setTempSex] = useState<string | undefined>(undefined);
  const [sex, setSex] = useState<boolean | undefined>(undefined);
  const [address, setAddress] = useState("");
  const [birthDay, setBirthDay] = useState<Date | null>(null); 
  const [gymId, setGymId] = useState("");
  const [endDate, setEndDate] = useState<Date | null>(null); 
  const [startDate, setStartDate] = useState<Date | null>(null); 


  const handleAddPersonClick = () => {
    setSelectedView("Add New Person");
    setShowAddPersonWindow(true);
  };

  const handleCloseWindow = () => {
    setSelectedView("Members");
    setShowAddPersonWindow(false);
  };

  const handleSubmit = async () => {

    if(tempSex ==="male"){
      setSex(true)
    }
    else{
      setSex(false)
    }

    const userData = {
      name,
      sex,
      address,
      birthDay,
      gymId,
      endDate,
      startDate
    };

    try {
      const response = await fetch("http://localhost:8080/createNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        // Handle success
        console.log("User data submitted successfully!");
        setShowAddPersonWindow(false);
        window.location.reload();
      } else {
        // Handle error
        console.log("Error submitting user data.");
      }
    } catch (error) {
      // Handle network error
      console.log("Network error:", error);
    }
  };

  return (
    <div className="w-1/5 bg-gray-200 py-2 sidebar">
      <button
        className={`w-full p-2 text-left ${selectedView === "Members" && "bg-gray-300"}`}
        onClick={() => setSelectedView("Members")}
      >
        Members
      </button>
      <button
        className={`w-full p-2 text-left ${selectedView === "Active Members" && "bg-gray-300"}`}
        onClick={() => setSelectedView("Active Members")}
      >
        Active Members
      </button>
      <button
        className={`w-full p-2 text-left ${selectedView === "Passive Members" && "bg-gray-300"}`}
        onClick={() => setSelectedView("Passive Members")}
      >
        Passive Members
      </button>
      <button
        className={`w-full p-2 text-left ${selectedView === "Add New Person" && "bg-gray-300"}`}
        onClick={handleAddPersonClick}
      >
        Új ember hozzáadása
      </button>

      

      {showAddPersonWindow && (
        <div className="modal-container">
          <div className="add-person-window bg-white p-4 rounded shadow-md">
            <button className="close-button absolute top right-0 mt-2 mr-2 text-gray-600" onClick={handleCloseWindow}>
              X
            </button>
            <div className="form-container">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <br />
              <div className="mb-4">
                <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-700">
                  Sex:
                </label>
                <select
                  id="sex"
                  value={tempSex}
                  onChange={(e) => setTempSex(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <br />
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <br />
              <div className="mb-4">
                <label htmlFor="birth_day" className="block mb-2 text-sm font-medium text-gray-700">
                  Birth Day:
                </label>
                <DatePicker
id="birth_day"
selected={birthDay}
onChange={(date) => setBirthDay(date)}
className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
/>
              </div>
              <br />
              <div className="mb-4">
                <label htmlFor="gym_id" className="block mb-2 text-sm font-medium text-gray-700">
                  Gym ID:
                </label>
                <input
                  type="text"
                  id="gym_id"
                  value={gymId}
                  onChange={(e) => setGymId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <br />
              <div className="mb-4">
                <label htmlFor="end_date" className="block mb-2 text-sm font-medium text-gray-700">
                  End Date:
                </label>
                <DatePicker
id="end_date"
selected={endDate}
onChange={(date) => setEndDate(date)}
className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
/>
              </div>
              <br />
              <div className="mb-4">
  <label htmlFor="start_date" className="block mb-2 text-sm font-medium text-gray-700">
    Start Date:
  </label>
  <DatePicker
id="start_date"
selected={startDate}
onChange={(date) => setStartDate(date)}
className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
/>
</div>
                <br />
                <button className="submit-button bg-blue-500 text-white font-bold py-2 px-4 mt-4" onClick={handleSubmit}>
                  Hozzáadás
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Sidebar;