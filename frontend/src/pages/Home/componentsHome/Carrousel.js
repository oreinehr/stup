import criancasBrincando from '../../../assets/criancas-brincando-arco-iris-brinquedos.jpg';
import aa from '../../../assets/aa.png';
import podcastBrincar from '../../../assets/podcast-brincar-em-casa-portal-lunetas.webp';

function Carrousel() {
    return ( 
        <div className="container-carrousel d-none d-md-block" >
          <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <img src={criancasBrincando} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h1>Bem Vindo ao ChildMinds!</h1>
                  <button id="carrousel-btn" className="mt-2"  >Inciar Sessão</button>
                  <p className="mt-2">A melhor plataforma de auxilo à sessões de atendimento psicológico já desenvolvida.</p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={aa} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Plataforma com Interface Intuitiva</h5>
                  <p>Todo o desing da plataforma foi desenvolvida com objetividade e praticidade pensando em você.</p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={podcastBrincar} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Apoio Profissional</h5>
                  <p>A chave para uma transformação pessoal duradoura.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
    );
}

export default Carrousel;