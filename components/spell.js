import { connect } from "react-redux";
import { canCastSpell } from "../lib/selectors";

const emptyHandler = () => {}

function Spell({ spell, cast, canCast }) {
  return (
    <div onClick={() => canCast && cast()} className={!canCast ? 'disabled' : ''}>
      <h3>{spell.name}</h3>
      <style jsx>{`
        div {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.125);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        .disabled {
          cursor: block;
        }
      `}</style>
    </div>
  );
}

export default connect(
  (state, props) => ({
    canCast: canCastSpell(state, props.spell.cost)
  }),
  (dispatch, props) => ({
    cast() {
      dispatch({
        type: "PLAYER_CAST",
        spell: props.spell
      });
    }
  })
)(Spell);
