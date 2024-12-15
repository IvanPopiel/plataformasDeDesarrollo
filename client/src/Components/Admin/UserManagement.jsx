import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import './UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) {
          navigate("/");
          return;
        }

        const response = await fetch(`${API_URL}/api/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Método para sincronizar los usuarios desde el servidor
  const syncUsers = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error sincronizando usuarios: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error sincronizando usuarios:", error);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!editUser.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    } else if (editUser.username.length < 3) {
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    if (editUser.is_admin === undefined) {
      newErrors.role = "El rol es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async (id) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error eliminando usuario: ${response.statusText}`);
      }

      // Sincronizar la lista de usuarios después de eliminar
      syncUsers();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const handleEditSave = async () => {
    if (!validate()) return;

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/users/${editUser.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: editUser.username,
          is_admin: editUser.is_admin,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error actualizando usuario: ${response.statusText}`);
      }

      syncUsers();
      setEditUser(null);

    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "is_admin") {
      setEditUser({ ...editUser, [name]: value === "admin" });
    } else {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  return (
    <>
      <Navbar />
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
                          {errors.username && (
                            <div className="error">{errors.username}</div>
                          )}
                        </>
                      ) : (
                        user.username
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          name="is_admin"
                          value={editUser.is_admin ? "admin" : "user"}
                          onChange={handleEditChange}
                        >
                          <option value="admin">Admin</option>
                          <option value="user">Usuario</option>
                        </select>
                      ) : (
                        user.is_admin ? "Admin" : "Usuario"
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
                          <button onClick={() => handleDelete(user.id)}>🗑️</button>
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
