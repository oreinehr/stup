import { Link } from 'react-router-dom';

function Header() {
    return (
        <header id="header-navbar">
            <nav>
                <nav className="border navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <img src="./assets/ChildMindsLogo.png" alt="" className="logo img-fluid" />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav" aria-controls="menuNav" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse  justify-content-end" id="menuNav">
                            <ul className="nav nav-underline justify-content-center ">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/sobrenos" className="nav-link">Sobre nós</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contato" className="nav-link">Contato</Link>
                                </li>
                                <li className="nav-item">
                                    <div className="container">
                                        <Link to="Login" className="nav-link btn-psi font-weight-bold" aria-disabled="true">Área do Psicólogo</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </nav>
        </header>
    );
}

export default Header;
