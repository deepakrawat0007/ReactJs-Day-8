import { useEffect, useState } from "react";
import axios from "axios";
import "./contactlist.css";
const ContactList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://fake-data3.p.rapidapi.com/fk/users',
            params: { _gender: 'male' },
            headers: {
                'X-RapidAPI-Key': 'dbd6138886msh8398014a095167cp18a45cjsnf7583d654c0e',
                'X-RapidAPI-Host': 'fake-data3.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setUsers(response.data)
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    const showAge = (num) => {
        if (selectedUser !== num) {
            setSelectedUser(num);
        }else{
            setSelectedUser()
        }
    }

    return (
        <div>
            {!loading && users.data.map((items, idx) => (
                <div className="cards" key={idx}>
                    <img src={items.image} width={200} height={145} alt="image-1" />
                    <h3>Name:{`${items.firstname} ${items.lastname}`}</h3>
                    <h4 className="email">Email:{items.email}</h4>
                    
                    {selectedUser === idx ? <p>Age: {Math.floor(Math.random() * 100)}</p> : ""}
                    <button onClick={() => showAge(idx)}>Show Age</button>
                </div>
            ))}
        </div>
    )
}

export default ContactList
