import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ClientForm = () => {
    const { id } = useParams(); // Get ID from URL params to determine update or new client
    const navigate = useNavigate();

    const [client, setClient] = useState({
        Numero: '',
        Date: '',
        Montant: '',
        Statut: '',
    });

    useEffect(() => {
        const fetchClient = async () => {
            if (id) { // Check if ID is present (update scenario)
                try {
                    const response = await axios.get(`http://localhost:1337/api/commandes/${id}`); // Modify API endpoint for clients
                    setClient(response.data.data.attributes); // Update state with fetched client data
                } catch (error) {
                    console.error('Erreur lors de la récupération du client :', error);
                }
            }
        };

        fetchClient();
    }, [id]);

    const handleInputChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setClient({
            Numero: '',
            Date: '',
            Montant: '',
            Statut: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = id ? `http://localhost:1337/api/commandes/${id}` : 'http://localhost:1337/api/commandes'; // Modify API endpoint for clients based on ID
        const method = id ? 'PUT' : 'POST'; // Determine HTTP method based on ID

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            Date: client.Date,
            Statut: client.Statut,
            Montant: parseInt(client.Montant, 10),
            Numero: parseInt(client.Numero, 10),
        }));

        try {
            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Client créé/mis à jour :', response.data);
            resetForm();
            navigate('/clients'); // Navigate back to clients list after successful operation
        } catch (error) {
            console.error('Erreur lors de la création/mise à jour du client :', error);
        }
    };

    return (
        <div className='page page-client'>
            <span className='titre-texte'>Nouveau Client {id ? ' - Modification' : ''}</span>
            <div className='titre'>
                <p>Général</p>
                <span>Informations générales du client.</span>
            </div>
            <div className='block'>
                <div className='gauche gauche-client'>
                    <div className='nom nom-client'>
                        <div className='un'>
                            <label>Numero</label>
                            <input
                                type='text'
                                name="Numero"
                                value={client.Numero}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='un'>
                            <label>Date</label>
                            <input type='date' name="Date" value={client.Date} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='nom'>
                        <div className='un'>
                            <label>Montant</label>
                            <input type='number' name="Montant" value={client.Montant} onChange={handleInputChange} />
                        </div>
                        <div className='deux'>
                            <label>Statut</label>
                            <select name="Statut" value={client.Statut} onChange={handleInputChange}>
                                <option value="">Sélectionnez un statut</option>
                                <option value="Livraison en cours">Livraison en cours</option>
                                <option value="Livre">Livré</option>
                                <option value="Commande annule">Commande annulée</option>
                                <option value="Payement en attente">Payement en attente</option>
                            </select>
                        </div>
                    </div>

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
};

export default ClientForm;

