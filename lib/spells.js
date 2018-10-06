import * as effects from "./effects";

export default function createSpell(name, cost, damage, heal, effect) {
  return { name, cost, damage, heal, effect };
}

export const magicMissile = createSpell("Magic Missile", 53, 4, 0);

export const drain = createSpell("Drain", 73, 2, 2);

export const shield = createSpell("Shield", 113, 0, 0, effects.shield);

export const poison = createSpell("Posion", 173, 0, 0, effects.poison);

export const recharge = createSpell("Recharge", 229, 0, 0, effects.recharge);
