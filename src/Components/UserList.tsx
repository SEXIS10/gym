import React from "react";
import { User } from "../Components/types";

interface UserListProps {
  users: User[];
  renderUserList: () => JSX.Element[];
  deleteUser: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, renderUserList, deleteUser }) => {
  return (
    <div className="user-list-container">
      <div className="header">
        <p>Név</p>
        <p>Státusz</p>
        <p>Lejárati Dátum</p>
        <p>Törlés</p> {/* Új oszlop */}
      </div>
      <div className="user-list-scroll">
        {renderUserList().map((element, index) => (
          <div
            className="list-row"
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "white" : "rgb(221, 221, 221)",
              border: index % 2 === 0 ? " " : "3px solid grey",
              margin: "5px",
            }}
          >
            {element }
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
