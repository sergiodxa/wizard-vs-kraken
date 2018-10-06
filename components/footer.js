function Footer() {
  return (
    <footer>
      <span>
        Wizard vs Kraken by <a href="https://sergiodxa.com">Sergio Xalambrí</a>
      </span>
      <style jsx>{`
        footer {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2em;
        }
        a {
          color: black;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
