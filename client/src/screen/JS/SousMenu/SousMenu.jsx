import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../../logo.svg';
import '../css/Home.css';
import Inventaire from './inventaire';
import Ajouter from './Inventaire/Ajouter';
import Televerser from './Inventaire/Televerser';
import Edit from './Inventaire/Edit';
import Clients from './Vente/clients/client';
import Factures from './Vente/facture/facture';
import Commande from './Vente/commande/commande';


import Home_Container from '../../Components/Home_Container';

import bag from '../../images/bag.svg'
import calculator from '../../images/calculator.svg'
import category from '../../images/category.svg'
import category1 from '../../images/category1.svg'
import chart from '../../images/chart.svg'
import clipboard from '../../images/clipboard.svg'
import clipboard1 from '../../images/clipboard1.svg'
import profile_2user from '../../images/profile-2user.svg'
import wallet_money from '../../images/wallet-money.svg'
import Vector from '../../images/Vector.svg'
import whatsapp from '../../images/whatsapp.svg'
import discount_shape from '../../images/discount-shape.svg'
import shop from '../../images/shop.svg'
import share from '../../images/export.svg'
import link from '../../images/link.svg'
import copy from '../../images/copy.svg'
import user_cirlce_add from '../../images/user-cirlce-add.svg'
import search_normal from '../../images/search-normal.svg'
import notification from '../../images/notification.svg'
import pp from '../../images/pp.png'
import Ellipse from '../../images/Ellipse.svg'
import info_circle from '../../images/info-circle.svg'
import arrow_circle_right from '../../images/arrow-circle-right.svg'
import trend_up from '../../images/trend-up.svg'
import Frame from '../../images/Frame.svg'


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



const Ventes = () => <div>Contenu du Ventes</div>;



function Home() {


    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const vente = [
        { url: '/Vente/client', label: 'Client' },
        { url: '/Vente/factures', label: 'Facture' },
    ]


    const navigate = useNavigate();

    const { state } = useLocation();
    const initialActiveMenu = state?.activeMenu || 'Home_Container';
    const [activeMenu, setActiveMenu] = useState(initialActiveMenu);

    const [navigation, setNavigation] = useState('Bon retour Jesse !');
    const [sousMenu, setSousMenu] = useState(' azertyu');
    const [sousMenusVisible, setSousMenusVisible] = useState(false);
    const [sousMenusVisibleInventaire, setSousMenusVisibleInventaire] = useState(false);
    const [sousMenusVisibleVentes, setSousMenusVisibleVentes] = useState(false);

    const handleMenuClick = (menu) => {
        setNavigation(null)
        setActiveMenu(menu);
        // navigate(`/Inventaire`);
        setNavigation('Accueil ' + ' / ' + menu + sousMenu)
    };


    const toggleSousMenusInventaire = (nom) => {
        setSousMenusVisibleInventaire(!sousMenusVisible);
    };
    const toggleSousMenusVentes = (nom) => {
        setSousMenusVisible(!sousMenusVisible);
    };
    const toggleSousMenus = (nom) => {
        setSousMenusVisible(!sousMenusVisible);
    };


    const renderContent = () => {
        switch (activeMenu) {
            case 'Inventaire':
                return <Inventaire />;
            case 'Ajouter':
                return <Ajouter />;
            case 'Televerser':
                return <Televerser />;
            case 'Ventes':
                return <Ventes />;
            case 'Clients':
                return <Clients />;
            case 'Factures':
                return <Factures />;
            case 'Commande':
                return <Commande />;
            case 'Home_Container':
                return <Home_Container />;
            default:
                return <Home_Container />;
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

                            <div className={`menu ${activeMenu === 'Home_Container' ? 'Actif' : ''}`} onClick={() => {
                                handleMenuClick('Home_Container')
                                setNavigation(`{<p>} Accueil {</p>} / Dashboard`)
                            }
                            } >

                                <div>
                                    <div>
                                        <img src={activeMenu === 'Home_Container' ? category : category1} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Tableau de bord</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`menu ${activeMenu === 'Inventaire' ? 'Actif' : ''}`} onClick={() => { setSousMenusVisibleInventaire(!sousMenusVisibleInventaire); }} >
                                <div>
                                    <div onClick={() => handleMenuClick('Inventaire')}>
                                        <img src={activeMenu === 'Inventaire' ? clipboard1 : clipboard} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Inventaire</p>
                                    </div>
                                    <img src={Vector} alt="image" />
                                </div>
                                {sousMenusVisibleInventaire && (
                                    <div className='visible'>
                                        <p className='texte' onClick={() => {
                                            setActiveMenu('Inventaire');
                                            setSousMenu('/ Ajouter');
                                            handleMenuClick('Ajouter');
                                        }} >Ajouter un produits</p>
                                        <p className='texte' onClick={() => {
                                            setSousMenu('/ Televerser')
                                            handleMenuClick('Televerser')
                                        }} >Televerser un fichier excel</p>
                                    </div>
                                )}
                            </div>
                            <div className={`menu ${activeMenu === 'Ventes' ? 'Actif' : ''}`} onClick={() => setSousMenusVisibleVentes(!sousMenusVisibleVentes)} >
                                <div>
                                    <div>
                                        <img src={activeMenu === 'Ventes' ? calculator : calculator} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Ventes</p>
                                    </div>
                                    <img src={Vector} alt="image" />
                                </div>
                                {sousMenusVisibleVentes && (
                                    <div className='visible'>
                                        <p className='texte' onClick={() => {
                                            setSousMenu('/ Client');
                                            handleMenuClick('Clients');
                                        }} >Client</p>
                                        <p className='texte' onClick={() => {
                                            setSousMenu('/ Facture')
                                            handleMenuClick('Factures')
                                        }} >Facture</p>
                                        <p className='texte' onClick={() => {
                                            setSousMenu('/ Commande')
                                            handleMenuClick('Commande')
                                        }} >Commande</p>
                                    </div>
                                )}
                            </div>
                            <div className={`menu ${activeMenu === 'Achats' ? 'Actif' : ''}`} onClick={() => toggleSousMenus('Achats')} >
                                <div>
                                    <div>
                                        <img src={activeMenu === 'Achats' ? bag : bag} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Achats</p>
                                    </div>
                                    <img src={Vector} alt="image" />
                                </div>
                                {sousMenusVisible && (
                                    <div className='visible'>
                                        {inventaire.map((lien, index) => (
                                            <p key={index}>
                                                <Link to={lien.url} className='Link-style'>{lien.label}</Link>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={`menu ${activeMenu === 'Finances' ? 'Actif' : ''}`} onClick={() => toggleSousMenus('Finances')} >
                                <div>
                                    <div>
                                        <img src={activeMenu === 'Finances' ? wallet_money : wallet_money} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Finances</p>
                                    </div>
                                    <img src={Vector} alt="image" />
                                </div>
                                {sousMenusVisible && (
                                    <div className='visible'>
                                        {inventaire.map((lien, index) => (
                                            <p key={index}>
                                                <Link to={lien.url} className='Link-style'>{lien.label}</Link>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={`menu ${activeMenu === 'Ressources_Humaines' ? 'Actif' : ''}`} onClick={() => toggleSousMenus('Ressources_Humaines')} >
                                <div>
                                    <div>
                                        <img src={activeMenu === 'Ressources_Humaines' ? profile_2user : profile_2user} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Ressources humaines</p>
                                    </div>
                                    <img src={Vector} alt="image" />
                                </div>
                                {sousMenusVisible && (
                                    <div className='visible'>
                                        {inventaire.map((lien, index) => (
                                            <p key={index}>
                                                <Link to={lien.url} className='Link-style'>{lien.label}</Link>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={`menu ${activeMenu === 'Rapports' ? 'Actif' : ''}`} onClick={() => toggleSousMenus('Rapports')} >
                                <div>
                                    <div>
                                        <img src={activeMenu === 'Rapports' ? chart : chart} alt="Clipboard" />
                                        <p style={{ marginRight: '10px' }}>Rapports</p>
                                    </div>
                                    <img src={Vector} alt="image" />
                                </div>
                                {sousMenusVisible && (
                                    <div className='visible'>
                                        {inventaire.map((lien, index) => (
                                            <p key={index}>
                                                <Link to={lien.url} className='Link-style'>{lien.label}</Link>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
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
                <span>{navigation}</span>
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
            <Edit />
        </div >
    );
}

export default Home;
