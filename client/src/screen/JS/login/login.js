import React, { useState, useEffect } from 'react';
import '../../css/Login.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import FloatingLabelInput from '../../../Components/FloatingLabelInput'

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

    const [credentials, setCredentials] = useState({
        identifier: "",
        password: ""
    })

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Réinitialiser l'erreur
        setSuccess(null); // Réinitialiser le succès

        try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email, // Utilisez 'identifier' pour l'email
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Connexion réussie:', data);
                setSuccess('Connexion réussie !'); // Message de succès
                // Vous pouvez stocker le token dans le localStorage ou le state global
                localStorage.setItem('jwt', data.jwt); // Stocker le token JWT

                navigate(`/Home`);
            } else {
                setError(data.message || 'Erreur de connexion.'); // Afficher l'erreur
            }
        } catch (error) {
            setError('Une erreur est survenue.'); // Gestion des erreurs réseau
            console.error('Erreur de connexion:', error);
        }
    };

    return (
        <div className="container">
            <div className='Page-container'>
                <div className='Login-haut'>
                    <div className='Ellipse-block'>
                        <img src={Ellipse} alt='Image' className='Ellipse' />
                        <img src={Frame9} alt='Image' className='image-logo' />
                    </div>
                    <div className='login-text'>
                        <p className='login-text-titre'>Bon retour ici !</p>
                        <p className='login-text-sous-titre'>
                            Bienvenue sur Bongo.space. Connectez-vous avec votre email ou
                            <Link to={`/Register`} className='login-text-sous-titre-span'>
                                inscrivez-vous
                            </Link>
                            pour obtenir un nouveau compte.
                        </p>
                    </div>
                </div>
                <div>
                    <form className='list-input' onSubmit={handleSubmit}>
                        <FloatingLabelInput label="Entrer votre adresse mail" id={'identifier'} name={'identifier'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FloatingLabelInput label="Entrer votre mots de passe" id={'password'} name={'password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='Suivant'>Suivant</button>
                    </form>
                    <div className='Autre_methode'>
                        <img src={call} className='Autre_methode_img' />
                        <img src={facebook} className='Autre_methode_img' />
                        <img src={google} className='Autre_methode_img' />
                        <img src={link} className='Autre_methode_img' />
                    </div>
                </div>
                <div className='Login-bas'>
                    <p className='login-text-petit  login-text-petit-more'>Ou alors sélectionnez un compte</p>
                    <Profil img={Ellipse_0} nom={'Alfred Nidondi'} service={'Caisse'} activite={'Dernière activité il ya 12 heures'} />
                    <Profil img={Ellipse_1} nom={'Alfred Nidondi'} service={'Caisse'} activite={'Dernière activité il ya 12 heures'} />
                    <Profil img={Ellipse_2} nom={'Alfred Nidondi'} service={'Caisse'} activite={'Dernière activité il ya 12 heures'} />
                    <p className='login-text-petit'>Voir plus</p>
                </div>
                <div className='Login-footer'>
                    <p className='login-text-petit'>Privacy terms</p>
                    <p className='login-text-petit-actif'>Bongo.space</p>
                    <p className='login-text-petit'>Obtenir de l’aide</p>
                </div>
            </div>

            <div style={{ textAlign: 'center', height: '95vh' }} className='Page-image'>
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