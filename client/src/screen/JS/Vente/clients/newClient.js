import '../../../css/Vente/newClient.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../../../../logo.svg';

import bag from '../../../../images/bag.svg'
import calculator from '../../../../images/calculator.svg'
import category from '../../../../images/category.svg'
import chart from '../../../../images/chart.svg'
import clipboard from '../../../../images/clipboard.svg'
import profile_2user from '../../../../images/profile-2user.svg'
import wallet_money from '../../../../images/wallet-money.svg'
import Vector from '../../../../images/Vector.svg'
import whatsapp from '../../../../images/whatsapp.svg'
import discount_shape from '../../../../images/discount-shape.svg'
import shop from '../../../../images/shop.svg'
import share from '../../../../images/export.svg'
import link from '../../../../images/link.svg'
import copy from '../../../../images/copy.svg'
import user_cirlce_add from '../../../../images/user-cirlce-add.svg'
import search_normal from '../../../../images/search-normal.svg'
import notification from '../../../../images/notification.svg'
import pp from '../../../../images/pp.png'
import Ellipse from '../../../../images/Ellipse.svg'
import info_circle from '../../../../images/info-circle.svg'
import arrow_circle_right from '../../../../images/arrow-circle-right.svg'
import trend_up from '../../../../images/trend-up.svg'
import Frame from '../../../../images/Frame.svg'
import porduit from '../../../../images/porduit.svg'
import edit from '../../../../images/edit.svg'
import supprimer from '../../../../images/delete.svg'
import change from '../../../../images/change.svg'


const Menu = ({ image, Vector, nom, liens }) => {
    const [sousMenusVisible, setSousMenusVisible] = useState(false);

    const toggleSousMenus = () => {
        setSousMenusVisible(!sousMenusVisible);
    };

    return (

        <div onClick={toggleSousMenus} className='menu'>
            <div>
                <Link to={`/${nom}`} className='Link-style'>
                    <div>
                        <img src={image} alt="image" />
                        <p style={{ marginRight: '10px' }}>{nom}</p>
                    </div>
                </Link>
                <img src={Vector} alt="image" />
            </div>
            {sousMenusVisible && (
                <div className='visible'>
                    {liens.map((lien, index) => (
                        <p key={index}>
                            <Link to={lien.url} className='Link-style'>{lien.label}</Link>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

const Menu_Actif = ({ image, nom, liens }) => {
    const [sousMenusVisible, setSousMenusVisible] = useState(false);

    const toggleSousMenus = () => {
        setSousMenusVisible(!sousMenusVisible);
    };

    return (
        <div className='Actif' onClick={toggleSousMenus}>
            <div>
                <Link to={`/${nom}`} className='Link-style'>
                    <div className='Actif-menu'>
                        <img src={image} alt="image" />
                        <p style={{ marginRight: '10px' }}>{nom}</p>
                    </div>
                </Link>
                <img src={Vector} alt="image" />
            </div>
            {sousMenusVisible && (
                <div className='visible'>
                    {liens.map((lien, index) => (
                        <p key={index}>
                            <Link to={lien.url} className='Link-style'>{lien.label}</Link>
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}
const Produit = ({ nom, Email, Telephone, Ville, Region }) => {
    return (
        <div>
            <tbody className='client'>
                <div>
                    <p>{nom}</p>
                </div>
                <div>
                    <p>{Email}</p>
                    <span>{Telephone}</span>
                </div>
                <div>
                    <p>{Ville}</p>
                    <span>{Region}</span>
                </div>
                <div className='action'>
                    <img src={edit} />
                    <img src={supprimer} />
                    <img src={change} />
                </div>
            </tbody>
        </div>
    )
}

function NewClients() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [nom, setNom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [quartier, setQuartier] = useState('');
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');

    const resetForm = () => {
        setNom('')
        setTelephone('')
        setQuartier('')
        setVille('')
        setEmail('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            Nom: nom,
            Ville: ville,
            Quartier: quartier,
            Ville: ville,
            Email: email,
            Telephone: telephone,
        }));

        try {
            const response = await axios.post('http://localhost:1337/api/clients', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Produit creer ', response.data);
            resetForm();

        } catch (error) {
            console.log(formData);
            console.error('Erreur lors de l\'ajout de la commande:', error);
        }
    };

    return (
        <div className="app">
            <div className="left-side">
                <div className='header'>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <p className='logo-text'>Bongo Space</p>
                    </div>
                    <div className='offre-bloc'>
                        <div className='offre'>
                            <span className='un'>Passer à un compte pro</span>
                            <span className='deux'>14.900/mois</span>
                        </div>
                        <span className='offre-texte'>En attente synchronisation. Verifiez votre connexion ...</span>
                    </div>
                </div>
                <div className='autre'>
                    <div className='corps'>
                        <div className='bloc1'>
                            <span>VOTRE ESPACE</span>
                            <Link to={`/`} className='Link-style'>
                                <div className='Actif-tableau'>
                                    <div className='Actif-menu'>
                                        <img src={category} alt="image" />
                                        <p>Tableau de bord</p>
                                    </div>
                                </div>
                            </Link>
                            <Menu image={clipboard} nom='Inventaire' Vector={Vector} liens={inventaire} />

                            <Menu_Actif image={calculator} nom='Ventes' liens={liens} />
                            <Menu image={bag} nom='Achats' Vector={Vector} liens={liens} />
                            <Menu image={wallet_money} nom='Finances' Vector={Vector} liens={liens} />
                            <Menu image={profile_2user} nom='Ressources humaines' Vector={Vector} liens={liens} />
                            <Menu image={chart} nom='Rapports' Vector={Vector} liens={liens} />
                        </div>
                        <div className='bloc1'>
                            <span>VOTRE MARKETING</span>
                            <Menu image={whatsapp} nom='whatsapp' Vector={Vector} liens={liens} />
                            <Menu image={discount_shape} nom='discount-shape' Vector={Vector} liens={liens} />
                            <Menu image={shop} nom='Shop' Vector={Vector} liens={liens} />
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='top'>
                            <div className='share'>
                                <span>Partager l’accès à votre espace</span>
                                <img src={share} alt="image" />
                            </div>
                            <div className='lien'>
                                <div>
                                    <img src={link} alt="image" />
                                    <span>bongo.space/sdfdeaf</span>
                                </div>
                                <div className='copier'>
                                    <img src={copy} alt="image" />
                                    <span>Copier</span>
                                </div>
                                {/* <img src={share} alt="image" /> */}
                            </div>
                        </div>
                        <hr />
                        <div className='bottom'>
                            <div>
                                <img src={profile_2user} alt="image" />
                                <div>
                                    <span>Votre Personnel</span>
                                    <p>3 Collaborateurs</p>
                                </div>
                            </div>
                            <div className='deux'>
                                <img src={user_cirlce_add} alt="image" />
                                <div>
                                    <span>Pass restant</span>
                                    <p>2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='top-side'>
                <span>Bon retour Jesse !</span>
                <div>
                    <div className="search">
                        <input type="text" placeholder="Rechercher" />
                        <img src={search_normal} alt="search_normal" />
                    </div>
                    <div>
                        <div className='notification'>
                            <img
                                src={notification}
                                alt="Image principale"
                                style={{
                                    objectFit: 'cover'
                                }}
                            />
                            <img
                                src={Ellipse}
                                alt="Petite image"
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                }}
                            />
                        </div>
                        <img src={pp} alt="photo de profile" style={{ borderRadius: '50%', width: '48px', height: '48px' }} />
                    </div>
                </div>
            </div>
            <div className='page page-client'>
                <span className='titre-texte'>Nouveau Clients</span>
                <div className='titre'>
                    <p>Général</p>
                    <span>Sélectionnez une catégorie pour rendre vos rapports plus détaillés. La description sera remplie lorsque l'article sera sélectionné dans une facture d'achat ou de vente.</span>
                </div>
                <div className='block'>
                    <div className='gauche gauche-client'>
                        <div className='nom nom-client'>
                            <div className='un'>
                                <label>Nom</label>
                                <input type='text' placeholder='Entrez Nom' value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div className='un'>
                                <label>Email</label>
                                <input type='text' placeholder='Entrez votre Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='un'>
                                <label>Telephone</label>
                                <input type='text' placeholder='Entrez Telephone' value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                            </div>
                        </div>
                        <div className='nom nom-client'>
                            <div className='un'>
                                <label>Ville</label>
                                <input type='text' placeholder='Entrez la ville' value={ville} onChange={(e) => setVille(e.target.value)} />
                            </div>
                            <div className='un'>
                                <label>Quartier</label>
                                <input type='text' placeholder='Entrez le quartier' value={quartier} onChange={(e) => setQuartier(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='droite-client'>
                        <p>CRM</p>
                        <span>Track every step of your customer journey, manage leads and opportunities, and analyze your sales pipeline</span>
                    </div>
                </div>
                <div className='save'>
                    <div>
                        <span className='annuler' onClick={resetForm}>Annuler</span>
                        <span className='enregistrer' onClick={handleSubmit}>Enregistrer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewClients;