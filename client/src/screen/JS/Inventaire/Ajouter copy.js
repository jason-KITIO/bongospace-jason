import '../../css/Inventaire/Ajouter.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageSelector({ setSelectedImage, selectedImage }) {


    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);

            setSelectedImage(file);
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

function FicheSelector({ setSelectedPdf, selectedPdf }) {


    const handlePdfSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedPdf(file);
        } else {
            alert('Veuillez sélectionner un fichier PDF.');
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

function Ajouter() {
    const [name, setName] = useState('');
    const [categorie, setCategorie] = useState('');
    const [description, setDescription] = useState('');
    const [qteStock, setQteStock] = useState('');
    const [qteCritique, setQteCritique] = useState('');
    const [prixAchat, setPrixAchat] = useState('');
    const [prixVente, setPrixVente] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            Nom: name,
            Categorie: categorie,
            Description_longue: description,
            Qte_stock: parseInt(qteStock, 10),
            Qte_citique: parseInt(qteCritique, 10),
            Prix_achat: parseFloat(prixAchat),
            Prix_vente: parseFloat(prixVente),
        }));

        if (selectedImage) {
            formData.append('image', selectedImage);
            console.log(formData);
        }
        if (selectedPdf) {
            formData.append('pdf', selectedPdf);
        }

        try {
            const response = await axios.post('http://localhost:1337/api/produits', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Produit créé:', response.data);
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
            console.error('Erreur',formData);
        }
    };

    const resetForm = () => {
        setName('');
        setCategorie('');
        setDescription('');
        setQteStock('');
        setQteCritique('');
        setPrixAchat('');
        setPrixVente('');
        setSelectedImage(null);
        setSelectedPdf(null);
    };

    return (
        <div className='page'>
            <span className='titre-texte'>Nouveau Article</span>
            <div className='titre'>
                <p>Général</p>
                <span>Sélectionnez une catégorie pour rendre vos rapports plus détaillés.</span>
            </div>
            <form onSubmit={handleSubmit}>
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
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Entrez Nom' required />
                            </div>
                            <div className='deux'>
                                <label>Categorie</label>
                                <select value={categorie} onChange={(e) => setCategorie(e.target.value)} required>
                                    <option value="">-- Sélectionner catégorie --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.attributes.Nom}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='Description'>
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="5" required></textarea>
                        </div>
                        <div className='nom'>
                            <div className='un'>
                                <label>Quantité en stock</label>
                                <input type='number' value={qteStock} onChange={(e) => setQteStock(e.target.value)} placeholder='Entrez quantité en stock' required />
                            </div>
                            <div className='un'>
                                <label>Quantité critique</label>
                                <input type='number' value={qteCritique} onChange={(e) => setQteCritique(e.target.value)} placeholder='Entrez quantité critique' required />
                            </div>
                        </div>
                        <div className='titre'>
                            <p>Facturation</p>
                            <span>Les informations de vente sont utilisées dans les factures émises, et les informations d'achat sont utilisées dans les factures reçues.</span>
                        </div>
                        <div className='nom'>
                            <div className='un'>
                                <label>Prix d'achat</label>
                                <input type='number' value={prixAchat} onChange={(e) => setPrixAchat(e.target.value)} placeholder="Entrez Prix d'achat" required />
                            </div>
                            <div className='un'>
                                <label>Prix de vente</label>
                                <input type='number' value={prixVente} onChange={(e) => setPrixVente(e.target.value)} placeholder='Entrez Prix de vente' required />
                            </div>
                        </div>
                    </div>
                    <div className='droite'>
                        <div className='image'>
                            <p>Image de l'article</p>
                            <ImageSelector setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
                        </div>
                        <div className='Fiche'>
                            <p>Fiche technique</p>
                            <FicheSelector setSelectedPdf={setSelectedPdf} selectedPdf={selectedPdf} />
                        </div>
                    </div>
                </div>
                <div className='save'>
                    <div>
                        <span className='annuler' onClick={resetForm}>Annuler</span>
                        <span className='enregistrer' onClick={handleSubmit}>Enregistrer</span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Ajouter;