import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import API_ENDPOINT from '../config/api';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/users/${id}`);
                const { name, email, gender } = response.data;
                setName(name);
                setEmail(email);
                setGender(gender);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError(error.message);
            }
        };
        
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {   
        await axios.patch(`${API_ENDPOINT}/users/${id}`, {
            name: name,
            email: email,
            gender: gender
        });
        navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.response?.data?.msg || error.message);
        }
    };

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text"
                         value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" 
                         value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <select className="select" value={gender} onChange={(e) => setGender(e.target.value)}                   >
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary">Update User</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditUser
