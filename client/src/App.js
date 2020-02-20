import React, {
    useEffect,
    useState
} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/users').then(res => res.json()).then(users => setUsers(users))
    }, []);
    return ( <
        div className = "App" >
        <
        h1 > Users < /h1> {
            users.map(user =>
                <
                div key = {
                    user.id
                } > {
                    user.username
                } < /div>
            )
        } <
        /div>
    );
}
export default App;
