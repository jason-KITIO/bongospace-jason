import '../../css/Inventaire/Televerser.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';


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

import Rectangle4 from '../../../images/Rectangle 4.svg'

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
        <tbody>
            <div className='nom'>
                {/* <img src={image || porduit} alt={nom} /> */}
                <div>
                    <p>{nom}</p>
                    {/* <span>{description}</span> */}
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
                <p>{prix_vente} Fcfa</p>
                <span>{prix_achat} Fcfa</span>
            </div>
            <div className='action'>
                <img src={edit} />
                <img src={supprimer} />
                <img src={change} />
            </div>
        </tbody>
    );
};


function Televerser() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [Categorie, setCategorie] = useState(false);

    const toggleCategorie = () => {
        setCategorie(!Categorie);
    };

    const [excelData, setExcelData] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.xlsx, .xls' });

    const uploadDataToStrapi = async () => {
        try {
            setLoading(true);
            for (const product of excelData) {
                await axios.post('http://localhost:1337/api/produits', {
                    data: {
                        Nom: product.Nom,
                        Description_longue: product.Description,
                        Qte_stock: product.Quantite_en_stock,
                        Qte_citique: product.Quantite_critique,
                        Prix_vente: product.Prix_de_vente,
                        Prix_achat: product.Prix_d_achat,
                    },
                });
            }
            console.log('Data uploaded to Strapi successfully');
            setLoading(false);
        } catch (error) {
            console.error('Error uploading data to Strapi:', error);
            setLoading(false);
        }
    };

    return (
        <div className='page'>
            {excelData ? (
                <>
                    <span className='titre-texte'>Importer Articles</span>
                    <table className='corps'>
                        <thead>
                            <div>
                                <p>Nom</p>
                                <span>Description</span>
                            </div>
                            <div className='block1'>
                                <div>
                                    <p>Categorie</p>
                                </div>
                                <div>
                                    <p>Quantite en stock</p>
                                    <span>Quantite critique</span>
                                </div>
                                <div>
                                    <p>Prix en vente</p>
                                    <span>Prix d'achat</span>
                                </div>
                            </div>
                            <div>
                                <p>Action</p>
                            </div>
                        </thead>
                        <div className='list-produit list-produit-televerser'>
                            {excelData.map((product, index) => (
                                <Produit
                                    key={index}
                                    image={product.Image}
                                    nom={product.Nom}
                                    description={product.Description}
                                    categorie={product.Categorie}
                                    Qte_stock={product.Quantite_en_stock}
                                    Qte_critique={product.Quantite_critique}
                                    prix_vente={product.Prix_de_vente}
                                    prix_achat={product.Prix_d_achat}
                                />
                            ))}
                        </div>
                    </table>
                </>
            ) : (
                <>
                    <span className='titre-texte'>Importer Articles</span>
                    <span className='soustitre-texte'>Glisser-déposer un fichier</span>
                    <span className='soustitre-texte'>XLS,XLSX jusqu'à 500 lignes</span>

                    <div {...getRootProps()} className='Rectangle4'>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Déposez le fichier Excel ici...</p>
                        ) : (
                            <img src={Rectangle4} alt="Upload zone" />
                        )}
                    </div>
                </>
            )}
            <div className='save'>
                <div>
                    <span className='annuler'>Annuler</span>
                    {loading ? (
                        <span className='enregistrer'>Importation en cours...</span>
                    ) : (
                        <Link to={`/Inventaire`} className='Link-style'>
                            <span className='enregistrer' onClick={uploadDataToStrapi}>Importer</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};


export default Televerser;
