import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-icon-bg">
        <div className="header-icon">
          <span>🛍️</span>
        </div>
      </div>
      <h1 className="header-title">
        Minha
        <span className="header-title-gradient">Loja</span>
      </h1>
    </div>
  );
}

export default Header;