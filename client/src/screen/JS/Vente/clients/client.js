import '../../../css/Vente/clients.css';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import edit from '../../../../images/edit.svg'
import supprimer from '../../../../images/delete.svg'
import change from '../../../../images/change.svg'
import box_search from '../../../../images/box-search.svg'

import arrow_right from '../../../../images/arrow-right.svg'
import arrow_left from '../../../../images/arrow-left.svg'

import axios from 'axios';

const Produit = ({ id, Nom, Email, Telephone, Ville, Quartier }) => {

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
        navigate(`/Vente/editClient/${id}`); // Assuming Numero is unique
    };

    const handleDelete = async () => {
        try {
            const reponse = await axios.delete(`http://localhost:1337/api/clients/${id}`); // Assuming you have the ID
            // Optionally refresh the list or remove the item from state
        } catch (error) {
            console.error("Error deleting commande:", error);
        }
    };

    return (
        <div>
            <tbody className='client'>
                <div>
                    <p>{Nom}</p>
                </div>
                <div>
                    <p>{Email}</p>
                </div>
                <div>
                    {/* <p>{Email}</p> */}
                    <p>{Telephone}</p>
                </div>
                <div>
                    {/* <p>{Ville}</p> */}
                    <p>{Quartier}</p>
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

function Clients() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [startDate, setStartDate] = useState(null);

    const [clients, setClients] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(2); // Nombre d'éléments par page

    const [commandesTerminees, setCommandesTerminees] = useState(0);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/clients`, {
                    params: {
                        pagination: {
                            page: currentPage,
                            pageSize: pageSize
                        }
                    }
                });
                setClients(response.data.data);
                setFilteredClients(response.data.data); // Initialiser avec toutes les commandes
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
        fetchClients();
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

    const handleSearch = () => {
        if (searchDate) {
            const filtered = clients.filter(client =>
                client.attributes.Date === searchDate
            );
            setFilteredClients(filtered);
        } else {
            setFilteredClients(clients); // Réinitialiser si aucune date n'est saisie
        }
    };

    return (
        <div className='page'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className='activite'>
                    <div className='header'>
                        <span>Activités liées à votre inventaire</span>
                        <Link to={`/Vente/newClients`} className='Link-style'>
                            <p>Nouveau Client</p>
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
                            // value={searchDate}
                            // onChange={(e) => setSearchDate(e.target.value)}
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="custom-datepicker" // Appliquez une classe CSS personnalisée
                                /> */}

                            <div className='div-img'>
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
                    <div className='corps col-5'>
                        <thead className='client'>
                            <div>
                                <p>Nom</p>
                            </div>
                            <div>
                                <p>Email</p>
                            </div>
                            <div>
                                {/* <p>Email</p> */}
                                <p>Telephone</p>
                            </div>
                            <div>
                                {/* <p>Ville</p> */}
                                <p>Region</p>
                            </div>
                            <div>
                                <p>Action</p>
                            </div>
                        </thead>
                        <div className='list-produit'>
                            {filteredClients.map(client => (
                                <Produit
                                    id={client.id}
                                    Telephone={client.attributes.Telephone}
                                    Quartier={client.attributes.Quartier}
                                    Ville={client.attributes.Ville}
                                    Email={client.attributes.Email}
                                    Nom={client.attributes.Nom}
                                />
                            ))}
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
            {/* <span>25 par page. 1-1 sur 1 enregistrements.</span> */}
        </div>
    );
}

export default Clients;