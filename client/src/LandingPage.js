import React, { Component } from 'react';
import './LandingPage.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

export default class CitiesSlider extends React.Component {
   constructor(props) {
     super(props);
     this.IMAGE_PARTS = 4;
     this.changeTO = null;
     this.AUTOCHANGE_TIME = 4000;
     this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
   }
   componentWillUnmount() {
     window.clearTimeout(this.changeTO);
   }
   componentDidMount() {
     this.runAutochangeTO();
     setTimeout(() => {
       this.setState({ activeSlide: 0, sliderReady: true });
     }, 0);
   }
   runAutochangeTO() {
     this.changeTO = setTimeout(() => {
       this.changeSlides(1);
       this.runAutochangeTO();
     }, this.AUTOCHANGE_TIME);
   }
   changeSlides(change) {
     window.clearTimeout(this.changeTO);
     const { length } = slides;
     const prevSlide = this.state.activeSlide;
     let activeSlide = prevSlide + change;
     if (activeSlide < 0) activeSlide = length - 1;
     if (activeSlide >= length) activeSlide = 0;
     this.setState({ activeSlide, prevSlide });
   }
   render() {
     const { activeSlide, prevSlide, sliderReady } = this.state;
     return (
       <div className={classNames('slider', { 's--ready': sliderReady })}>
         <div className="slider__slides">
           {slides.map((slide, index) => (
             <div
               className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
               key={slide.city}
               >
               <div className="slider__slide-content">
                 <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                 <h2 className="slider__slide-heading">
                   {slide.city.split('').map(l => <span>{l}</span>)}
                 </h2>
                 <div className="snip1535">Let's Go!</div>
                 <div className="snip1535">tours</div> /*if문 걸어줄 버튼*/
               </div>
               <div className="slider__slide-parts">
                 {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                   <div className="slider__slide-part" key={i}>
                     <div className="slider__slide-part-inner" style={{backgroundImage: `url(${slide.img})` }} />
                     <div className="slider__slide-pic-inner" style={{backgroundImage: `url(${'http://cfile222.uf.daum.net/image/99B4D03E5DD0EC5B0B9A62'})` }} />
                   </div>
                 ))}
               </div>
             </div>
           ))}
         </div>
       </div>
     );
   }
 }


const slides = [
   {
     city: 'K-POP',
     country: 'SEOUL',
     img: 'https://dispatch.cdnser.be/wp-content/uploads/2018/08/56036d86e1307e1eadd472e904dea331.jpg',
   },
   {
    city: 'Arts',
    country: 'BUSAN',
    img: 'https://post-phinf.pstatic.net/MjAxOTAxMDRfMTI1/MDAxNTQ2NTg5MjI4MDIz.VUnEs2d9pRzjQzHshL0QHEjmHtfvleEka2RwkTdwNjYg._9oBEFRcBRRyk8M_lDZlCN84QftTrK7eWd303XnFf0Mg.JPEG/%EC%82%AC%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C_11_003.JPG?type=w1200',
  },
  {
    city: 'Nature',
    country: 'JEJU',
    img: 'http://www.matcl.com/files/attach/images/2791205/195/811/002/1ae4b5c14eec40f1314c8c41fdc20225.jpg',
  },
  {
    city: 'TempleStay',
    country: 'DAEGU',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Donghwasa_Temple.jpg',
  },
   {
     city: 'Tradition',
     country: 'GYEONGJU',
     img: 'https://t1.daumcdn.net/cfile/tistory/214CEF4B57FB779734',
   },
   {
    city: 'Cooking',
    country: 'JEONJU',
    img: 'http://pds13.egloos.com/pds/200901/21/90/d0000290_4977077eb065b.jpg',
  },
 ];