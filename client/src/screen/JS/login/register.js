import React, { useState, useEffect } from 'react';
import '../../css/register.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import FloatingLabelInput from '../../../Components/FloatingLabelInput'
import ModalError from './ModalError'; // Importez le composant ModalError

import images1 from '../../../images/png/Frame 22.png';
import images2 from '../../../images/png/Frame 22.png';
import play from '../../../images/play-circle-02.svg';
import stop from '../../../images/play-circle-02 (1).svg';

import Ellipse from '../../../images/Ellipse 13 (1).svg';
import Frame9 from '../../../images/Frame 9.svg';
import google from '../../../images/logo-google.svg';
import facebook from '../../../images/logo-facebook.svg';
import link from '../../../images/link-square.svg';
import call from '../../../images/call.svg';
import Ellipse_0 from '../../../images/Ellipse 14.png';
import Ellipse_1 from '../../../images/Ellipse 14-1.png';
import Ellipse_2 from '../../../images/Ellipse 14-2.png';

const images = [
    'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    images1,
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    images2,
];


const Profil = ({ img, nom, service, activite }) => {
    return (
        <div className='profil'>
            <img src={img} />
            <div>
                <p className='profil-nom'>{nom}</p>
                <div className='block-service'>
                    <p className='profil-service'>{service}</p>
                    <p className='profil-activite'>{activite}</p>
                </div>
            </div>
        </div>
    );
}


const Diaporama = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        let intervalId;

        if (isAutoPlaying) {
            intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 5000);
        }

        return () => clearInterval(intervalId);
    }, [isAutoPlaying]);

    const handlePaginationClick = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // État pour contrôler l'ouverture du modal

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const checkEmailExists = async (email) => {
        const response = await fetch(`http://localhost:1337/api/users?email=${email}`);

        const data = await response.json();
        return data.length > 0; // Retourne true si l'email existe déjà
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Réinitialiser l'erreur
        setSuccess(null); // Réinitialiser le succès

        // Vérifier si l'email existe déjà
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setError('Cet email est déjà utilisé.'); // Message d'erreur
            toggleModal(); // Ouvrir le modal d'erreur
            return; // Arrêter le processus d'inscription
        }

        try {
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, // Nom d'utilisateur
                    email,    // Email
                    password, // Mot de passe
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Inscription réussie:', data);
                setSuccess('Inscription réussie !'); // Message de succès
                // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions
            } else {
                setError(data.message || 'Erreur lors de l\'inscription.'); // Afficher l'erreur
                toggleModal(); // Ouvrir le modal d'erreur
            }
        } catch (error) {
            setError('Une erreur est survenue.'); // Gestion des erreurs réseau
            toggleModal(); // Ouvrir le modal d'erreur
            console.error('Erreur lors de l\'inscription:', error);
        }
    };

    return (
        <div className="container">
            <div className='Page-container-register'>
                <div className='Login-haut'>
                    <div className='Ellipse-block'>
                        <img src={Ellipse} alt='Image' className='Ellipse' />
                        <img src={Frame9} alt='Image' className='image-logo' />
                    </div>
                    <div className='login-text'>
                        <p className='login-text-titre'>Bienvenue !</p>
                        <p className='login-text-sous-titre'>
                            Bienvenue sur Bongo.space. Creer un compte ou
                            <Link to={`/`} className='login-text-sous-titre-span'>
                                Connectez-vous
                            </Link>
                            pour acceder a votre compte.
                        </p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='list-input'>
                        <div className='login-input'>
                            <FloatingLabelInput
                                label="Entrer votre nom"
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {/* <p className='Suivant'>Suivant</p> */}
                        </div>
                        <div className='login-input'>
                            <FloatingLabelInput
                                label="Email"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* <p className='Suivant'>Suivant</p> */}
                        </div>
                        <div className='login-input'>
                            <FloatingLabelInput
                                label="Entrer votre mots de passe"
                                id={'password'} name={'password'}
                                type='password' value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                            />
                        </div>
                        <button className='Suivant1'>Suivant</button>

                    </form>
                    <ModalError isOpen={modalOpen} toggle={toggleModal} errorMessage={error} />
                    <div className='Autre_methode'>
                        <img src={call} className='Autre_methode_img' />
                        <img src={facebook} className='Autre_methode_img' />
                        <img src={google} className='Autre_methode_img' />
                        <img src={link} className='Autre_methode_img' />
                    </div>
                </div>
                <div className='Login-footer'>
                    <p className='login-text-petit'>Privacy terms</p>
                    <p className='login-text-petit-actif'>Bongo.space</p>
                    <p className='login-text-petit'>Obtenir de l’aide</p>
                </div>
            </div>

            <div style={{ textAlign: 'center', height: '95vh' }} className='Page-image-register'>
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    style={{ width: '100%', height: '95.2vh', borderRadius: '20px' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 20
                }}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePaginationClick(index)}
                            style={{
                                margin: '5px',
                                backgroundColor: currentIndex === index ? '#EDECFE' : '#FFFFFF14',
                                color: 'white',
                                border: 'none',
                                padding: '5px',
                                cursor: 'pointer',
                                borderRadius: '50%',
                            }}
                        >
                        </button>
                    ))}
                </div>
                <button
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        position: 'absolute',
                        bottom: 10,
                        right: 20
                    }}
                    className="auto-play-button"
                    onClick={() => setIsAutoPlaying((prevState) => !prevState)}
                >
                    {isAutoPlaying ? <img src={stop} /> : <img src={play} />}
                </button>
            </div>
        </div>
    );
};

export default Diaporama;