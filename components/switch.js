function Switch({ onChange, state }) {
  return (
    <label>
      <span className={state ? "active" : 'inactive'} title="AutoPlay">
        {state ? "✔" : " "}
      </span>
      <input type="checkbox" onChange={onChange} value={state} />
      <style jsx>{`
        label {
          position: fixed;
          top: 1vh;
          left: 1vw;
        }
        span {
          display: block;
          width: 50px;
          height: 2em;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
        }
        .active {

        }
        input {
          display: none;
        }
      `}</style>
    </label>
  );
}

export default Switch;
