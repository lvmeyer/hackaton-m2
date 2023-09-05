import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Game from '../Vues/Game/Game';
import MyCarousel from '../Components/MyCarousel';

function Homepage() {
	
	return (
		<>
      <div className='bg-news'>
				<h1 className='h1-news'>Nos Actualités</h1>
			</div>
      <div className='banner-bar'>
			  <Game />
      </div>
      
      <div className='center content-news'>
        <span className='badge carbon-btn px-2 py-1 shadow-1-strong mb-3 '>
          Nouveautés
        </span>
        <h4>
          <strong>Nouveaux Locaux !</strong>
				</h4>
        <div className='text-muted'>
					Voici un petit aperçu de nos nouveaux locaux ! Nous avons hâte de vous y accueillir !
				</div>
      </div>
      <MyCarousel />
		</>
	);
}

export default Homepage;
