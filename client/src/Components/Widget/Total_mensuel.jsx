import './Total_mensuel.css'

import Graphe from './graphe'
import Frame from '../../images/Frame.svg'
import arrow_down2 from '../../images/arrow-down2.svg'
import Frame2 from '../../images/Frame2.svg'

const Total_mensuel = ({ }) => {
    return (
        <div className='Total_mensuel'>
            <p>Total mensuel</p>
            <div className='haut-graphe'>
                <div className='haut-graphe-prix'>
                    <p>41.695</p>
                    <span>FCFA</span>
                </div>
                <div className='haut-graphe-liste-deroulante'>
                    <p>Cette semaine</p>
                    <img src={Frame} alt='Frame' />
                </div>
            </div>
            <Graphe />

            <div className='Total_mensuel-sous-graphe'>
                <img src={Frame2} alt='Frame2' className='Frame2' />
                <p>Au cours des 7 derniers jours, une baisse de  <img src={arrow_down2} /> <span>7%</span> s'est manifestée dans votre chiffre d’affaire. Cette baisse s'explique principalement par des ruptures de stock sur certains des produits les plus populaires.</p>
            </div>
        </div>
    )
}

export default Total_mensuel;