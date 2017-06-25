import React, { Component } from 'react';
import Mole from './Mole.js';
import './Home.less';

export default class Home extends Component {
  state = {
    score: 0,
    remindSec: 0,
    moles: [
      { id: 1, up: false, },
      { id: 2, up: false, },
      { id: 3, up: false, },
      { id: 4, up: false, },
      { id: 5, up: false, },
      { id: 6, up: false, },
    ],
  }

  interval = undefined;
  isGamming = false

  hideAllMole = () => {
    const newMoles = this.state.moles.map(mole => ({ ...mole, up: false }));
    this.setState({ moles: newMoles });
  }

  showAMole = () => {
    this.hideAllMole();
    if (!this.isGamming) {
      return;
    }
    const nextRandomTime = Math.floor((Math.random() * 800) + 200);
    const moleId = Math.floor(Math.random() * (this.state.moles.length + 1));
    const newMoles = this.state.moles.map((mole) => {
      if (mole.id === moleId) {
        return { ...mole, up: true };
      }
      return mole;
    });
    this.setState({ moles: newMoles });
    setTimeout(this.showAMole, nextRandomTime);
  }

  hitMole = () => {
    this.hideAllMole();
    this.setState({
      score: this.state.score += 1,
    });
  }

  countDown = () => {
    clearInterval(this.interval);
    if (this.state.remindSec >= 1) {
      this.setState({ remindSec: this.state.remindSec -= 1 });
      this.interval = setInterval(this.countDown, 1000);
    } else {
      this.isGamming = false;
    }
  }

  gameStart = () => {
    this.isGamming = true;
    this.setState({ remindSec: 10, score: 0 }, this.countDown);
    this.showAMole();
  }

  compomentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    window.gameStart = this.gameStart;
    return (
      <div id="pageHome">
        <h1>score: {this.state.score}</h1>
        <h1>time: {this.state.remindSec}</h1>
        <button onClick={this.gameStart} disabled={this.state.remindSec}>Start!</button>
        <div className="game">
          {
            this.state.moles.map(mole => <Mole key={`mole_${mole.id}`} up={mole.up} onHit={this.hitMole} />)
          }
        </div>
      </div>
    );
  }
}
