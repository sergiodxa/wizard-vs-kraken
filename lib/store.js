import { fromJS, Map as map } from "immutable";
import { createStore } from "redux";
import reducer from "./reducer";

const defaultState = {
  turn: "player",
  turns: 0,
  manaSpent: 0,
  effects: [],
  player: {
    life: 50,
    mana: 500
  }
};

const defaultBoss = {
  life: 51,
  damage: 9
}

export default ({ initialState = defaultState, boss = defaultBoss } = {}) =>
  createStore(reducer, fromJS(initialState).set("boss", map(boss)));
/**
function bossAttack() {
  store.dispatch({ type: "BOSS_ATTACK" });
}

function playerCast(spell) {
  store.dispatch({ type: "PLAYER_CAST", spell });
}

function loop() {
  const state = store.getState() || initialState;
  console.log("State", state);
  if (state.turn === "boss" && state.player.life > 0) {
    return bossAttack();
  }
  if (
    state.turn === "player" &&
    (state.boss.life > 0 || state.player.mana > 0)
  ) {
    if (!hasActiveEffect(state, "Shield")) return playerCast(spells.shield);
    if (!hasActiveEffect(state, "Recharge")) return playerCast(spells.recharge);
    if (!hasActiveEffect(state, "Poison")) return playerCast(spells.poison);
    if (state.player.life < state.boss.life) return playerCast(spells.Drain);
    return playerCast(spells.magicMissile);
  }
  return;
}

store.subscribe(loop);
store.dispatch({ type: "INIT" });
*/
