import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './left-side-bottom.css'; // Assurez-vous d'importer le fichier CSS

import bag from '../images/bag.svg'
import calculator from '../images/calculator.svg'
import category from '../images/category.svg'
import chart from '../images/chart.svg'
import clipboard from '../images/clipboard.svg'
import clipboard1 from '../images/clipboard1.svg'
import profile_2user from '../images/profile-2user.svg'
import wallet_money from '../images/wallet-money.svg'
import Vector from '../images/Vector.svg'
import whatsapp from '../images/whatsapp.svg'
import discount_shape from '../images/discount-shape.svg'
import shop from '../images/shop.svg'
import share from '../images/export.svg'
import link from '../images/link.svg'
import copy from '../images/copy.svg'
import user_cirlce_add from '../images/user-cirlce-add.svg'


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

const Menu_Actif = ({ image, nom }) => {
    return (
        <div className='Actif'>
            <div className='Actif-menu' style={{ justifyContent: 'flex-start' }}>
                <img src={image} alt="image" />
                <p>{nom}</p>
            </div>
        </div>
    )
}

// Composants pour chaque menu
const Menu1 = () => <div>Contenu du Menu 1</div>;
const Menu2 = () => <div>Contenu du Menu 2</div>;
const Menu3 = () => <div>Contenu du Menu 3</div>;
const Menu4 = () => <div>Contenu du Menu 4</div>;
const Menu5 = () => <div>Contenu du Menu 5</div>;
const Inventaire = () => <div>Contenu du Inventaire</div>;
const Ventes = () => <div>Contenu du Ventes</div>;


const Left_side_bottom = () => {

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

    const [activeMenu, setActiveMenu] = useState('Menu 1');

    const renderContent = () => {
        switch (activeMenu) {
            case 'Menu 1':
                return <Menu1 />;
            case 'Menu 2':
                return <Menu2 />;
            case 'Menu 3':
                return <Menu3 />;
            case 'Menu 4':
                return <Menu4 />;
            case 'Menu 5':
                return <Menu5 />;
            case 'Inventaire':
                return <Inventaire />;
            case 'Ventes':
                return <Ventes />;
            default:
                return <div>Veuillez sélectionner un menu.</div>;
        }
    };
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        navigate(`/Inventaire`);
    };

    const [sousMenusVisible, setSousMenusVisible] = useState(false);

    const toggleSousMenus = (nom) => {
        setSousMenusVisible(!sousMenusVisible);
        handleMenuClick(nom)
    };

    return (
        <div className="app-container">
            <div className="menu-container">
                <div
                    className={`menu-item ${activeMenu === 'Menu 1' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('Menu 1')}
                >
                    Menu 1
                </div>
                <div
                    className={`menu-item ${activeMenu === 'Menu 2' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('Menu 2')}
                >
                    Menu 2
                </div>
                <div
                    className={`menu-item ${activeMenu === 'Menu 3' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('Menu 3')}
                >
                    Menu 3
                </div>
                <div
                    className={`menu-item ${activeMenu === 'Menu 4' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('Menu 4')}
                >
                    Menu 4
                </div>
                <div
                    className={`menu-item ${activeMenu === 'Menu 5' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('Menu 5')}
                >
                    Menu 5
                </div>
            </div>
            <div className="content-container">
                {renderContent()}
            </div>

            <div className='autre'>
                <div className='corps'>
                    <div className='bloc1'>
                        <span>VOTRE ESPACE</span>
                        <Menu_Actif image={category} nom='Tableau de bord' />

                        <div className={`menu ${activeMenu === 'Inventaire' ? 'Actif' : ''}`} onClick={() => toggleSousMenus('Inventaire')} >
                            <div>
                                <div>
                                    <img src={activeMenu === 'Inventaire' ? clipboard1 : clipboard} alt="Clipboard" />
                                    <p style={{ marginRight: '10px' }}>Inventaire</p>
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
                        <div className={`menu ${activeMenu === 'Ventes' ? 'Actif' : ''}`} onClick={() => toggleSousMenus('Ventes')} >
                            <div>
                                <div>
                                    <img src={activeMenu === 'Ventes' ? calculator : calculator} alt="Clipboard" />
                                    <p style={{ marginRight: '10px' }}>Ventes</p>
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
    );
};

export default Left_side_bottom;