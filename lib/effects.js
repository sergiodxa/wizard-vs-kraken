export default function createEffect(name, turns, armor, damage, mana) {
  return { name, turns, armor, damage, mana };
}

export const shield = createEffect("Shield", 6, 7, 0, 0);

export const poison = createEffect("Posion", 6, 0, 3, 0);

export const recharge = createEffect("Recharge", 5, 0, 0, 101);
