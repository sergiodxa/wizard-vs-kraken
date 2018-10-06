import { connect } from "react-redux";
import { hasActiveEffect } from "../lib/selectors";
import { poison } from "../lib/effects";

function Boss({ boss, hasPoison }) {
  return (
    <div>
      <div className="status">
        <div className="progress">
          <span>
            {hasPoison ? "💉" : null}
            <strong>
              {boss.get("life")}
              /51
            </strong>
          </span>
          <progress value={boss.get("life")} max={51}>
            {boss.get("life")}
          </progress>
        </div>
      </div>
      <img src="/static/battle/boss.png" role="presentation" />

      <style jsx>{`
        div {
          position: relative;
        }
        .status {
          position: absolute;
          bottom: -7vh;
          left: 0;
          right: 0;
          font-size: 1.25em;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .progress {
          text-align: center;
          position: relative;
        }
        .progress > span {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default connect(state => ({
  boss: state.get("boss"),
  hasPoison: hasActiveEffect(state, poison.name)
}))(Boss);
