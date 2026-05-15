import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'respectful-transformation-production-f907.up.railway.app';

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

    const saveUser = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            setLoading(true);
            await axios.post('https://respectful-transformation-production-f907.up.railway.app/users', {
                name: name.trim(),
                email: email.trim(),
                gender: gender
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error: ' + (error.response?.data?.msg || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <h2 className="title is-4 mb-5">Add New User</h2>
                <form onSubmit={saveUser}>
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
                                disabled={loading}
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
                                disabled={loading}
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
                                    disabled={loading}
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
                                className={`button is-primary ${loading ? 'is-loading' : ''}`}
                                disabled={loading}
                            >
                                Add User
                            </button>
                        </div>
                        <div className="control">
                            <button 
                                type="button"
                                className="button is-light"
                                onClick={() => navigate('/')}
                                disabled={loading}
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
  


export default AddUser
