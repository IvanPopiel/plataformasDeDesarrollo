import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import Navbar from '../Navbar/Navbar';
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState({});

  const agregarId = (usersSinId) =>
    usersSinId ? usersSinId.map((user, index) => ({ id: index + 1, ...user })) : [];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
          const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const data = await response.json();
         console.log(data);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    console.log('dsadsadsa');
    fetchUserData();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!editUser.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio.';
    } else if (editUser.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
    }

    if (!editUser.role) {
      newErrors.role = 'El rol es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleEditSave = () => {
    if (!validate()) 
      return;

    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? editUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    setEditUser(null);
  };

  if (!isAdmin) {
    return <p>No tienes permiso para acceder a esta sección.</p>;
  }

  return (
    <>
    <Navbar/> 
    <div className="user-form-body">
      <div className="user-form-div">
        <h2>Gestor de Usuarios</h2>
        <button onClick={() => navigate("/admin")}>Volver a Admin</button>

        <table>
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isEditing = editUser?.id === user.id;
              return (
                <tr key={user.id}>
                  <td>
                    {isEditing ? (
                      <>
                      <input
                        type="text"
                        name="username"
                        value={editUser.username}
                        onChange={handleEditChange}
                      />
                      {errors.username && <div className="error">{errors.username}</div>}
                      </>
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        name="role"
                        value={editUser.role}
                        onChange={handleEditChange}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button onClick={handleEditSave}>Guardar</button>
                        <button onClick={() => setEditUser(null)}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditUser(user)}>✏️</button>
                        <button onClick={() => handleDelete(user.username)}>🗑️</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default UserManagement;
