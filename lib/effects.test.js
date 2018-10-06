import createEffect from "./effects";

describe("createEffect", () => {
  it("should create a new object", () => {
    const effects = createEffect("Test", 10, 3, 2, 4);
    expect(effects).toHaveProperty("name");
    expect(effects).toHaveProperty("turns");
    expect(effects).toHaveProperty("armor");
    expect(effects).toHaveProperty("damage");
    expect(effects).toHaveProperty("mana");

    expect(effects.name).toBe("Test");
    expect(effects.turns).toBe(10);
    expect(effects.armor).toBe(3);
    expect(effects.damage).toBe(2);
    expect(effects.mana).toBe(4);
  });
});
