import { Map as map, fromJS } from "immutable";
import compose from "compose-function";
import { hasActiveEffect } from "./selectors";
import { shield } from "./effects";

export function bossReducer(state) {
  const hasShield = hasActiveEffect(state, shield.name);
  const bossDamage = state.getIn(["boss", "damage"]);
  const finalDamage = !hasShield
    ? bossDamage
    : bossDamage - shield.armor > 1
      ? bossDamage - shield.armor
      : 1;
  return state.updateIn(["player", "life"], life => life - finalDamage);
}

export function playerReducer(state, action) {
  const damage = action.getIn(["spell", "damage"]);
  const cost = action.getIn(["spell", "cost"]);
  const heal = action.getIn(["spell", "heal"]);
  const effect = action.getIn(["spell", "effect"]);
  return state
    .updateIn(["boss", "life"], life => life - damage)
    .updateIn(["player", "mana"], mana => mana - cost)
    .updateIn(["player", "life"], life => (life + heal > 50 ? 50 : life + heal))
    .update(
      "effects",
      effects =>
        effect
          ? effects.push(effect.set("initialTurn", state.get("turns")))
          : effects
    )
    .update("manaSpent", manaSpent => manaSpent + cost);
}

export function turnReducer(state) {
  const effects = state.get("effects");
  const newTurn = state.get("turn") === "player" ? "boss" : "player";
  const turns =
    newTurn === "player" ? state.get("turns") + 1 : state.get("turns");

  return state
    .set("turn", newTurn)
    .set("turns", turns)
    .updateIn(["boss", "life"], life =>
      effects.reduce((newLife, effect) => {
        if (turns === state.get("turns")) return newLife;
        const initialTurn = effect.get("initialTurn");
        const turnsDuration = effect.get("turns");
        const damage = effect.get("damage");

        return turns - initialTurn < turnsDuration ? newLife - damage : newLife;
      }, life)
    )
    .updateIn(["player", "mana"], mana =>
      effects.reduce((newMana, effect) => {
        if (turns === state.get("turns")) return newMana;
        const initialTurn = effect.get("initialTurn");
        const turnsDuration = effect.get("turns");
        const mana = effect.get("mana");

        return turns - initialTurn < turnsDuration ? newMana + mana : newMana;
      }, mana)
    );
}

export function history(state, action) {
  return state.update("history", history => history.push(map(action)));
}

function reducer(state, _action = {}) {
  const action = fromJS(_action);

  switch (action.get("type")) {
    case "BOSS_ATTACK": {
      return compose(
        state => history(state, action),
        state => turnReducer(state, action),
        state => bossReducer(state, action)
      )(state);
    }
    case "PLAYER_CAST": {
      return compose(
        state => history(state, action),
        state => turnReducer(state, action),
        state => playerReducer(state, action)
      )(state);
    }
    case "PASS_TURN": {
      return compose(
        state => history(state, action),
        state => turnReducer(state, action)
      )(state);
    }
    default: {
      return state;
    }
  }
}

export default reducer;
