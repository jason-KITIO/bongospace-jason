import '../../../css/Vente/Commande.css';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importer les styles par défaut

import axios from 'axios';
import Vector from '../../../../images/Vector.svg'
import edit from '../../../../images/edit.svg'
import supprimer from '../../../../images/delete.svg'
import change from '../../../../images/change.svg'
import box_search from '../../../../images/box-search.svg'
import arrow_right from '../../../../images/arrow-right.svg'
import arrow_left from '../../../../images/arrow-left.svg'

import truck_time from '../../../../images/truck-time.svg'
import tick_circle from '../../../../images/tick-circle.svg'
import empty_wallet_time from '../../../../images/empty-wallet-time.svg'
import bag_cross from '../../../../images/bag-cross.svg'

function LivreComponent() {
    return (
        <div className='statut1 livre'>
            <img src={tick_circle} alt='tick-circle' />
            <p>Livré</p>
        </div>
    );
}

function EnCoursComponent() {

    return <div className='statut1 en-cours'>
        <img src={truck_time} alt='truck-time' />
        <p>Livraison en cours</p>
    </div>;
}

function AnnuleComponent() {
    return <div className='statut1 annule-statut'>
        <img src={bag_cross} alt='bag-cross' />
        <p>Commande annulée</p>
    </div>;
}

function EnAttenteComponent() {
    return <div className='statut1 En-attente'>
        <img src={empty_wallet_time} alt='empty-wallet-time' />
        <p>Payement en attente</p>
    </div>;
}

const Commande = ({ id, Numero, Date, Montant, Statut, paiement }) => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log(id);
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

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/Vente/commande/EditCommande/${id}`); // Assuming Numero is unique
    };

    const handleDelete = async () => {
        try {
            const reponse = await axios.delete(`http://localhost:1337/api/commandes/${id}`); // Assuming you have the ID
            // Optionally refresh the list or remove the item from state
        } catch (error) {
            console.error("Error deleting commande:", error);
        }
    };

    const StatutPossible = ['Livre', 'Livraison en cours', 'Commande annule', 'Payement en attente'];

    const message = Statut;
    return (
        <div>
            <tbody className='commande'>
                <div>
                    <p>{Numero}</p>
                </div>
                <div>
                    <p>{Date}</p>
                </div>
                <div>
                    <p>{Montant}</p>
                </div>
                <div className='Block-statut1'>
                    {message === 'Livre' && <LivreComponent />}
                    {message === 'Livraison en cours' && <EnCoursComponent />}
                    {message === 'Commande annule' && <AnnuleComponent />}
                    {message === 'Payement en attente' && <EnAttenteComponent />}
                    {/* {messages.map((message, index) => (
                        <div key={index}>
                            {message === 'bonjour' ? (
                                <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', margin: '5px 0' }}>
                                    Div 1: Bonjour
                                </div>
                            ) : (
                                <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', margin: '5px 0' }}>
                                    Div 2: Aurevoir
                                </div>
                            )}
                        </div>
                    ))} */}
                </div>
                <div>
                    <span>{paiement || 'Aucun paiement'}</span>
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
    )
}

function Commandes() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];
    const [startDate, setStartDate] = useState(null);

    const [commandes, setCommandes] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [filteredCommandes, setFilteredCommandes] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(2); // Nombre d'éléments par page

    const [commandesTerminees, setCommandesTerminees] = useState(0);

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/commandes`, {
                    params: {
                        pagination: {
                            page: currentPage,
                            pageSize: pageSize
                        }
                    }
                });
                setCommandes(response.data.data);
                setFilteredCommandes(response.data.data); // Initialiser avec toutes les commandes
                setTotalPages(response.data.meta.pagination.pageCount); // Récupérer le nombre total de pages
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes:", error);
            }
        };

        const fetchCommandesTerminees = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/commandes', {
                    params: {
                        filters: {
                            Statut: {
                                $eq: 'Livraison en cours'
                            }
                        }
                    }
                });
                setCommandesTerminees(response.data.meta.pagination.total);
                // console.log({ commandesTerminees });
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes terminées:", error);
            }
        };

        fetchCommandesTerminees();
        fetchCommandes();
    }, [currentPage, pageSize]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);

        if (selectedStatus) {
            const filtered = commandes.filter(commande => commande.attributes.Statut === selectedStatus);
            setFilteredCommandes(filtered);
        } else {
            setFilteredCommandes(commandes); // Réinitialiser si aucun filtre n'est sélectionné
        }
    };

    const handleSearch = () => {
        if (searchDate) {
            const filtered = commandes.filter(commande =>
                commande.attributes.Date === searchDate
            );
            setFilteredCommandes(filtered);
        } else {
            setFilteredCommandes(commandes); // Réinitialiser si aucune date n'est saisie
        }
    };

    return (
        <div className='page'>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className='activite'>
                        <div className='header'>
                            <span>Activités liées à vos commande</span>
                            <Link to={`/Vente/commande/addCommande`} className='Link-style'>
                                <p>Nouvelle commande</p>
                            </Link>
                        </div>

                        <div className='list-activite'>
                            <div>
                                <span>Commandes en cours</span>
                                <p>{commandesTerminees}</p>
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
                                <span>Nombre de catégories</span>
                                <p>2</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='corps-header'>
                            <p>Liste des commande</p>
                            <div className='corps-header-div'>
                                <input
                                    type='date'
                                    name='search'
                                    id='search'
                                    placeholder="Taper le nom de l\'élément que vous souhaitez trouver"
                                    value={searchDate}
                                    onChange={(e) => setSearchDate(e.target.value)}
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                />

                                {/* <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="custom-datepicker" // Appliquez une classe CSS personnalisée
                                /> */}

                                <div className='div-img' onClick={handleSearch}>
                                    <img src={box_search} alt='box_search' />
                                </div>
                            </div>
                            {/* <div>
                                <label>Filtrer par statut: </label>
                                <select value={statusFilter} onChange={handleFilterChange}>
                                    <option value="">Sélectionnez un statut</option>
                                    <option value="Livraison en cours">Livraison en cours</option>
                                    <option value="Livre">Livré</option>
                                    <option value="Commande annule">Commande annulée</option>
                                    <option value="Payement en attente">Payement en attente</option>
                                </select>
                            </div> */}
                        </div>
                        <div className='corps col-6'>
                            <thead>
                                <div>
                                    <p>Numero</p>
                                </div>
                                <div>
                                    <p>Date</p>
                                </div>
                                <div>
                                    <p>Montant</p>
                                </div>
                                <div>
                                    <p>Statut</p>
                                </div>
                                <div>
                                    <p>paiement</p>
                                </div>
                                <div>
                                    <p>Action</p>
                                </div>
                            </thead>
                            <div className='list-produit'>
                                {filteredCommandes.map(commande => (
                                    <Commande
                                        id={commande.id}
                                        Numero={commande.attributes.Numero}
                                        Date={commande.attributes.Date}
                                        Montant={commande.attributes.Montant}
                                        Statut={commande.attributes.Statut}
                                        paiement={commande.attributes.paiement}
                                    />
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
        </div>
    );
}

export default Commandes;