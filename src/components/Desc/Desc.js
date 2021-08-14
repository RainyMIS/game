import React from 'react';
import './Desc.css'
import goldCardText from '../../img/goldCardText.svg'

const CARDS_DIR = process.env.PUBLIC_URL + `/images/`;

class Desc extends React.Component {

    render() {

        let jokerCard = <div className='cards'>
            {this.props.joker[0] && this.props.joker.map((item, index) =>
                <img key={index} className='jokerCard'
                     src={CARDS_DIR +`${item.suit}${item.value}.png`}
                     alt='cart'/>
            )}
        </div>

        let andarCards = <div className='cards'>
            {this.props.andarCards[0] && this.props.andarCards.map((item, index) =>
                <img key={index} className='andarCards'
                     src={CARDS_DIR + `${item.suit}${item.value}.png`}
                     alt='cart'/>
            )}
        </div>

        let baharCards = <div className='cards'>
            {this.props.baharCards[0] && this.props.baharCards.map((item, index) =>
                <img key={index} className='baharCards'
                     src={CARDS_DIR + `${item.suit}${item.value}.png`}
                     alt='cart'/>
            )}
        </div>

        return (
            <div className='allDesk'>

                <div className='jokerLogo'>
                    <div className='jokerWrapper'>
                        {jokerCard}
                    </div>
                </div>

                <div className='descLines'>
                    <p className='letterA'>A</p>
                    <p className='letterB'>B</p>
                    <div className='andarLineWrapper'>
                        <div className={'andarCardPlace'}>
                            {andarCards}
                        </div>
                        <div className={'andarCardPlace'}/>
                        <div className={'andarCardPlace'}/>
                        <div className={'andarCardPlace'}/>
                        <div className={'andarCardPlace'}/>
                    </div>
                    <div className='baharLineWrapper'>
                        <div className={'baharCardPlace'}>
                            {baharCards}
                        </div>
                        <div className={'baharCardPlace'}/>
                        <div className={'baharCardPlace'}/>
                        <div className={'baharCardPlace'}/>
                        <div className={'baharCardPlace'}/>
                    </div>
                </div>

                <div className='goldCardWrapper'>
                    <img className='goldCardText' src={goldCardText} alt={'goldCardText'}/>
                </div>
            </div>
        )
    }
}

export default Desc;
