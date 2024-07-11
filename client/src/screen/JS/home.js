import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import logo from '../../logo.png';
import '../css/Home.css';

import bag from '../../images/bag.png'
import calculator from '../../images/calculator.png'
import category from '../../images/category.png'
import chart from '../../images/chart.png'
import clipboard from '../../images/clipboard.png'
import profile_2user from '../../images/profile-2user.png'
import wallet_money from '../../images/wallet-money.png'
import Vector from '../../images/Vector.png'
import whatsapp from '../../images/whatsapp.png'
import discount_shape from '../../images/discount-shape.png'
import shop from '../../images/shop.png'
import share from '../../images/export.png'
import link from '../../images/link.png'
import copy from '../../images/copy.png'
import user_cirlce_add from '../../images/user-cirlce-add.png'
import search_normal from '../../images/search-normal.png'
import notification from '../../images/notification.png'
import pp from '../../images/pp.png'
import Ellipse from '../../images/Ellipse.png'
import info_circle from '../../images/info-circle.png'
import arrow_circle_right from '../../images/arrow-circle-right.png'
import trend_up from '../../images/trend-up.png'
import Frame from '../../images/Frame.png'


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

const Menu_Actif = ({ image, nom }) => {
  return (
    <div className='Actif'>
      <div className='Actif-menu' style={{justifyContent: 'flex-start'}}>
        <img src={image} alt="image" />
        <p>{nom}</p>
      </div>
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
function Home() {

  const liens = [];

  const inventaire = [
    { url: '/Inventaire/Ajouter', label: 'Ajouter un produits' },
    { url: '/Inventaire/Televerser', label: 'Televerser un fichier excel' },
  ];


  return (
    <div className="app">
      <div className="left-side">
        <div className='header'>
          <div className="logo">
            <img src={logo} alt="logo" />
            <p className='logo-text'>Bongo Space</p>
          </div>
          <div className='offre-bloc'>
            <div className='offre'>
              <span className='un'>Passer à un compte pro</span>
              <span className='deux'>14.900/mois</span>
            </div>
            <span className='offre-texte'>En attente synchronisation. Verifiez votre connexion ...</span>
          </div>
        </div>
        <div className='autre'>
          <div className='corps'>
            <div className='bloc1'>
              <span>VOTRE ESPACE</span>
              <Menu_Actif image={category} nom='Tableau de bord' />

              <Menu image={clipboard} nom='Inventaire' Vector={Vector} liens={inventaire} />
              <Menu image={calculator} nom='Ventes' Vector={Vector} liens={liens} />
              <Menu image={bag} nom='Achats' Vector={Vector} liens={liens} />
              <Menu image={wallet_money} nom='Finances' Vector={Vector} liens={liens} />
              <Menu image={profile_2user} nom='Ressources humaines' Vector={Vector} liens={liens} />
              <Menu image={chart} nom='Rapports' Vector={Vector} liens={liens} />
            </div>
            <div className='bloc1'>
              <span>VOTRE MARKETING</span>
              <Menu image={whatsapp} nom='whatsapp' Vector={Vector} liens={liens} />
              <Menu image={discount_shape} nom='discount-shape' Vector={Vector} liens={liens} />
              <Menu image={shop} nom='Shop' Vector={Vector} liens={liens} />
            </div>
          </div>
          <div className='footer'>
            <div className='top'>
              <div className='share'>
                <span>Partager l’accès à votre espace</span>
                <img src={share} alt="image" />
              </div>
              <div className='lien'>
                <div>
                  <img src={link} alt="image" />
                  <span>bongo.space/sdfdeaf</span>
                </div>
                <div className='copier'>
                  <img src={copy} alt="image" />
                  <span>Copier</span>
                </div>
                {/* <img src={share} alt="image" /> */}
              </div>
            </div>
            <hr />
            <div className='bottom'>
              <div>
                <img src={profile_2user} alt="image" />
                <div>
                  <span>Votre Personnel</span>
                  <p>3 Collaborateurs</p>
                </div>
              </div>
              <div className='deux'>
                <img src={user_cirlce_add} alt="image" />
                <div>
                  <span>Pass restant</span>
                  <p>2</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='top-side'>
        <span>Bon retour Jesse !</span>
        <div>
          <div className="search">
            <input type="text" placeholder="Rechercher" />
            <img src={search_normal} alt="search_normal" />
          </div>
          <div>
            <div className='notification'>
              <img
                src={notification}
                alt="Image principale"
                style={{
                  objectFit: 'cover'
                }}
              />
              <img
                src={Ellipse}
                alt="Petite image"
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                }}
              />
            </div>
            <img src={pp} alt="photo de profile" style={{ borderRadius: '50%', width: '48px', height: '48px' }} />
          </div>
        </div>
      </div>
      <div className='page'>
      </div>
      <div className='page-content'>
        <div className='haut'>
          <span>Aujourd’hui</span>
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
        <div>
          <div className='Facture_Titre'>
            <span>Facture impayés</span>
            <img src={info_circle} alt="info_circle" />
          </div>
          <span className='date'>05 Juillet — Aujourd’hui</span>
          <Facture Nom='Table 1' Ouvert_par='Luna Ngangue' prix='24.400' />
          <Facture Nom='Table 1' Ouvert_par='Luna Ngangue' prix='24.400' />
          <Facture Nom='Table 3' Ouvert_par='Djoko Jean' prix='14.400' />
          <Facture Nom='Table 1' Ouvert_par='Luna Ngangue' prix='24.400' />
          <Facture Nom='Table 2' Ouvert_par='Djoko Jean' prix='1.200' />
        </div>
        <div className='all'>
          <span>Voir toutes les factures</span>
          <img src={arrow_circle_right} alt='arrow_circle_right' />
        </div>
      </div>
    </div>
  );
}

export default Home;
