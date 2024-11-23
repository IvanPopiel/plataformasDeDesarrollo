import React, { useEffect, useState } from "react";
import "./UserManagement.css";

const renderTableRows = (
  users,
  editUser,
  handleEditChange,
  handleDelete,
  setEditUser,
  handleEditSave
) => {
  const rows = [];

  users.forEach((user) => {
    const isEditing = editUser?.username === user.username;
    rows.push(
      <tr key={user.username}>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editUser.username}
              onChange={handleEditChange}
              disabled
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
              <option value="admin">admin</option>
              <option value="user">user</option>
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
              <button onClick={() => handleDelete(user.username)}>
                Borrar
              </button>
            </>
          )}
        </td>
      </tr>
    );
  });

  return rows;
};

const UserManagement = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      setIsAdmin(true);
      fetch("/login.json")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error al cargar usuarios:", error));
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
      user.username === editUser.username ? editUser : user
    );
    setUsers(updatedUsers);
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
            {renderTableRows(
              users,
              editUser,
              handleEditChange,
              handleDelete,
              setEditUser,
              handleEditSave
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
