import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const API_URL = process.env.REACT_APP_API_URL || 'https://respectful-transformation-production-f907.up.railway.app';

    const getUserById = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/users/${id}`);
            const { name, email, gender } = response.data;
            setName(name);
            setEmail(email);
            setGender(gender);
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('Error fetching user: ' + error.message);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        getUserById();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Email format is invalid';
        }
        if (!gender) {
            newErrors.gender = 'Gender is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateUser = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            setUpdating(true);
            await axios.patch(`${API_URL}/users/${id}`, {
                name: name.trim(),
                email: email.trim(),
                gender: gender
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error: ' + (error.response?.data?.msg || error.message));
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="columns mt-5 is-centered">
                <div className="column is-half has-text-centered">
                    <p className="is-loading">Loading user...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <h2 className="title is-4 mb-5">Edit User</h2>
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                className={`input ${errors.name ? 'is-danger' : ''}`}
                                type="text"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter name"
                                required
                                disabled={updating}
                            />
                            {errors.name && <p className="help is-danger">{errors.name}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                className={`input ${errors.email ? 'is-danger' : ''}`}
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter email"
                                required
                                disabled={updating}
                            />
                            {errors.email && <p className="help is-danger">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <div className="select">
                                <select 
                                    value={gender} 
                                    onChange={(e) => setGender(e.target.value)}
                                    disabled={updating}
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button 
                                type="submit"
                                className={`button is-primary ${updating ? 'is-loading' : ''}`}
                                disabled={updating}
                            >
                                Update User
                            </button>
                        </div>
                        <div className="control">
                            <button 
                                type="button"
                                className="button is-light"
                                onClick={() => navigate('/')}
                                disabled={updating}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser
