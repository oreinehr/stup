import React, { useEffect } from 'react';
import './home.css';

import ChildMindsLogo from '../../assets/ChildMindsLogo.png';
import criancasBrincando from '../../assets/criancas-brincando-arco-iris-brinquedos.jpg';
import aa from '../../assets/aa.png';
import podcastBrincar from '../../assets/podcast-brincar-em-casa-portal-lunetas.webp';

function Home() {
    
    useEffect(() => {
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.innerHTML = htmlContent;
        }
    }, []);

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <link rel="stylesheet" href="./css/style.css">
        <title>ChildMinds</title>
    </head>
    <header id="header-navbar">
        <nav>
            <nav class="border navbar navbar-expand-lg navbar-dark">
                <div class="container-fluid">
                    <img src="${ChildMindsLogo}" alt="" class="logo img-fluid"/>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav" aria-controls="menuNav" aria-expanded="false">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="menuNav">
                        <ul class="nav nav-underline justify-content-center ">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#sobrenos">Sobre nós</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contato</a>
                            </li>
                            <li class="nav-item">
                                <div class="container">
                                    <a class="nav-link btn-psi font-weight-bold" aria-disabled="true">Área do Psicólogo</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </nav>
    </header>
    <body>
        <!-- Carrosel Desktop-->
        <div class="container-carrousel d-none d-md-block">
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000">
                        <img src="${criancasBrincando}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h1>Bem Vindo ao ChildMinds!</h1>
                            <button onclick="redirectLogin()" id="carrousel-btn" class="mt-2">Inciar Sessão</button>
                            <p class="mt-2">A melhor plataforma de auxilo à sessões de atendimento psicológico já desenvolvida.</p>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="${aa}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Plataforma com Interface Intuitiva</h5>
                            <p>Todo o desing da plataforma foi desenvolvida com objetividade e praticidade pensando em você.</p>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="${podcastBrincar}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Apoio Profissional</h5>
                            <p>A chave para uma transformação pessoal duradoura.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <!-- Main-Mobile -->
        <div class="Main-mobile border d-block d-md-none">
            <div class="main-box">
                <h1 class="mt-5">Bem Vindo ao</h1>
                <h1 class="mb-3">ChildMinds!</h1>
                <button class="mb-3 main-box-btn">Inciar Sessão</button>
                <p class="mt-2 mb-5">A melhor plataforma de auxilo à sessões de atendimento psicológico já desenvolvida.</p>
            </div>
        </div>
        <!-- Cards -->
        <div id="sobrenos" class="container mt-5 mb-5">
            <!-- Cards content -->
        </div>
    </body>
    <footer class="">
        <p>aqui o pé que roda e tal</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="./js/script.js"></script>
    </html>
    `;

    return null;
}

export default Home;