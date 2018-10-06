import { Component } from "react";
import { connect } from "react-redux";

import { magicMissile, drain, shield, poison, recharge } from "../lib/spells";
import { hasActiveEffect, canCastSpell } from "../lib/selectors";
import Spell from "../components/spell";
import Player from "../components/player";
import Boss from "../components/boss";
import Switch from "../components/switch";
import Footer from "../components/footer";

class HomePage extends Component {
  state = {
    auto: false
  };

  componentDidUpdate() {
    if (this.props.turn === "boss" && this.props.bossLife > 0) {
      this.props.dispatch({ type: "BOSS_ATTACK" });
    }
    if (this.state.auto && this.props.turn === "player") {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.autoPlayerTurn, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  autoPlayerTurn = () => {
    const {
      bossLife,
      playerLife,
      playerMana,
      hasShield,
      hasRecharge,
      hasPoison,
      canCastMagicMissile,
      canCastDrain,
      canCastShield,
      canCastRecharge,
      canCastPoison,
      canWinWithMissile
    } = this.props;

    const halfLife = playerLife <= bossLife / 2;

    if (bossLife <= 0 || playerLife <= 0) {
      return this.setState({ auto: false });
    }

    if (canWinWithMissile) {
      return this.props.dispatch({
        spell: magicMissile,
        type: "PLAYER_CAST"
      });
    }

    if (canCastMagicMissile && bossLife <= magicMissile.damage) {
      return this.props.dispatch({
        spell: magicMissile,
        type: "PLAYER_CAST"
      });
    }

    if (canCastRecharge && playerMana - poison.cost < recharge.cost) {
      if (!hasRecharge) {
        return this.props.dispatch({
          spell: recharge,
          type: "PLAYER_CAST"
        });
      }
      return this.props.dispatch({ type: "PASS_TURN" });
    }

    if (halfLife && canCastDrain) {
      return this.props.dispatch({ spell: Drain, type: "PLAYER_CAST" });
    }

    if (!hasRecharge && !canCastRecharge && canCastMagicMissile) {
      return this.props.dispatch({
        spell: magicMissile,
        type: "PLAYER_CAST"
      });
    }

    if (!hasShield && canCastShield) {
      return this.props.dispatch({ spell: shield, type: "PLAYER_CAST" });
    }

    if (!hasRecharge && canCastRecharge) {
      return this.props.dispatch({
        spell: recharge,
        type: "PLAYER_CAST"
      });
    }

    if (!hasPoison && canCastPoison) {
      return this.props.dispatch({ spell: poison, type: "PLAYER_CAST" });
    }

    if (playerLife < bossLife && canCastDrain) {
      return this.props.dispatch({ spell: Drain, type: "PLAYER_CAST" });
    }

    if (canCastMagicMissile) {
      return this.props.dispatch({
        spell: magicMissile,
        type: "PLAYER_CAST"
      });
    }

    return this.setState({ auto: false });
  };

  onToggleAuto = () => this.setState(state => ({ auto: !state.auto }));

  render() {
    return (
      <main>
        {/* <Switch state={this.state.auto} onChange={this.onToggleAuto} /> */}
        <div className="images">
          <Boss />
          <Player />
        </div>

        <div className="menu">
          <Spell spell={magicMissile} />
          <Spell spell={drain} />
          <Spell spell={shield} />
          <Spell spell={poison} />
          <Spell spell={recharge} />
        </div>

        <Footer />

        <dialog open={this.props.bossLife <= 0}>
          You won in {this.props.turns} turns spending {this.props.manaSpent} of
          mana!
        </dialog>

        <dialog open={this.props.playerLife <= 0}>
          You lost in {this.props.turns} turns spending {this.props.manaSpent}{" "}
          of mana!
        </dialog>

        <style jsx>{`
          main {
            height: 100vh;
            display: grid;
            grid-template-rows: 429px 3fr 1fr;
          }
          .images {
            display: flex;
            width: 100%;
            justify-content: space-around;
            align-items: center;
            background-image: url("/static/battle/bg.png");
            background-repeat: repeat-x;
            color: white;
          }
          .menu {
            border-top: 0.5em solid black;
            background: linear-gradient(to bottom, #6f62c2, #030029);
            color: white;
            padding: 2em;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 2em;
          }
          dialog {
            position: fixed;
            top: 25vh;
            transform: translateY(-50%);
          }
        `}</style>
      </main>
    );
  }
}

export default connect(state => ({
  turn: state.get("turn"),
  bossLife: state.getIn(["boss", "life"]),
  turns: state.get("turns"),
  manaSpent: state.get("manaSpent"),
  playerLife: state.getIn(["player", "life"]),
  playerMana: state.getIn(["player", "mana"]),
  hasShield: hasActiveEffect(state, "Shield"),
  hasRecharge: hasActiveEffect(state, "Recharge"),
  hasPoison: hasActiveEffect(state, "Poison"),
  canCastMagicMissile: canCastSpell(state, magicMissile.cost),
  canCastDain: canCastSpell(state, drain.cost),
  canCastShield: canCastSpell(state, shield.cost),
  canCastRecharge: canCastSpell(state, recharge.cost),
  canCastPoison: canCastSpell(state, poison.cost),
  canWinWithMissile: (() => {
    const bossLife = state.getIn(["boss", "life"]);
    const bossDamage = state.getIn(["boss", "damage"]);
    const playerLife = state.getIn(["player", "life"]);
    const playerMana = state.getIn(["player", "mana"]);
    const missileCount = Math.ceil(playerMana / magicMissile.cost);
    return (
      (bossDamage * missileCount) < playerLife &&
      magicMissile.damage * missileCount >= bossLife
    );
  })()
}))(HomePage);
