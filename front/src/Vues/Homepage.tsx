import React, { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import news from '../../public/img/news.jpg';
import jonathan from '../../public/img/jonathan.png';
import sylvie from '../../public/img/sylvie.png';
import valentin from '../../public/img/valentin.png';

function Homepage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        valentin,
        sylvie,
        jonathan,
      ];
    
      const previousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
      };
    
      const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
      };
    


	return (
		<>  <div className="bg-news">
                <h1>Actualités</h1>
                    <div className="news news-content">
                    <div className="row gx-5">
                        <div className="col-md-6 mb-4">
                            <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                            <img src={news} className="img-fluid news-img" />
                            <a href="#!">
                                <div className="mask" ></div>
                            </a>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <span className="badge carbon-btn px-2 py-1 shadow-1-strong mb-3">Nouveautés</span>
                            <h4><strong>Nouveaux bureaux !</strong></h4>
                            <p className="text-muted">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur
                            eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum
                            sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.
                            </p>
                            <button type="button" className="btn carbon-btn-vert">Détails</button>
                        </div>
                    </div>
                </div>     
                <div className="bg-team">
                    Nouveaux arrivants au sein de Carbon
                    <div className="carousel">
                    <button className="carousel-control btn carbon-btn" onClick={previousSlide}>
                            Previous
                    </button>
                    <img src={images[currentSlide]} alt={`Slide ${currentSlide}`} className="slide img-arrival" />
                    <button className="carousel-control btn carbon-btn" onClick={nextSlide}>
                        Next
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Homepage;