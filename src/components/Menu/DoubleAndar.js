import React from "react";

const CARDS_DIR = process.env.PUBLIC_URL + `/images/`;

class DoubleAndar extends React.Component {

    render() {
        let doubleAndarCards
        if (this.props.doubleCards[0]) {
            doubleAndarCards = <div className='relative'>
                {this.props.doubleCards[0] && this.props.doubleCards.map((item, index) =>
                        <img key={index} className='doubleAndarCards'
                             src={CARDS_DIR + `${item.suit}${item.value}.png`}
                             alt='cart'/>
                )}
            </div>
        }

        return (
            <div>
                {doubleAndarCards}
            </div>
        )
    }
}

export default DoubleAndar;
