import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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

const ModifierProduit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produit, setProduit] = useState({
        Nom: '',
        Description_longue: '',
        categorie: null,
        Qte_stock: 0,
        Qte_citique: 0,
        Prix_vente: 0,
        Prix_achat: 0,
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/produits/${id}`);
                setProduit(response.data.data.attributes);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/categories');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories :', error);
            }
        };

        fetchProduit();
        fetchCategories();
    }, [id]);

    const handleCategorieChange = (e) => {
        const selectedCategorie = categories.find((c) => c.id === parseInt(e.target.value));
        setProduit({
            ...produit,
            categorie: selectedCategorie,
        });
        console.log(setProduit);
        console.log("selectedCategorie");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1337/api/produits/${id}`, {
                data: {
                    Nom: produit.Nom,
                    Description_longue: produit.Description_longue,
                    categorie: produit.categorie ? produit.categorie.id : null,
                    Qte_stock: produit.Qte_stock,
                    Qte_citique: produit.Qte_citique,
                    Prix_vente: produit.Prix_vente,
                    Prix_achat: produit.Prix_achat,
                },
            });
            navigate('/', { state: { activeMenu: 'Inventaire' } });
            // navigate(`/${'Inventaire'}`);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
        }
    };

    return (
        <div className="page">
            <div>
                <span className='titre-texte'>Modifier Article</span>
                <div className='titre'>
                    <p>Général</p>
                    <span>Sélectionnez une catégorie pour rendre vos rapports plus détaillés. La description sera remplie lorsque l'article sera sélectionné dans une facture d'achat ou de vente.</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='block'>
                        <div className='gauche'>
                            <div className='nom'>
                                <div className='un'>
                                    <label htmlFor="Nom">Nom</label>
                                    <input type="text" id="Nom" name="Nom" value={produit.Nom} onChange={(e) => setProduit({ ...produit, Nom: e.target.value })} />
                                </div>
                                <div className='deux'>
                                    <label>Categorie</label>
                                    <select id="categorie" name="categorie" value={produit.categorie?.id || ''} onChange={handleCategorieChange}>
                                        {categories.map((categorie) => (
                                            <option key={categorie.id} value={categorie.id}>
                                                {categorie.attributes.Nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='Description'>
                                <label>Description</label>
                                <textarea cols="30" rows="5" id="Description_longue" name="Description_longue" value={produit.Description_longue} onChange={(e) => setProduit({ ...produit, Description_longue: e.target.value })}></textarea>
                            </div>
                            <div className='nom'>
                                <div className='un'>
                                    <label>Quantite en stock</label>
                                    <input type='text' placeholder='Entrez quantity en stock' id="Qte_stock" name="Qte_stock" value={produit.Qte_stock} onChange={(e) => setProduit({ ...produit, Qte_stock: e.target.value })} />
                                </div>
                                <div className='un'>
                                    <label>Quantite critique</label>
                                    <input type='text' placeholder='Entrez quantite critique' id="Qte_citique" name="Qte_citique" value={produit.Qte_citique} onChange={(e) => setProduit({ ...produit, Qte_citique: e.target.value })} />
                                </div>
                            </div>

                            <div className='titre'>
                                <p>Facturation</p>
                                <span>Les informations de vente sont utilisées dans les factures émises, et les informations d'achat sont utilisées dans les factures reçues. La taxe sera appliquée à la fois sur les achats et les ventes.</span>
                            </div>
                            <div className='nom'>
                                <div className='un'>
                                    <label>Prix d’achat</label>
                                    <input type='text' placeholder="Entrez Prix d'achat" id="Prix_achat" name="Prix_achat" value={produit.Prix_achat} onChange={(e) => setProduit({ ...produit, Prix_achat: e.target.value })} />
                                </div>
                                <div className='un'>
                                    <label>Prix de vente</label>
                                    <input type='text' placeholder='Entrez Prix de vente' id="Prix_vente" name="Prix_vente" value={produit.Prix_vente} onChange={(e) => setProduit({ ...produit, Prix_vente: e.target.value })} />
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
                            <span className='annuler' >Annuler</span>
                            <span className='enregistrer' onClick={handleSubmit}>Enregistrer</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierProduit;