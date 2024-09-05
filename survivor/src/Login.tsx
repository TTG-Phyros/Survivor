import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour gérer la navigation

const SoulConnection_Login: React.FC = () => {
    const navigate = useNavigate(); // Hook pour naviguer entre les pages

    const handleLogin = () => {
        // Ajoute ici ta logique de validation du formulaire
        navigate('/dashboard'); // Redirige vers "/dashboard" après la validation
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <h1 style={styles.title}>Soul Connection</h1>
                <form style={styles.form} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <label htmlFor="identifiant" style={styles.label}>Identifiant :</label>
                    <input type="text" id="identifiant" placeholder="zone de texte" style={styles.input} />
                    
                    <label htmlFor="motdepasse" style={styles.label}>Mots de passe :</label>
                    <input type="password" id="motdepasse" placeholder="zone de texte" style={styles.input} />
                    
                    <button type="submit" className="button-64" role="button">
                        <span className="text">Valider</span>
                    </button>
                </form>
            </div>
            <div style={styles.rightSection}>
                <img src="test.jpg" alt="Artwork" style={styles.image} />
            </div>
        </div>
    );
};

// Styles in-line inchangés
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
        padding: '105px',
    },
    title: {
        fontSize: '7rem',
        marginBottom: '10px',
    },
    form: {
        width: '100%',
        maxWidth: '700px',
    },
    label: {
        fontSize: '2.4rem',
        marginBottom: '10px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '20px',
        marginBottom: '30px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '2rem',
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
        marginLeft: '-105px',
        borderRadius: '50%',
    }
};

export default SoulConnection_Login;
