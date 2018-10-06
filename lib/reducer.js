import { Map as map, fromJS } from "immutable";
import { hasActiveEffect } from "./selectors";
import { shield } from "./effects";

export function bossReducer(state, action) {
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
    .updateIn(["player", "life"], life => life + heal > 50 ? 50 : life + heal)
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
  const turns = state.get("turns") + 1;

  return state
    .update("turn", turn => (turn === "boss" ? "player" : "boss"))
    .set("turns", turns)
    .updateIn(["boss", "life"], life =>
      effects.reduce((newLife, effect) => {
        const initialTurn = effect.get("initialTurn");
        const turnsDuration = effect.get("turns");
        const damage = effect.get("damage");

        return turns - initialTurn < turnsDuration ? newLife - damage : newLife;
      }, life)
    )
    .updateIn(["player", "mana"], mana =>
      effects.reduce((newMana, effect) => {
        const initialTurn = effect.get("initialTurn");
        const turnsDuration = effect.get("turns");
        const mana = effect.get("mana");

        return turns - initialTurn < turnsDuration ? newMana + mana : newMana;
      }, mana)
    );
}

export function history(state, action) {
  return state.updateIn("history", history => history.push(map(action)));
}

function reducer(state, _action = {}) {
  const action = fromJS(_action);

  switch (action.get("type")) {
    case "BOSS_ATTACK": {
      return turnReducer(bossReducer(state, action), action);
    }
    case "PLAYER_CAST": {
      return turnReducer(playerReducer(state, action), action);
    }
    case "PASS_TURN": {
      return turnReducer(state, action);
    }
    default: {
      return state;
    }
  }
}

export default reducer;
