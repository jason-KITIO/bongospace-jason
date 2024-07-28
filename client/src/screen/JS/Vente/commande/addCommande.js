import '../../../css/Vente/newClient.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

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

function NewClients() {

    const liens = [];

    const inventaire = [
        { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
        { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
    ];

    const [nouvelleCommande, setNouvelleCommande] = useState({
        Numero: '',
        Date: '',
        Montant: '',
        Statut: ''
    });

    const [numero, setNumero] = useState('');
    const [date, setDate] = useState('');
    const [montant, setMontant] = useState('');
    const [statut, setStatut] = useState('');

    const handleInputChange = (e) => {
        setNouvelleCommande({
            ...nouvelleCommande,
            [e.target.name]: e.target.value
        });
    };


    const resetForm = () => {
        setNumero('')
        setDate('')
        setMontant('')
        setStatut('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            Date: date,
            Statut: statut,
            Montant: parseInt(montant, 10),
            Numero: parseInt(numero, 10),
        }));

        try {
            const response = await axios.post('http://localhost:1337/api/commandes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Commande creer ', response.data);
            resetForm();

        } catch (error) {
            console.log(nouvelleCommande);
            console.error('Erreur lors de l\'ajout de la commande:', error);
        }
    };

    return (
        <div className='page page-client'>
            <span className='titre-texte'>Nouveau Clients</span>
            <div className='titre'>
                <p>Général</p>
                <span>Sélectionnez une catégorie pour rendre vos rapports plus détaillés. La description sera remplie lorsque l'article sera sélectionné dans une facture d'achat ou de vente.</span>
            </div>
            <div className='block'>
                <div className='gauche gauche-client'>
                    <div className='nom nom-client'>
                        <div className='un'>
                            <label>Numero</label>
                            <input type='text' name="Numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                        </div>
                        <div className='un'>
                            <label>Date</label>
                            <input type='date' name="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className='nom'>
                        <div className='un'>
                            <label>Montant</label>
                            <input type='number' name="Montant" value={montant} onChange={(e) => setMontant(e.target.value)} />
                        </div>
                        <div className='deux'>
                            <label>Statut</label>
                            <select name="Statut" value={statut} onChange={(e) => setStatut(e.target.value)}>
                            <option value="">Sélectionnez un statut</option>
                                    <option value="Livraison en cours">Livraison en cours</option>
                                    <option value="Livre">Livré</option>
                                    <option value="Commande annule">Commande annulée</option>
                                    <option value="Payement en attente">Payement en attente</option>
                                </select>
                        </div>
                    </div>
                </div>
                <div className='droite-client'>
                    <p>CRM</p>
                    <span>Track every step of your customer journey, manage leads and opportunities, and analyze your sales pipeline</span>
                </div>
            </div>
            <div className='save'>
                <div>
                    <span className='annuler' onClick={resetForm}>Annuler</span>
                    <span className='enregistrer' onClick={handleSubmit}>Enregistrer</span>
                </div>
            </div>
        </div>
    );
}

export default NewClients;