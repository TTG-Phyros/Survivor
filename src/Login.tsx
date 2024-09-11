import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';
import * as api from './api/Api';
const cookies = require('js-cookie');

const SoulConnection_Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = (email: string, password: string) => {
        api.connectEmployee(email, password).then((response) => {
            if (response) {
                if (!cookies.get("REFRESH_TIMEOUT")) {
                    api.fetchAllRoutesWithoutImages().then(() => {
                        console.log("Fetched All routes without images");
                        api.fetchAllRoutesOnlyImages().then(() => {
                            console.log("Fetched All routes with images");
                            cookies.set("REFRESH_TIMEOUT", true, { expires: 1 });
                            window.location.reload();
                            navigate('/dashboard');
                        });
                    });
                } else {
                    window.location.href = '/';
                    navigate('/dashboard');
                }
            } else {
                setError(true);
            }
        });
    };

    return (
        <div className="login-container">
            <div className="leftSection">
                <h1 className="title">Soul Connection</h1>
                <form className="form" onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }}>
                    <label htmlFor="identifiant" className="label">Identifiant :</label>
                    <input
                        type="text"
                        id="identifiant"
                        placeholder="john.smith@example.com"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="motdepasse" className="label">Mot de passe :</label>
                    <input
                        type="password"
                        id="motdepasse"
                        placeholder="123456"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="button-64">
                        <span className="text">Valider</span>
                    </button>
                    {error && (
                        <p style={{ color: 'red' }}>Identifiant ou mot de passe invalide !</p>
                    )}
                </form>
            </div>
            <div className="rightSection">
                <img src="test.jpg" alt="Artwork" className="image" />
            </div>
        </div>
    );
}

export default SoulConnection_Login;
