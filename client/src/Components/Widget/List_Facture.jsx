import info_circle from '../../images/info-circle.svg'
import arrow_circle_right from '../../images/arrow-circle-right.svg'

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

const List_Facture = () => {
    return (
        <div style={{
            background: '#1111110A',
            padding: '20px 24px',
            borderRadius: '24px',
        }}>
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
    )
}
export default List_Facture; 