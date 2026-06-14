import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {   
        await axios.post(`${API_URL}/users`, {
            name: name,
            email: email,
            gender: gender
        });
        navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
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
                        <button className="button is-primary">Add User</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser
