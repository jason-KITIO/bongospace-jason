import '../../css/Inventaire/Ajouter.css'

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import logo from '../../../logo.png';

import bag from '../../../images/bag.png'
import calculator from '../../../images/calculator.png'
import category from '../../../images/category.svg'
import chart from '../../../images/chart.png'
import clipboard from '../../../images/clipboard.svg'
import profile_2user from '../../../images/profile-2user.png'
import wallet_money from '../../../images/wallet-money.png'
import Vector from '../../../images/Vector.png'
import whatsapp from '../../../images/whatsapp.png'
import discount_shape from '../../../images/discount-shape.png'
import shop from '../../../images/shop.png'
import share from '../../../images/export.png'
import link from '../../../images/link.png'
import copy from '../../../images/copy.png'
import user_cirlce_add from '../../../images/user-cirlce-add.png'
import search_normal from '../../../images/search-normal.png'
import notification from '../../../images/notification.png'
import pp from '../../../images/pp.png'
import Ellipse from '../../../images/Ellipse.png'
import info_circle from '../../../images/info-circle.png'
import arrow_circle_right from '../../../images/arrow-circle-right.png'
import trend_up from '../../../images/trend-up.png'
import Frame from '../../../images/Frame.png'
import porduit from '../../../images/porduit.png'
import edit from '../../../images/edit.png'
import supprimer from '../../../images/delete.png'
import change from '../../../images/change.png'


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

const Facture = ({ Nom, Ouvert_par, prix }) => {
    return (
        <div className='Facture'>
            <div className='Titre'>
                <span>{Nom}</span>
                <div>
                    Ouvert par
                    <span>{Ouvert_par}</span>
                </div>
            </div>
            <div className='deux'>
                <span>{prix}</span>
                <p>FCFA</p>
            </div>
        </div>
    )
}

const Haut = ({ titre, nombre, evolution, total }) => {
    return (
        <div className='haut-Component'>
            <span className='titre'>{titre}</span>
            <span className='nombre'>{nombre}</span>
            <div>
                <img src={trend_up} alt='trend_up' />
                <span>{evolution}</span>
            </div>
            <span className='total'>{total}</span>
        </div>
    )
}

const Barre = ({ taille, affiche }) => {
    return (
        <div className='barre'>
            <div
                style={{
                    objectFit: 'cover',
                    width: '11px',
                    height: '70px',
                    background: '#A7E5B1',
                    borderRadius: '10px'
                }}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '11px',
                    height: taille,
                    background: '#24BD3D',
                    borderRadius: '10px'
                }}
            ></div>
            <p className='valuer' style={{ display: affiche }}>230.145</p>
            <div
                style={{
                    position: 'absolute',
                    top: '-7px',
                    left: '2px',
                    width: '6px',
                    height: '6px',
                    background: '#24BD3D',
                    borderRadius: '10px',

                    display: affiche
                }}
            ></div>
        </div>
    )
}

const Produit = ({ image, nom, description, categorie, Qte_stock, Qte_critique, prix_vente, prix_achat }) => {
    return (
        <div>
            <tbody>
                <div className='nom'>
                    <img src={image} />
                    <div>
                        <p>{nom}</p>
                        <span>{description}</span>
                    </div>
                </div>
                <div>
                    <p>{categorie}</p>
                </div>
                <div>
                    <p>{Qte_stock}</p>
                    <span>{Qte_critique}</span>
                </div>
                <div>
                    <p>{prix_vente}</p>
                    <span>{prix_achat}</span>
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

function ImageSelector() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
                id="imageInput"
            />
            <label htmlFor="imageInput">
                <button onClick={() => document.getElementById('imageInput').click()}>
                    Sélectionner une image
                </button>
            </label>

            {selectedImage && (
                <div style={{ marginTop: '20px' }}>
                    <div>
                        <img
                            className='img-selection'
                            src={selectedImage}
                            alt="Selected"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function FicheSelector() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePdfSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="pdf/*"
                onChange={handlePdfSelect}
                style={{ display: 'none' }}
                id="pdfInput"
            />
            <label htmlFor="pdfInput">
                <button onClick={() => document.getElementById('pdfInput').click()}>
                    Sélectionner un fichier pdf
                </button>
            </label>

            {selectedImage && (
                <div style={{ marginTop: '20px' }}>
                    <div>
                        <img
                            className='img-selection'
                            src={selectedImage}
                            alt="Selected"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
function Ajouter() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [Categorie, setCategorie] = useState(false);

    const toggleCategorie = () => {
        setCategorie(!Categorie);
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
                            <Menu_Actif image={clipboard} nom='Inventaire' liens={inventaire} />

                            <Menu image={calculator} nom='Ventes' Vector={Vector} liens={liens} />
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
                <span className='titre-texte'>Nouveau Article</span>
                <div className='titre'>
                    <p>Général</p>
                    <span>Sélectionnez une catégorie pour rendre vos rapports plus détaillés. La description sera remplie lorsque l'article sera sélectionné dans une facture d'achat ou de vente.</span>
                </div>
                <div className='block'>
                    <div className='gauche'>
                        <div className='type'>
                            <p>Type</p>
                            <div>
                                <p className='produit'>Produit</p>
                                <p className='service'>Service</p>
                            </div>
                        </div>
                        <div className='nom'>
                            <div className='un'>
                                <label>Nom</label>
                                <input type='text' placeholder='Entrez Nom' />
                            </div>
                            <div className='deux'>
                                <label>Categorie</label>
                                <select name="categorie" id="categorie">
                                    <option value="categorie" className='un'>-- Selectionner  categorie --</option>
                                </select>
                            </div>

                            {/* <div onClick={toggleCategorie} className='menu'>
                        <div>
                                <div>
                                    <p style={{ marginRight: '10px' }}>-- Selectionner  categorie --</p>
                                </div>
                            <img src={Vector} alt="image" />
                        </div>
                        {Categorie && (
                            <div className='visible'>
                                <p>Categorie 1</p>
                            </div>
                        )}
                    </div> */}
                        </div>
                        <div className='Description'>
                            <label>Description</label>
                            <textarea name="Description" cols="30" rows="5"></textarea>
                        </div>
                        <div className='nom'>
                            <div className='un'>
                                <label>Quantite en stock</label>
                                <input type='text' placeholder='Entrez quantity en stock' />
                            </div>
                            <div className='un'>
                                <label>Quantite critique</label>
                                <input type='text' placeholder='Entrez quantite critique' />
                            </div>
                        </div>

                        <div className='titre'>
                            <p>Facturation</p>
                            <span>Les informations de vente sont utilisées dans les factures émises, et les informations d'achat sont utilisées dans les factures reçues. La taxe sera appliquée à la fois sur les achats et les ventes.</span>
                        </div>
                        <div className='nom'>
                            <div className='un'>
                                <label>Prix d’achat</label>
                                <input type='text' placeholder="Entrez Prix d'achat" />
                            </div>
                            <div className='un'>
                                <label>Prix de vente</label>
                                <input type='text' placeholder='Entrez Prix de vente' />
                            </div>
                        </div>
                    </div>
                    <div className='droite'>
                        <div className='image'>
                            <p>Image de l'article</p>
                            <ImageSelector />

                        </div>
                        <div className='Fiche'>
                            <p>Fiche technique</p>
                            <FicheSelector />
                        </div>
                    </div>
                </div>
                <div className='save'>
                    <div>
                        <span className='annuler'>Annuler</span>
                        <span className='enregistrer'>Enregistrer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ajouter;
