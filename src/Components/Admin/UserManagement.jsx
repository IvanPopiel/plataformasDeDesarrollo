import React, { useEffect, useState } from "react";
import "./UserManagement.css";

const UserManagement = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const agregarId = (usersSinId)=> usersSinId.map((user, index) => ({ id : index+1, ...user}) ) 

  useEffect(() => {
    if (currentUser?.role === "admin") {
      setIsAdmin(true);
/*       setUsers(JSON.parse(localStorage.getItem("userData")));
 */
      setUsers(agregarId(JSON.parse(localStorage.getItem("userData"))));
    }
  }, [currentUser]);
  
  

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
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
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
    setEditUser(null);
  };

  if (!isAdmin) {
    return <p>No tienes permiso para acceder a esta sección.</p>;
  }

  return (
    <div className="user-form-body">
      <div className="user-form-div">
        <h2>Gestión de Usuarios</h2>
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
                        <button onClick={() => setEditUser(user)}>Editar</button>
                        <button onClick={() => handleDelete(user.username)}>Borrar</button>
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