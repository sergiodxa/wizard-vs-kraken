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
  },
  history: []
};

const defaultBoss = {
  life: 51,
  damage: 9
};

export default ({ initialState = defaultState, boss = defaultBoss } = {}) =>
  createStore(reducer, fromJS(initialState).set("boss", map(boss)));
