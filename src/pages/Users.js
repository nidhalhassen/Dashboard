import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/utilisateurs")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const toggleActivation = async (id, active) => {
    try {
      await fetch(`http://localhost:5000/api/utilisateurs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      setUsers(users.map(user => (user._id === id ? { ...user, compte: { ...user.compte, is_active: !user.compte.is_active } } : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user._id);
    setEditedUser({ ...user, compte: { ...user.compte } });
  };

  const saveUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });
      setUsers(users.map(user => (user._id === id ? editedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const removeUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/utilisateurs/${id}`, { method: "DELETE" });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="bg-white p-6 rounded-md shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Id</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Adress</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Poste</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.id_user}</td>
                {editingUser === user._id ? (
                  <>
                    <td className="p-2 w-32"><input type="text" value={editedUser.nom_user} onChange={(e) => setEditedUser({...editedUser, nom_user: e.target.value})} className="border p-1 rounded w-full" /></td>
                    <td className="p-2 w-32"><input type="text" value={editedUser.adresse} onChange={(e) => setEditedUser({...editedUser, adresse: e.target.value})} className="border p-1 rounded w-full" /></td>
                    <td className="p-2 w-32"><input type="text" value={editedUser.tel} onChange={(e) => setEditedUser({...editedUser, tel: e.target.value})} className="border p-1 rounded w-full" /></td>
                    <td className="p-2 w-32"><input type="text" value={editedUser.compte?.mail || ""} onChange={(e) => setEditedUser({...editedUser, compte: {...editedUser.compte, mail: e.target.value}})} className="border p-1 rounded w-full" /></td>
                    <td className="p-2 w-32"><input type="text" value={editedUser.role} onChange={(e) => setEditedUser({...editedUser, role: e.target.value})} className="border p-1 rounded w-full" /></td>
                    <td className="p-2 w-32"><input type="text" value={editedUser.poste} onChange={(e) => setEditedUser({...editedUser, poste: e.target.value})} className="border p-1 rounded w-full" /></td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{user.nom_user} {user.prenom_user}</td>
                    <td className="p-2">{user.adresse}</td>
                    <td className="p-2">{user.tel}</td>
                    <td className="p-2">{user.compte?.mail || "N/A"}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">{user.poste}</td>
                  </>
                )}
                <td className={`p-2 font-semibold ${user.compte?.is_active ? "text-green-600" : "text-red-600"}`}>{user.compte?.is_active ? "Active" : "Inactive"}</td>
                <td className="p-2 flex gap-2">
                  {editingUser === user._id ? (
                    <button className="px-2 py-1 bg-green-500 text-white rounded text-xs" onClick={() => saveUser(user._id)}>Save</button>
                  ) : (
                    <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs" onClick={() => editUser(user)}>Edit</button>
                  )}
                  <button className="px-2 py-1 bg-red-500 text-white rounded text-xs" onClick={() => removeUser(user._id)}>Remove</button>
                  <button className={`px-2 py-1 rounded text-xs ${user.compte?.is_active ? "bg-yellow-500" : "bg-green-500"} text-white`} onClick={() => toggleActivation(user._id, user.compte?.is_active)}>{user.compte?.is_active ? "Deactivate" : "Activate"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
