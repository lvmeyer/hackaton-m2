import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import newsImage from '../../public/img/news.jpg';
import jonathanImage from '../../public/img/jonathan.png';
import sylvieImage from '../../public/img/sylvie.png';
import valentinImage from '../../public/img/valentin.png';
import Game from '../Vues/Game/Game';

function Homepage() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const images = [valentinImage, sylvieImage, jonathanImage];

	const namedev = ['Valentin', 'Sylvie', 'Jonathan'];

	const previousSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? images.length - 1 : prevSlide - 1
		);
	};

	const nextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === images.length - 1 ? 0 : prevSlide + 1
		);
	};

	return (
		<>
			<Game />
			<div className='bg-news'>
				<h1 className='h1-news'>Actualités</h1>
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
								<strong>Nouveaux bureaux !</strong>
							</h4>
							<p className='text-muted'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
								consequatur eligendi quisquam doloremque vero ex debitis
								veritatis placeat unde animi laborum sapiente illo possimus,
								commodi dignissimos obcaecati illum maiores corporis.
							</p>
							<button type='button' className='btn carbon-btn-vert'>
								En savoir plus
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-team'>
				<p className='new-carbon'>Nouveaux arrivants au sein de Carbon</p>
				<div className='d-flex align-items-center'>
					<button
						className='carousel-control btn carbon-btn'
						onClick={previousSlide}
					>
						Previous
					</button>
					<div className='d-flex flex-column'>
						<img
							src={images[currentSlide]}
							alt={`Slide ${currentSlide}`}
							className='slide img-arrival'
						/>
						<p className='namedev'>{namedev[currentSlide]}</p>
					</div>
					<button
						className='carousel-control btn carbon-btn'
						onClick={nextSlide}
					>
						Next
					</button>
				</div>
			</div>
		</>
	);
}

export default Homepage;
