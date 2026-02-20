import API from "../../api/axios";
import {React,useState,useEffect}from 'react'
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await API.get('/users');
        // Targeted the specific data property based on your previous logs
        setUsers(response.data.data || response.data); 
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false); // Using finally ensures loading stops no matter what
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await API.delete(`/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
        alert("User deleted");
      } catch (err) {
        console.log(err);
        alert("Error deleting user");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Panel: User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} -  {user.role}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList