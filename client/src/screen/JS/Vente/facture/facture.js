import '../../../css/Vente/Factures.css';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Vector from '../../../../images/Vector.svg'
import edit from '../../../../images/edit.svg'
import supprimer from '../../../../images/delete.svg'
import change from '../../../../images/change.svg'
import arrow_right from '../../../../images/arrow-right.svg'
import arrow_left from '../../../../images/arrow-left.svg'

import truck_time from '../../../../images/truck-time.svg'
import tick_circle from '../../../../images/tick-circle.svg'
import empty_wallet_time from '../../../../images/empty-wallet-time.svg'
import bag_cross from '../../../../images/bag-cross.svg'

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



function LivreComponent() {
    return (
        <div className='statut1 livre'>
            <img src={tick_circle} alt='tick-circle' />
            <p>Payée</p>
        </div>
    );
}

function EnCoursComponent() {

    return <div className='statut1 en-cours'>
        <img src={truck_time} alt='truck-time' />
        <p>Brouillon</p>
    </div>;
}

function AnnuleComponent() {
    return <div className='statut1 annule-statut'>
        <img src={bag_cross} alt='bag-cross' />
        <p>Non payée</p>
    </div>;
}

function EnAttenteComponent() {
    return <div className='statut1 En-attente'>
        <img src={empty_wallet_time} alt='empty-wallet-time' />
        <p>Payement en attente</p>
    </div>;
}

const ListFacture = ({ id, echeance, facturation, Statut, client, Numero, Montant }) => {

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
        // navigate(`/Vente/editClient/${id}`); // Assuming Numero is unique
    };

    const handleDelete = async () => {
        // try {
        //     const reponse = await axios.delete(`http://localhost:1337/api/factures/${id}`); // Assuming you have the ID
        //     // Optionally refresh the list or remove the item from state
        // } catch (error) {
        //     console.error("Error deleting commande:", error);
        // }
    };

    const message = Statut;



    return (
        <div>
            <tbody className='client'>
                <div>
                    <p>INV-{Numero}</p>
                </div>
                <div>
                    <p>{echeance}</p>
                </div>
                <div className='Block-statut1'>
                    {message === 'Paye' && <LivreComponent />}
                    {message === 'Brouillon' && <EnCoursComponent />}
                    {message === 'Non paye' && <AnnuleComponent />}
                </div>

                <div>
                    <p>{client}</p>
                </div>
                <div>
                    <p>{Montant} Fcfa</p>
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

function Factures() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [searchDate, setSearchDate] = useState('');
    const [filteredFactures, setFilteredFactures] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(2); // Nombre d'éléments par page

    const [facturesTerminees, setFacturesTerminees] = useState(0);

    const [factures, setFactures] = useState([])

    useEffect(() => {
        const fetchFactures = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/factures?populate=*`, {
                    params: {
                        pagination: {
                            page: currentPage,
                            pageSize: pageSize
                        }
                    }
                });
                setFactures(response.data.data);
                setFilteredFactures(response.data.data); // Initialiser avec toutes les factures
                setTotalPages(response.data.meta.pagination.pageCount); // Récupérer le nombre total de pages
            } catch (error) {
                console.error("Erreur lors de la récupération des factures:", error);
            }
        };

        const fetchFacturesTerminees = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/factures', {
                    params: {
                        filters: {
                            Statut: {
                                $eq: 'Livraison en cours'
                            }
                        }
                    }
                });
                setFacturesTerminees(response.data.meta.pagination.total);
            } catch (error) {
                console.error("Erreur lors de la récupération des factures terminées:", error);
            }
        };

        fetchFacturesTerminees();
        fetchFactures();
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
            const filtered = factures.filter(facture => facture.attributes.Statut === selectedStatus);
            setFilteredFactures(filtered);
        } else {
            setFilteredFactures(factures); // Réinitialiser si aucun filtre n'est sélectionné
        }
    };

    const handleSearch = () => {
        if (searchDate) {
            const filtered = factures.filter(facture =>
                facture.attributes.Date === searchDate
            );
            setFilteredFactures(filtered);
        } else {
            setFilteredFactures(factures); // Réinitialiser si aucune date n'est saisie
        }
    };

    return (
        <div className='page'>
            <div className='page-facture'>
                <div className='header'>
                    <span>Facture</span>
                    <Link to={`/Vente/facture/New`} className='Link-style'>
                        <p>Nouveau Facture</p>
                    </Link>
                </div>
                <div className='sous-header nb-facture'>
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
                <div>
                    <span className='facture-table actif-facture-titre'>Impayé</span>
                    <Link to='/Vente/facture/brouillon' className='Link-style'>
                        <span className='facture-table'>Brouillon</span>
                    </Link>
                    <span className='facture-table'>Tous Factures</span>
                </div>
                <div>
                    <div className='corps col-6'>
                        <thead className='client'>
                            <div>
                                <p>Numero</p>
                            </div>
                            <div>
                                <p>Date d’écheance</p>
                            </div>
                            <div>
                                <p>Statut</p>
                            </div>
                            <div>
                                <p>Client</p>
                            </div>
                            <div>
                                <p>Montant</p>
                            </div>
                            <div>
                                <p>Action</p>
                            </div>
                        </thead>
                        <div className='list-produit detail-list-produit'>
                            {filteredFactures.map(facture => (
                                <>
                                    <ListFacture
                                        id={facture.id}
                                        Numero={facture.attributes.Numero}
                                        echeance={facture.attributes.echeance}
                                        Montant={facture.attributes.Montant}
                                        Statut={facture.attributes.Statut}
                                        client={facture.attributes.client.data.attributes.Nom}
                                    />
                                </>
                            ))}
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
            {/* <span>25 par page. 1-1 sur 1 enregistrements.</span> */}
        </div>
    );
}

export default Factures;