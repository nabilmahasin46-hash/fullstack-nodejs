import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL || 'https://respectful-transformation-production-f907.up.railway.app';

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users`);
      console.log('Users fetched:', response.data);

      const data = Array.isArray(response.data) ? response.data : [];
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Error Response:', error.response);
      alert('Failed to load users: ' + (error.response?.data?.msg || error.message));
      setUsers([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [location]);

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
        setLoading(true);
        await axios.delete(`${API_URL}/users/${id}`);
        getUsers(); 
    } catch (error) {
        console.error('Error deleting user:', error);
        console.error('Error Response:', error.response);
        alert('Error deleting user: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`add`} className="button is-success mb-3">Add New</Link>
            
            {loading && <p className="is-loading">Loading...</p>}
            
            {users.length === 0 && !loading ? (
              <div className="notification is-info">No users found</div>
            ) : (
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                                <Link to={`edit/${user.id}`} className="button is-small is-info">Edit</Link>
                                <button 
                                  onClick={() => deleteUser(user.id)} 
                                  className="button is-small is-danger ml-2"
                                  disabled={loading}
                                >
                                  Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            )}
        </div>
    </div>
  )
}

export default UserList
