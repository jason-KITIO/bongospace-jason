import '../../../css/Vente/Detail.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
import RectangleFacture from '../../../../images/RectangleFacture.svg'


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

function Detail() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];


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
            <div className='page'>
                <div className='page-block'>
                    <div className='header'>
                        <span>Jason KITIO</span>
                    </div>
                    <div className='sous-header'>
                        <div className='a'>
                            <div className='a1'><span>JK</span></div>
                            <div className='a2'>
                                <span>kanamax00@gmail.com</span>
                                <span>696354128</span>
                            </div>
                        </div>
                        <div className='b'>
                            <div className='b1'>
                                <p>0 Fr</p>
                                <hr />
                                <span>En retard</span>
                            </div>
                            <div className='b1'>
                                <p>0 Fr</p>
                                <hr />
                                <span>En retard</span>
                            </div>
                        </div>
                    </div>
                    <div className='details'>
                        <div className='a'>
                            <span>Ville</span>
                            <span>Region</span>
                            <span>Addressee</span>
                        </div>
                        <div className='b'>
                            <span>Factures</span>
                            <div className='details-facture-haut'>
                                <img src={RectangleFacture} />
                                <div className='details-facture-haut-div'>
                                    <span>
                                        Il y a pas encore de facture  poue ce client
                                        Creez une nouvelle facture maintenant
                                    </span>

                                    <div className='header'>
                                        <Link to={`/Vente/detail`} className='Link-style'>
                                            <p>Nouveau Client</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;