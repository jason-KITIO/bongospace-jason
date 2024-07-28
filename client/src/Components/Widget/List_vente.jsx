import './List_vente.css'

import pp from '../../images/pp.png'

const List_vente = ({ }) => {
    return (
        <div className='List_vente'>
            <p className='titre'>Dernières ventes enregistrées</p>
            <div className='List-vente-block-liste'>
                <div className='List-vente-block'>
                    <div className='List-vente-block-un'>
                        <img src={pp} alt='pp' />
                        <div>
                            <p>Luna Ngangue</p>
                            <span>Caisse N°1</span>
                        </div>
                    </div>
                    <div className='List-vente-block-deux'>
                        <span>Il ya 1minutes</span>
                        <div>
                            <p>12570</p>
                            <p className='Fcfa'>Fcfa</p>
                        </div>
                    </div>
                </div>
                <div className='List-vente-block'>
                    <div className='List-vente-block-un'>
                        <img src={pp} alt='pp' />
                        <div>
                            <p>Luna Ngangue</p>
                            <span>Caisse N°1</span>
                        </div>
                    </div>
                    <div className='List-vente-block-deux'>
                        <span>Il ya 1minutes</span>
                        <div>
                            <p>12570</p>
                            <p className='Fcfa'>Fcfa</p>
                        </div>
                    </div>
                </div>
                <div className='List-vente-block'>
                    <div className='List-vente-block-un'>
                        <img src={pp} alt='pp' />
                        <div>
                            <p>Luna Ngangue</p>
                            <span>Caisse N°1</span>
                        </div>
                    </div>
                    <div className='List-vente-block-deux'>
                        <span>Il ya 1minutes</span>
                        <div>
                            <p>12570</p>
                            <p className='Fcfa'>Fcfa</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List_vente