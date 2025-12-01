import Header from '../header/header';
import Footer from '../footer/footer';
import './about.css'
import { useRef, useState, useEffect } from "react";
import people from '../assets/people.png';
import hands from '../assets/hands.png';
import group from '../assets/group.png';
import person1 from '../assets/person1.png';
import person2 from '../assets/person2.png'; 
import person3 from '../assets/person3.png';   
import person4 from '../assets/person4.png'; 
import boy1 from '../assets/boy1.png'; 
import boy2 from '../assets/boy2.png'; 
import boy3 from '../assets/boy3.png'; 
import girl from '../assets/girl.png'; 
import sponsors from '../assets/Logo component.png';

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

function About() {
  return (
    <div>
      <Header />
      <div className="textblock">
        <div className="left">
            <h3>About Us</h3>
            <h1>We are a team of content writers who share their learnings</h1>
        </div>
        <div className="right">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque doloribus veniam sint commodi dolore ab? Animi perferendis nobis molestiae similique doloribus, laboriosam corrupti, repellendus praesentium, quidem tenetur eos aut eveniet!</p>
        </div>
      </div>
        <div className="peoples">
            <img src={people} className="people"/>
        </div>
      <div className="">
          <div className="numberblocks">
                <div className="numbers">
                    <div className="number_one">
                         <h1>12+</h1>
                        <label htmlFor="">Blogs Published</label>
                    </div>
                    <div className="number_two">
                         <h1>18K+</h1>
                        <label htmlFor="">Views on Finsweet</label>
                    </div>
                    <div className="number_three">
                         <h1>30K+</h1>
                        <label htmlFor="">Total active Users</label>
                    </div>
                </div>
                <div className="color_block">
                  <div className='purple'></div>
                  <div className='orange'></div>
                </div>

          </div>
      </div>
        <div className="textblock_main">
            <div>
              <h4>About Us</h4>
              <h2>We are a community of content writers who share their learnings</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button className="purple-button">Read More &gt;</button>
            </div>
            <div>
              <h4>Our Mission</h4>
              <h2>Creating valuable content for creatives all around the world</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
      </div>
      <div className='textblockright'>
       <div className="text_left">
        <h2>Our team of creatives</h2>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
       </div>
       <div className="figure"></div>
       <img src={hands} alt="" className='hands'/>
      </div>
      <div className='textblockleft'> 
        <img src={group} alt="" className='group'/>

       <div className="text_right">
        <h2>Why we started this Blog</h2>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
       </div>
       <div className="circle"></div>
      </div>
          <h1 className='category'>List of authors</h1>
          <div className='fourpeople'>
            <div className='firstperson'>
              <img src={person1} alt="" />
              <h2>Floyd Miles</h2>
              <p>Content Writer @Company</p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='secondperson'>
              <img src={person2} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='firstperson'>
              <img src={person3} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='firstperson'>
              <img src={person4} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='firstperson'>
              <img src={boy2} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='firstperson'>
              <img src={girl} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='firstperson'>
              <img src={boy3} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            <div className='firstperson'>
              <img src={boy1} alt="" className='manphoto'/>
              <h2>Dianne Russell</h2>
              <p>Content Writer @Company </p>
              <div className="icons">
                <FaFacebookF style={{ fontSize: '15px', color: 'grey' }} />
                <FaLinkedinIn style={{ fontSize: '15px', color: 'grey' }} />
                <FaInstagram style={{ fontSize: '15px', color: 'grey' }} />
                <FaTwitter style={{ fontSize: '15px', color: 'grey' }} />
              </div>
            </div>
            
          </div>
          <img src={sponsors} alt="" className='sponsors' />

          <div className="joinblock">
            <h2>Join our team to be a part of our story</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ad et obcaecati quaerat nam ea.</p>
            <button className="yellow-button">Join Now</button>
          </div>

          <Footer />
      </div>
  )
}

export default About;