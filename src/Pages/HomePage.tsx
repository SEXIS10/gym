import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../Components/UserList";
import Sidebar from "../Components/Sidebar";
import './HomePage.css'
import { User } from "../Components/types";
import { AiOutlineDelete } from "react-icons/ai";
import UserPopup from "../Components/UserPopup";

const GymSystem: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedView, setSelectedView] = useState<string>("Members");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAllUser");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const deleteUser = async (userId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/deleteUser/${userId}`);
        console.log("User deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const renderUserList = (): JSX.Element[] => {
    let filteredUsers: User[] = [];
    switch (selectedView) {
      case "Members":
        filteredUsers = users;
        break;
      case "Active Members":
        filteredUsers = users.filter((user) => user.status);
        break;
      case "Passive Members":
        filteredUsers = users.filter((user) => !user.status);
        break;
      default:
        filteredUsers = users;
    }

    return filteredUsers.map((user) => (
      <div className="datas" key={user.id}>
        <p className="cursor-pointer" onClick={() => handleUserClick(user)}>{user.name}</p>
        <p className="cursor-pointer" onClick={() => handleUserClick(user)}>{user.status ? "Active" : "Passive"}</p>
        <p className="cursor-pointer" onClick={() => handleUserClick(user)}>{user.endDate}</p>
        <button
          className="ml-2 text-red-500 cursor-pointer kuka"
          onClick={() => deleteUser(user.id)}
        >
          <AiOutlineDelete />
        </button>
      </div>
    ));
  };

  return (
    <div>
      <header className="bg-gray-300 py-2">
        <h1 className="text-center text-2xl font-bold">GYMSYSTEM</h1>
      </header>
      <div id="flex">
        <Sidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          className="sidebar"
        />
        <div className="main-container">
          <main className="lista">
          <UserList users={users} renderUserList={renderUserList} deleteUser={deleteUser}></UserList>
          </main>
        </div>
      </div>
      {selectedUser && <UserPopup user={selectedUser} setSelectedUser={setSelectedUser} />}
    </div>
  );
};

export default GymSystem;
