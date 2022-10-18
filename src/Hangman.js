import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./Empty.jpg";
import img1 from "./1W.jpg";
import img2 from "./2W.jpg";
import img3 from "./3W.jpg";
import img4 from "./4W.jpg";
import img5 from "./5W.jpg";
import img6 from "./6W.jpg";
import {randomWord} from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }
reset(){
  this.setState({
    nWrong : 0,
    guessed: new Set(),
    answer: randomWord()
  })
}
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const finished = this.state.nWrong >= this.props.maxWrong; 
    const altImgText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    const didWin = this.guessedWord().join("") === this.state.answer;
    let current = this.generateButtons();
    if(didWin) current = "You got the Word Right🤩"; 
    if(finished) current = "You ran out of tries 😳 "
    return (
      <div className='Hangman'>
        <h1>HangZB</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altImgText} />
        <p> # wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{!finished ? this.guessedWord() : this.state.answer}</p>
        <p className='Hangman-btns'>
          {current} 
          </p>
          <button onClick={this.reset} id="reset"> Reset Game </button>
      </div>
    );
  }
}

export default Hangman;
