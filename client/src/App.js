import logo from './logo.svg';
import './App.css';

import Load from './screen/JS/load';

import Home from './screen/JS/home';
import Inventaire from './screen/JS/inventaire';
import Ajouter from './screen/JS/Inventaire/Ajouter';
import Televerser from './screen/JS/Inventaire/Televerser';
import Edit from './screen/JS/Inventaire/Edit';
import Clients from './screen/JS/Vente/clients/client';
import NewClients from './screen/JS/Vente/clients/newClient';
import EditClient from './screen/JS/Vente/clients/editClient';
import Details from './screen/JS/Vente/clients/details';
import Details1 from './screen/JS/Vente/clients/details1';
import Factures from './screen/JS/Vente/facture/facture';
import Facture_Brouillon from './screen/JS/Vente/facture/facture_brouillon';
import NewFacture from './screen/JS/Vente/facture/newFacture';
import NewFacture_1 from './screen/JS/Vente/facture/newFacture_1';
import Apercue_Facture from './screen/JS/Vente/facture/Apercue_Facture';
import AddCommande from './screen/JS/Vente/commande/addCommande';
import EditCommande from './screen/JS/Vente/commande/editCommande';
import Login from './screen/JS/login/login'
import Register from './screen/JS/login/register'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Left_side_bottom from './Components/left-side-bottom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Inventaire" element={<Inventaire />} />
        <Route path="/Inventaire/Ajouter" element={<Ajouter />} />
        <Route path="/Inventaire/Televerser" element={<Televerser />} />
        <Route path="/Inventaire/edit-produit/:id" element={<Edit />} />
        <Route path="/Vente/client" element={<Clients />} />
        <Route path="/Vente/newClients" element={<NewClients />} />
        <Route path="/Vente/editClient/:id" element={<EditClient />} />
        <Route path="/Vente/details" element={<Details />} />
        <Route path="/Vente/detail" element={<Details1 />} />
        <Route path="/Vente/factures" element={<Factures />} />
        <Route path="/Vente/facture/brouillon" element={<Facture_Brouillon />} />
        <Route path="/Vente/facture/New" element={<NewFacture />} />
        <Route path="/Vente/facture/newFacture_1" element={<NewFacture_1 />} />
        <Route path="/Vente/facture/Apercue" element={<Apercue_Facture />} />
        <Route path="/Vente/commande/addCommande" element={<AddCommande />} />
        <Route path="/Vente/commande/EditCommande/:id" element={<EditCommande />} />
        <Route path="/Load" element={<Load />} />

        <Route path="/Left_side_bottom" element={<Left_side_bottom />} />

      </Routes>
    </div>
  );
}

export default App;

