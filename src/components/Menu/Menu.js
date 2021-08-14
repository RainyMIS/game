import React from 'react';
import './Menu.css'
import '../Desc/Desc.css'
import Desc from "../Desc/Desc";
import minusButton from '../../img/betButtonMinus.svg'
import plusButton from '../../img/betButtonPlus.svg'
import Coin from './Coin'
import AndarBets from "./AndarBets";
import BaharBets from "./BaharBets";
import DoubleAndar from "./DoubleAndar";
import DoubleBahar from "./DoubleBahar";

const CARDS_SUITS = ["SUIT_HEARTS_", "SUIT_CLUBES_", "SUIT_SPADES_", "SUIT_DIAMONDS_"];
const CARDS_VALUES = ["VALUE_A", "VALUE_2", "VALUE_3", "VALUE_4", "VALUE_5", "VALUE_6", "VALUE_7", "VALUE_8", "VALUE_9", "VALUE_10", "VALUE_J", "VALUE_Q", "VALUE_K"];
const MAX_CARDS_ON_DECK = 5;
const OFFSET_CARDS = 4;
const DELAY_SHOWING_CARD = 1000;

export default class Menu extends React.Component {
    state = {
        deck: [],
        andarCards: [],
        baharCards: [],
        prevAndar: [],
        prevBahar: [],
        joker: [],
        flag: false,
        animFlag: true,
        startPlaying: true,
        newPlay: false,
        winner: "",
        allCoins: 20000,
        allBets: 0,
        bet: 0,
        andarBets: 0,
        baharBets: 0,
        betOn: "",
        isWindow: "unShowEndWindow"
    }

    getAndarBets = () => {
        this.setState(prevState => {
            return {
                betOn: "Andar",
                allCoins: prevState.allCoins - this.state.bet,
                andarBets: prevState.andarBets + this.state.bet,
                bet: 0
            }
        })
        this.getAllBets()
    }

    getBaharBets = () => {
        this.setState(prevState => {
            return {
                betOn: "Bahar",
                allCoins: prevState.allCoins - this.state.bet,
                baharBets: prevState.baharBets + this.state.bet,
                bet: 0
            }
        })
        this.getAllBets()
    }

    shuffleDeck = () => {
        let deck = [];
        CARDS_SUITS.forEach(function (suit) {
            CARDS_VALUES.forEach(function (value) {
                deck.push({suit: suit, value: value});
            });
        });
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        this.setState({deck: deck})
    }

    showJoker = () => {
        const joker = this.state.deck.pop();
        const cards = this.state.joker;
        cards.push(joker);
        this.setState(
            {
                joker: cards
            }
        )
    }

    showCoefficient = () => {
        const firstCard = this.state.deck[this.state.deck.length - 1]
        if (firstCard.suit === "SUIT_CLUBES_" || firstCard.suit === "SUIT_SPADES_") {
            this.setState(
                {
                    flag: true,
                    animFlag: true,
                    andarCoefficent: 1.9,
                    baharCoefficent: 2,
                    andarTextCoefficent: '×1.9',
                    baharTextCoefficent: '×2.0'
                }
            )
        } else {
            this.setState({
                    flag: false,
                    animFlag: false,
                    andarCoefficent: 2,
                    baharCoefficent: 1.9,
                    andarTextCoefficent: '×2.0',
                    baharTextCoefficent: '×1.9'
                }
            )
        }
    }

    showNewLine = () => {
        if (this.state.andarCards.length % MAX_CARDS_ON_DECK === 0 && this.state.baharCards.length % MAX_CARDS_ON_DECK === 0 && this.state.andarCards.length !== 0) {
            this.setState(prevState => {
                return {
                    andarCards: prevState.andarCards.slice(OFFSET_CARDS),
                    baharCards: prevState.baharCards.slice(OFFSET_CARDS)
                }
            })
        }
    }

    playCardAndar = () => {
        if (this.state.winner === "" && this.state.flag === true && this.state.newPlay) {
            console.log(1)
            this.showNewLine();
            const newCard = this.state.deck.pop();
            const cards = this.state.andarCards;
            cards.push(newCard);
            if (this.state.joker[0].value !== newCard.value) {
                this.setState({
                    andarCards: cards,
                    flag: false,
                })
            } else {
                this.setState({
                    winner: "Andar",
                    andarCards: cards,
                    allBets: this.state.andarBets * this.state.andarCoefficent,
                    startPlaying: false,
                    flag: false,
                })
                this.showEndWindow();
            }
            this.andarBahar()
        }
    }

    playCardBahar = () => {
        if (this.state.winner === "" && this.state.flag === false && this.state.newPlay) {
            this.showNewLine();
            const newCard = this.state.deck.pop();
            const cards = this.state.baharCards;
            cards.push(newCard);
            if (this.state.joker[0].value !== newCard.value) {
                this.setState({
                    baharCards: cards,
                    flag: true
                })
            } else {
                this.setState({
                    winner: "Bahar",
                    baharCards: cards,
                    allBets: this.state.baharBets * this.state.baharCoefficent,
                    startPlaying: false,
                    flag: true,
                })
                this.showEndWindow();
            }
            this.andarBahar()
        }
    }

    andarBahar = () => {
        if (this.state.flag) {
            setTimeout(() => this.playCardAndar(), DELAY_SHOWING_CARD)
        } else {
            setTimeout(() => this.playCardBahar(), DELAY_SHOWING_CARD)
        }
    }

    getAllBets = () => {
        this.setState({
            newPlay: true,
        })
        if (this.state.startPlaying) {
            this.shuffleDeck();

            setTimeout(() => {
                this.showJoker();
                this.showCoefficient();

                setTimeout(() => {
                    this.andarBahar()
                }, 500)


            }, 0)
        }
    }

    betCount = () => {
        const BET_COUNT_1000 = 1000;
        const BET_COUNT_100 = 100;
        const BET_COUNT_10 = 10;
        const BET_COUNT_1 = 1;
        let betCount;
        if (this.state.allCoins > BET_COUNT_1000) {
            betCount = BET_COUNT_1000
        } else if (this.state.allCoins > BET_COUNT_100) {
            betCount = BET_COUNT_100
        } else if (this.state.allCoins > BET_COUNT_10) {
            betCount = BET_COUNT_10
        } else {
            betCount = BET_COUNT_1
        }
        return betCount
    }

    upBet = () => {
        let betCount = this.betCount();
        if ((this.state.bet + betCount) <= this.state.allCoins) {
            this.setState(prevState => {
                return {
                    bet: prevState.bet + betCount
                }
            })
        }
    }

    downBet = () => {
        let betCount = this.betCount();
        this.setState(prevState => {
            return {
                bet: Math.max(prevState.bet - betCount, 0)
            }
        });
    };

    showEndWindow = () => {
        this.setState(
            {isWindow: "showEndWindow"}
        )
    }

    hideEndWindow = () => {
        this.setState(prevState => {
            return {
                newPlay: false,
                andarBets: 0,
                baharBets: 0,
                allCoins: prevState.allCoins + this.state.allBets,
                andarCards: [],
                baharCards: [],
                joker: [],
                allBets: 0,
                andarTextCoefficent: "",
                baharTextCoefficent: "",
                winner: "",
                startPlaying: true,
                isWindow: "unShowEndWindow"
            }
        })
    }

    render() {
        let andarCoin
        let baharCoin
        let andarBets
        let baharBets
        let minusBetClass
        let plusBetClass
        let andarBetButton
        let baharBetButton
        let notification

        if (this.state.newPlay) {
            andarBetButton = "untouchableAndarBetButton"
            baharBetButton = "untouchableBaharBetButton"
        } else {
            andarBetButton = "touchableAndarBetButton"
            baharBetButton = "touchableBaharBetButton"
        }

        if (this.state.winner === this.state.betOn) {
            notification = <p>Победил {this.state.winner}! <br/> Ваш выйгрыш: {this.state.allBets}</p>
        } else {
            notification = <p>Победил {this.state.winner}! <br/> Ваш пройгрыш: {this.state.andarBets + this.state.baharBets}</p>
        }

        if (this.state.newPlay) {
            minusBetClass = 'minusBetUnTouchable'
            plusBetClass = 'plusBetUnTouchable'
        } else {
            minusBetClass = 'minusBetTouchable'
            plusBetClass = 'plusBetTouchable'
        }

        if (this.state.andarBets !== 0) {
            andarCoin = <Coin/>
            andarBets = <AndarBets andarBets={this.state.andarBets}/>
        }
        if (this.state.baharBets !== 0) {
            baharCoin = <Coin/>
            baharBets = <BaharBets baharBets={this.state.baharBets}/>
        }

        return (
            <div className='allPlay'>

                <Desc andarCards={this.state.andarCards} baharCards={this.state.baharCards}
                      joker={this.state.joker} animFlag={this.state.animFlag}/>

                <button className={this.state.isWindow} onClick={this.hideEndWindow}>
                    <div className="endWindow">
                        {notification}
                    </div>
                </button>

                <div className="menu-wrapper">
                    <div className='cash'>
                        <div className='allCoins'>
                            {this.state.allCoins}
                        </div>
                    </div>

                    <div className='andarBahar'>
                        <button className={andarBetButton} onClick={this.getAndarBets}>
                            <div className='andarBetAndCoin'>
                                <p className='betsAndarText'>Andar <br/> {this.state.andarTextCoefficent}</p>
                                {andarBets}
                            </div>
                            <div className='andarCoin'>{andarCoin}</div>
                            <div className='showDoubleAndar'>
                                <DoubleAndar doubleCards={this.state.andarCards}/>
                            </div>
                        </button>
                        <div className='gameLogo'/>
                        <button className={baharBetButton} onClick={this.getBaharBets}>
                            <div className='baharBetAndCoin'>
                                <p className='betsBaharText'>Bahar <br/> {this.state.baharTextCoefficent}</p>
                                {baharBets}
                            </div>
                            <div className='baharCoin'>{baharCoin}</div>
                            <div className='showDoubleBahar'>
                                <DoubleBahar doubleCards={this.state.baharCards}/>
                            </div>
                        </button>
                    </div>

                    <div className='bet'>
                        <input type='image' src={minusButton} alt={'minusBet'} className={minusBetClass}
                               onClick={this.downBet}>
                        </input>
                        <div className='currentBet'>
                            <span>BET</span>
                            {this.state.bet}
                        </div>
                        <input type='image' src={plusButton} alt={'plusBet'} className={plusBetClass}
                               onClick={this.upBet}>
                        </input>
                    </div>
                </div>
            </div>
        )
    }
}
