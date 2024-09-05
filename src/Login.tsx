import React from 'react';
import './Login.css'
import { useNavigate } from 'react-router';

const SoulConnection_Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        
        navigate('/dashboard');
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <h1 style={styles.title}>Soul Connection</h1>
                <form style={styles.form}>
                    <label htmlFor="identifiant" style={styles.label}>Identifiant :</label>
                    <input type="text" id="identifiant" placeholder="john.smith@example.com" style={styles.input} />
                    
                    <label htmlFor="motdepasse" style={styles.label}>Mots de passe :</label>
                    <input type="password" id="motdepasse" placeholder="12345678" style={styles.input} />
                    
                    <button className="button-64" role="button">
                        <span className="text">valider</span>
                    </button>
                </form>
            </div>
            <div style={styles.rightSection}>
                <img src="test.jpg" alt="Artwork" style={styles.image} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#d9d9d9',
    },
    leftSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '105px',  // Double the padding
    },
    title: {
        fontSize: '7rem',  // Double the font size
        marginBottom: '10px',  // Double the margin
    },
    form: {
        width: '100%',
        maxWidth: '700px',  // Double the max-width
    },
    label: {
        fontSize: '2.4rem',  // Double the font size
        marginBottom: '10px',  // Double the margin
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '20px',  // Double the padding
        marginBottom: '30px',  // Double the margin
        border: 'none',
        borderRadius: '10px',  // Double the border-radius
        fontSize: '2rem',  // Double the font size
        backgroundColor: '#000',
        color: '#fff',
    },
    rightSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        marginLeft: '-105px',  // Décalage de 15 pixels vers la gauche
        borderRadius: '50%',  // Double the border-radius
        
    }
};

export default SoulConnection_Login;
