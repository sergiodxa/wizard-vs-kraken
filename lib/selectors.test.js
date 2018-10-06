import { fromJS } from "immutable";
import { hasActiveEffect } from "./selectors";
import { shield } from "./effects";

describe("hasActiveEffect", () => {
  it("should have an active effect", () => {
    const state = fromJS({
      turns: 2,
      effects: [
        {
          ...shield,
          initialTurn: 1
        }
      ]
    });

    expect(hasActiveEffect(state, shield.name)).toBe(true);
  });

  it("should not have an active effect", () => {
    const state = fromJS({
      turns: 100,
      effects: [
        {
          ...shield,
          initialTurn: 0
        }
      ]
    });

    expect(hasActiveEffect(state, shield.name)).toBe(false);
  });
});
