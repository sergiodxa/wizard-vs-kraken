import { connect } from "react-redux";
import { hasActiveEffect } from "../lib/selectors";
import { shield, recharge } from "../lib/effects";

function Player({ player, hasShield, hasRecharge }) {
  return (
    <div>
      <div className="status">
        <div className="progress">
          <span>
            {hasShield ? "🛡" : null}{" "}
            <strong>
              {player.get("life")}
              /50
            </strong>
          </span>
          <progress value={player.get("life")} max={50}>
            {player.get("life")}
          </progress>
        </div>
        <div className="progress">
          <span>
            {hasRecharge ? "🔋" : null}{" "}
            <strong>
              {player.get("mana")}
              /500
            </strong>
          </span>
          <progress value={player.get("mana")} max={500}>
            {player.get("mana")}
          </progress>
        </div>
      </div>
      <img src="/static/battle/wizard.png" role="presentation" height="150px" />

      <style jsx>{`
        div {
          position: relative;
        }
        .status {
          position: absolute;
          bottom: -10vh;
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
  player: state.get("player"),
  hasShield: hasActiveEffect(state, shield.name),
  hasRecharge: hasActiveEffect(state, recharge.name)
}))(Player);
