import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import newsImage from '../../public/img/news.jpg';

import Game from '../Vues/Game/Game';
import MyCarousel from '../Components/MyCarousel';

function Homepage() {
	const [currentSlide, setCurrentSlide] = useState(0);

	

	return (
		<>
			<Game />
			<div className='bg-news'>
				<h1 className='h1-news'>Actualités</h1>
        <hr/>
				<div className='news news-content'>
					<div className='row gx-5'>
						<div className='col-md-6 mb-4'>
							<div
								className='bg-image hover-overlay ripple shadow-2-strong rounded-5'
								data-mdb-ripple-color='light'
							>
								<img
									src={newsImage}
									className='img-fluid news-img'
									alt='News'
								/>
								<a href='#!'>
									<div className='mask'></div>
								</a>
							</div>
						</div>
						<div className='col-md-6 mb-4'>
							<span className='badge carbon-btn px-2 py-1 shadow-1-strong mb-3'>
								Nouveautés
							</span>
							<h4>
								<strong>Nouveaux Locaux !</strong>
							</h4>
							<p className='text-muted'>
								Voici un petit aperçu de nos nouveaux locaux ! Nous avons hâte de vous y accueillir !
							</p>
							<button type='button' className='btn carbon-btn-vert'>
								En savoir plus
							</button>
						</div>
					</div>
				</div>
			</div>
      <MyCarousel />
		</>
	);
}

export default Homepage;
