import '../../css/Inventaire/Ajouter.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import logo from '../../../logo.svg';

import bag from '../../../images/bag.svg'
import calculator from '../../../images/calculator.svg'
import category from '../../../images/category.svg'
import chart from '../../../images/chart.svg'
import clipboard from '../../../images/clipboard.svg'
import profile_2user from '../../../images/profile-2user.svg'
import wallet_money from '../../../images/wallet-money.svg'
import Vector from '../../../images/Vector.svg'
import whatsapp from '../../../images/whatsapp.svg'
import discount_shape from '../../../images/discount-shape.svg'
import shop from '../../../images/shop.svg'
import share from '../../../images/export.svg'
import link from '../../../images/link.svg'
import copy from '../../../images/copy.svg'
import user_cirlce_add from '../../../images/user-cirlce-add.svg'
import search_normal from '../../../images/search-normal.svg'
import notification from '../../../images/notification.svg'
import pp from '../../../images/pp.png'
import Ellipse from '../../../images/Ellipse.svg'
import info_circle from '../../../images/info-circle.svg'
import arrow_circle_right from '../../../images/arrow-circle-right.svg'
import trend_up from '../../../images/trend-up.svg'
import Frame from '../../../images/Frame.svg'
import porduit from '../../../images/porduit.svg'
import edit from '../../../images/edit.svg'
import supprimer from '../../../images/delete.svg'
import change from '../../../images/change.svg'


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
    const [selectedPdf, setSelectedPdf] = useState(null);

    const handlePdfSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedPdf(file);
        } else {
            alert('Please select a PDF file.');
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={handlePdfSelect}
                style={{ display: 'none' }}
                id="pdfInput"
            />
            <label htmlFor="pdfInput">
                <button onClick={() => document.getElementById('pdfInput').click()}>
                    Sélectionner un fichier PDF
                </button>
            </label>

            {selectedPdf && (
                <div style={{ marginTop: '20px' }}>
                    <p>Fichier PDF sélectionné: {selectedPdf.name}</p>
                </div>
            )}
        </div>
    );
}


const EditProduit = () => {
    const { produitId } = useParams();

    const [produit, setProduit] = useState(null);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategories] = useState('');
    const [Qte_stock, setQte_stock] = useState(0);
    const [Qte_critique, setQte_critique] = useState(0);
    const [prix_vente, setPrix_vente] = useState(0);
    const [prix_achat, setPrix_achat] = useState(0);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/produits/${produitId}`);
                setProduit(response.data);
                setNom(response.data.nom);
                setDescription(response.data.description);
                setCategorie(response.data.categorie);
                setQte_stock(response.data.Qte_stock);
                setQte_critique(response.data.Qte_critique);
                setPrix_vente(response.data.prix_vente);
                setPrix_achat(response.data.prix_achat);
                console.log(" le nom", response);
                console.log(" le nom", nom);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
            }
        };

        fetchProduit();
    }, [produitId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:1337/api/produits/${produitId}`, {
                nom,
                description,
                categorie,
                Qte_stock,
                Qte_critique,
                prix_vente,
                prix_achat,
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNom(nom);
        setDescription(description);
        setCategorie(categorie);
        setQte_stock(Qte_stock);
        setQte_critique(Qte_critique);
        setPrix_vente(prix_vente);
        setPrix_achat(prix_achat);
    };



    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [Categorie, setCategorie] = useState(false);

    const toggleCategorie = () => {
        setCategorie(!Categorie);
    };

    if (!produit) {
        return <div>Chargement...</div>;
    }

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
            <div className="page">
                <span className="titre-texte">Modifier Article</span>
                <div className="titre">
                    <p>Général</p>
                    <span>Sélectionnez une catégorie pour rendre vos rapports plus détaillés. La description sera remplie lorsque l'article sera sélectionné dans une facture d'achat ou de vente.</span>
                </div>
                <div className="block">
                    <div className="gauche">
                        <div className="nom">
                            <div className="un">
                                <label>Nom</label>
                                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div className="deux">
                                <label>Catégorie</label>
                                <select name="categorie" id="categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                                    <option value="categorie">-- Sélectionner une catégorie --</option>
                                </select>
                            </div>
                        </div>
                        <div className="Description">
                            <label>Description</label>
                            <textarea name="Description" cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="nom">
                            <div className="un">
                                <label>Quantité en stock</label>
                                <input type="text" value={Qte_stock} onChange={(e) => setQte_stock(e.target.value)} />
                            </div>
                            <div className="un">
                                <label>Quantité critique</label>
                                <input type="text" value={Qte_critique} onChange={(e) => setQte_critique(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="droite">
                        <div className="image">
                            <p>Image de l'article</p>
                            <ImageSelector />
                        </div>
                        <div className="Fiche">
                            <p>Fiche technique</p>
                            <FicheSelector />
                        </div>
                    </div>
                </div>
                <div className="save">
                    <div>
                        <span className="annuler" onClick={handleCancel}>Annuler</span>
                        <span className="enregistrer" onClick={handleSave}>Enregistrer</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditProduit;
