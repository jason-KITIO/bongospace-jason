import List_Facture from './Widget/List_Facture'
import List_vente from './Widget/List_vente'
import Total_mensuel from './Widget/Total_mensuel'

import pp from '../images/pp.png'
import info_circle from '../images/info-circle.svg'
import trend_up from '../images/trend-up.svg'
import Frame from '../images/Frame.svg'

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

const Home_Container = () => {
    return (
        <div className='Home_Container'>
            <div className='page-content'>
                
                <div className='haut'>
                    <span>Aujourd'hui</span>
                    <div className='block'>
                        <Haut titre='Commandes en cours' nombre='13' evolution='3%' total='Total aujourd’hui 24.050' />
                        <Haut titre='Nouveaux clients' nombre='6' evolution='3%' total='Total aujourd’hui 24.050' />
                        <Haut titre='Livraison' nombre='2' evolution='3%' total='Total aujourd’hui 24.050' />
                    </div>
                </div>
                <div className='milieu'>
                    <span className='titre'>Cette semaine</span>
                    <div className='block'>
                        <div className='actif'>
                            <div className='actif_Titre'>
                                <div className='titre'>
                                    <span>Chiffre d’affaire</span>
                                    <img src={info_circle} alt="info_circle" />
                                </div>
                                <p>Montant que vous avez reçu de vos clients via vos ventes </p>
                                <hr />
                                <div className='prix_block'>
                                    <div className='prix'>
                                        <span>789.350</span>
                                        <p>FCFA</p>
                                    </div>
                                    <div className='evolution'>
                                        <img src={trend_up} alt='trend_up' />
                                        <span>+3%</span>
                                    </div>
                                </div>
                                <div className='liste-deroulante'>
                                    <p>Cette semaine</p>
                                    <img src={Frame} alt='Frame' />
                                </div>
                            </div>
                        </div>
                        <div className='actif passif'>
                            <div className='actif_Titre'>
                                <div className='titre'>
                                    <span>Vos dépenses</span>
                                    <img src={info_circle} alt="info_circle" />
                                </div>
                                <p>Montant que vous avez dépensé sur votre budget</p>
                                <hr />
                                <div className='prix_block'>
                                    <div className='prix'>
                                        <span>239.350</span>
                                        <p>FCFA</p>
                                    </div>
                                    <div className='evolution'>
                                        <p>budget RESTANT</p>
                                        <div className='prix-evolution'>
                                            <span>16.300</span>
                                            <p>FCFA</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='liste-deroulante'>
                                    <p>Cette semaine</p>
                                    <img src={Frame} alt='Frame' />
                                </div>
                            </div>
                        </div>
                        <div className='facture'>
                            <div className='Block_titre'>
                                <p>Vos factures</p>
                                <span>Montant que vous avez reçu de vos clients via vos ventes </span>
                            </div>
                            <hr />
                            <div className='facture-all'>
                                <p>06 factures en cours</p>
                                <span>Voir tout</span>
                            </div>
                            <div className='progression'>
                                <div className='texte-progression'>
                                    <div className='non-payeee'>
                                        <p>FACTURES NON-PAYéES</p>
                                        <div className='prix'>
                                            <p>126.350</p>
                                            <span>FCFA</span>
                                        </div>
                                    </div>
                                    <div className='retard'>
                                        <p>Retard DE PAIEMENT</p>
                                        <div className='prix'>
                                            <p>41.695</p>
                                            <span>FCFA</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='barre-progression'>
                                    <div
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '8px',
                                            background: '#E4626F',
                                            borderRadius: '10px'
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '14px',
                                            left: '0',
                                            width: '100px',
                                            height: '8px',
                                            background: '#EDA145',
                                            borderRadius: '10px'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='activite'>
                            <p>Rapport d’activité par collaborateur</p>
                            <div className='serveuse'>
                                <div className='liste'>
                                    <img src={pp} alt='Photo de profil' />
                                    <div>
                                        <p>Luna Ngangue</p>
                                        <span>Serveuse</span>
                                    </div>
                                </div>
                                <img src={Frame} alt='Frame' />
                            </div>
                            <div className='graphe'>
                                <div className='revenue'>
                                    <p>Revenus journalier</p>
                                    <img src={Frame} alt='Frame' />
                                </div>
                                <div className='graphe-dessin'>
                                    <div className='ligne'>
                                        <Barre taille='40px' affiche='none'></Barre>
                                        <p>330K</p>
                                        <span>Lun</span>
                                    </div>
                                    <div className='ligne'>
                                        <Barre taille='20px' affiche='none'></Barre>
                                        <p>210K</p>
                                        <span>Mar</span>
                                    </div>
                                    <div className='ligne'>
                                        <Barre taille='30px' affiche='none'></Barre>
                                        <p>211K</p>
                                        <span>Mer</span>
                                    </div>
                                    <div className='ligne'>
                                        <Barre taille='50px' affiche='none'></Barre>
                                        <p>190K</p>
                                        <span>Jeu</span>
                                    </div>
                                    <div className='ligne'>
                                        <Barre taille='30px' affiche='block'></Barre>
                                        <p>230K</p>
                                        <span>Ven</span>
                                    </div>
                                    <div className='ligne'>
                                        <Barre taille='40px' affiche='none'></Barre>
                                        <p>230K</p>
                                        <span>Sam</span>
                                    </div>
                                    <div className='ligne'>
                                        <Barre taille='40px' affiche='none' ></Barre>
                                        <p>230K</p>
                                        <span>Dim</span>
                                    </div>
                                </div>
                            </div>
                            <div className='total'>
                                <p>Total généré</p>
                                <span>16.300</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='right-side'>
                <List_Facture />
                <List_vente />
                <Total_mensuel />
            </div>
        </div>
    );
}



export default Home_Container;