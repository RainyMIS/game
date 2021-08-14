import React from "react";

const CARDS_DIR = process.env.PUBLIC_URL + `/images/`;

class DoubleBahar extends React.Component {

    render() {
        let doubleBaharCards
        if (this.props.doubleCards[0]) {
            doubleBaharCards = <div className='relative'>
                {this.props.doubleCards[0] && this.props.doubleCards.map((item, index) =>
                    <img key={index} className='doubleBaharCards'
                         src={CARDS_DIR + `${item.suit}${item.value}.png`}
                         alt='cart'/>
                )}
            </div>
        }

        return (
            <div>
                {doubleBaharCards}
            </div>
        )
    }
}

export default DoubleBahar;
