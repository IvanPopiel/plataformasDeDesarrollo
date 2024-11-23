import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import { useNavigate } from "react-router-dom";



const UserManagement = ({ currentUser }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const agregarId = (usersSinId)=> 
  usersSinId ? usersSinId.map((user, index ) => ({ id: index+1, ...user })) : [];
  useEffect(() => {
    if (currentUser?.role === "admin") {
      setIsAdmin(true);
/*       setUsers(JSON.parse(localStorage.getItem("loginData")));
 */
      const loginData = JSON.parse(localStorage.getItem("loginData")) || [];
      console.log("mostrar los datos de local: ", loginData);
      setUsers(agregarId(loginData));
    }
  }, [currentUser]);
  
  

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("loginData", JSON.stringify(updatedUsers));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleEditSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? editUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("loginData", JSON.stringify(updatedUsers));
    setEditUser(null);
  };

  if (!isAdmin) {
    return <p>No tienes permiso para acceder a esta sección.</p>;
  }

  return (
    <div className="user-form-body">
      <div className="user-form-div">
        <h2>Gestión de Usuarios</h2>
        <button onClick={() => navigate('/admin')}>
        Volver a Admin
      </button>
      
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
                      <input
                        type="text"
                        name="username"
                        value={editUser.username}
                        onChange={handleEditChange}
                      />
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
  );
}

export default UserManagement;