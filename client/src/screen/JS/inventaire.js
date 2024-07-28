import '../css/inventaire.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Vector from '../../images/Vector.svg'
import edit from '../../images/edit.svg'
import supprimer from '../../images/delete.svg'
import change from '../../images/change.svg'
import box_search from '../../images/box-search.svg'
import arrow_right from '../../images/arrow-right.svg'
import arrow_left from '../../images/arrow-left.svg'

const Produit = ({ product, categoryName }) => {

    const { Nom, Description_longue, Qte_stock, Qte_citique, Prix_vente, Prix_achat } = product.attributes;
    const NomCategorie = product.attributes.category.data?.attributes.Nom || 'Aucune catégorie';
    const navigate = useNavigate();

    const handleEdit = () => {

        // navigate(`/`, { state: { activeMenu: 'Edit' } });
        navigate(`/Inventaire/edit-produit/${product.id}`);
    };

    const handleDelete = async () => {
        try {
            const reponse = await axios.delete(`http://localhost:1337/api/produits/${product.id}`); // Assuming you have the ID
            // Optionally refresh the list or remove the item from state
        } catch (error) {
            console.error("Error deleting commande:", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <tbody>
                <div className='nom'>
                    {/* <img src={image} /> */}
                    {/* <div> */}
                    <p>{Nom}</p>
                    {/* <span>{Description_longue}</span> */}
                    {/* </div> */}
                </div>

                <div>
                    <p>{NomCategorie}</p>
                </div>
                <div>
                    <p>{Qte_stock}</p>
                    {/* <span>{Qte_citique}</span> */}
                </div>
                <div>
                    <p>{Prix_vente}</p>
                    {/* <span>{Prix_achat}</span> */}
                </div>
                <div>
                    <div className="kebab-menu-container" ref={menuRef}>
                        <button className="kebab-button" onClick={toggleMenu}>
                            ⋮
                        </button>
                        {isOpen && (
                            <div className="action">
                                <img src={edit} alt="Edit" onClick={handleEdit} />
                                <img src={supprimer} alt="Supprimer" onClick={handleDelete} />
                                <img src={change} alt="Changer" />
                            </div>
                        )}
                    </div>
                </div>
            </tbody>
        </div>
    );
};

const ItemsPerPage = 10;

function Inventaire() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [produits, setProduits] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [produitsPagines, setProduitsPagines] = useState([]);
    // const [categories, setCategories] = useState([]);

    // const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/produits?populate=*');
                setProduits(response.data.data);
                setTotalPages(Math.ceil(response.data.meta.pagination.total / ItemsPerPage));
                setTotal(response.data.meta.pagination.total);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories :', error);
                setError(error);
            }
        };

        fetchProduits();
    }, []);

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    const filteredProduits = produits.filter(produit =>
        produit.attributes.Nom.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const displayedProduits = filteredProduits.slice((currentPage - 1) * ItemsPerPage, currentPage * ItemsPerPage);

    return (
        <div className='page'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className='activite'>
                    <p>Activités liées à votre inventaire</p>
                    <div className='list-activite'>
                        <div>
                            <span>Commandes en cours</span>
                            <p>13</p>
                        </div>
                        <div>
                            <span>Nouveaux clients</span>
                            <p>6</p>
                        </div>
                        <div>
                            <span>Livraison</span>
                            <p>2</p>
                        </div>
                        <div>
                            <span>Nombre de produit</span>
                            <p>{total}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='corps-header'>
                        <p>Liste des produits</p>
                        <div className='corps-header-div'>
                            <input
                                type='text'
                                name='search'
                                id='search'
                                placeholder="Taper le nom de l\'élément que vous souhaitez trouver"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className='div-img'>
                                <img src={box_search} alt='box_search' />
                            </div>
                        </div>
                    </div>
                    <div className='corps'>
                        <thead>
                            <div>
                                <p>Nom</p>
                            </div>
                            <div>
                                <p>Catégorie</p>
                            </div>
                            <div>
                                <p>Quantité en stock</p>
                            </div>
                            <div>
                                <p>Prix en vente</p>
                            </div>
                            <div>
                                <p>Action</p>
                            </div>
                        </thead>
                        <div className='list-produit'>
                            {displayedProduits.map((produit) => (
                                <div key={produit.id}>
                                    <Produit product={produit} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='block-pagination'>
                <div className="pagination">
                    <div className='div-img' onClick={handlePrevPage} disabled={currentPage === 1}>
                        <img src={arrow_left} alt='arrow_left' />
                    </div>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={currentPage === pageNumber ? 'active' : ''}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            <p>Page</p>
                            {pageNumber}
                        </button>
                    ))}
                    <div className='div-img' onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <img src={arrow_right} alt='arrow_right' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inventaire;