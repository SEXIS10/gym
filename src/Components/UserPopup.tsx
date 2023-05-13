import React from "react";
import { User } from "../Components/types";

interface UserPopupProps {
  user: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserPopup: React.FC<UserPopupProps> = ({ user, setSelectedUser }) => {
  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-popup">
        <div className="user-popup-conatiner">
        <button className="close-button" onClick={handleClose}>
        x
      </button>
      <p>Name: {user.name}</p>
      <p>Sex: {user.sex ? "Male" : "Female"}</p>
      <p>Address: {user.address}</p>
      <p>Birth Day: {user.birthDay}</p>
      <p>Gym ID: {user.gymId}</p>
      <p>End Date: {user.endDate}</p>
      <p>Start Date: {user.startDate}</p>
      <p>Status: {user.status ? "Active" : "Passive"}</p>
        </div>
    </div>
  );
};

export default UserPopup;
