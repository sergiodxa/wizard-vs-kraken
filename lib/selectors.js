export function hasActiveEffect(state, name) {
  return state.get("effects").some(effect => {
    if (effect.get("name") !== name) return false;
    return state.get("turns") - effect.get("initialTurn") < effect.get("turns");
  });
}

export function canCastSpell(state, cost) {
  const manaLeft = state.getIn(['player', 'mana']);
  console.log(manaLeft, cost);
  return cost < manaLeft;
}

