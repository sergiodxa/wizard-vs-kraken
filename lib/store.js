import { fromJS, Map as map } from "immutable";
import { event } from "next-ga/dist/analytics/prod";
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

const analytics = store => next => action => {
  if (process.env.NODE_ENV !== "production" && action.type === "PLAYER_CAST") {
    event({
      category: "action - player cast",
      action: `${action.spell.name}`
    });
  }
  return next(action);
};

export default ({ initialState = defaultState, boss = defaultBoss } = {}) =>
  createStore(reducer, fromJS(initialState).set("boss", map(boss)), analytics);
