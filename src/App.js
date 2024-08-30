import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { NavBar } from './components';
import dataJson from './data/dataJson.json';
import * as Icons from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App bg-pastel">
      {/* <div className='blur-overlay' />  */}
      <NavBar activeSection={activeSection}/>
      <div className='flex flex-col gap-5 trans fixed w-fit left-4 items-center top-[50%] bottom-[50%]'>
        {
          dataJson.sosialMedia.map(data => (
            <>
              <button onClick={()=>window.open(data.link)} className='flex flex-row gap-2 btn-sosmed'>
                <span style={{width: '70px'}} className='label-sosmed capitalize'>
                  {data.nama}
                </span>
                <FontAwesomeIcon icon={Icons[data.icon]} className='sosmed' />
              </button>
            </>
          )) 
        }
      </div>
      <div className='flex flex-col gap-8'>
        <section id='home' className='h-screen flex items-center justify-center flex-col gap-5'>
          <div className='flex flex-col items-center justify-center'>
            <p className=' fontPrimary text-lg'>Hi.. <span className="animate-pulse">👋</span>, I'm</p>
            <h1 className='fontPrimary text-2xl'>{dataJson.profil.namaLengkap}</h1>
            <h1 className='fontPrimary text-2xl'>{dataJson.profil.position}</h1>
            <button
              type="button"
              className='mt-3 border border-lime-600 inline-block px-5 py-2 font-semibold text-[#778766] rounded-full hover:bg-lime-600 hover:text-white'
              data-twe-ripple-init>
              Download CV
            </button>
          </div>
        </section>
        <section id='about'>
          <div className='pt-[100px] h-fit bg-[#86AB89] flex flex-col gap-5'>
            <div className='text-center flex flex-col justify-center items-center gap-3'>
              <h1 className='fontPrimary text-2xl font-bold'>
                ~ My Journey ~
              </h1>
              <p className='w-[80%]'>Commodo adipisicing ut exercitation eiusmod voluptate occaecat sunt. Officia consequat dolore non incididunt labore Lorem excepteur. Aliqua sunt fugiat quis laboris culpa consequat officia incididunt.</p>
            </div>
            <div className='flex flex-col gap-10'>
              <h1 className='text-center fontPrimary md:hidden text-xl font-semibold'>About Me</h1>
              <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                <div className='w-[60%] flex justify-center items-center'>
                  <div className='animation h-[15rem] w-[15rem] bg-pastel overflow-hidden'>
                    <img src='webportofolio/me.png' className='object-cover translate-y-[-3rem]'></img>
                  </div>
                </div>
                <div className='h-[50vh] w-[80%] pr-[20px] flex flex-col md:justify-center gap-3'>
                  <h1 className='text-center fontPrimary hidden md:flex text-xl font-semibold'>About Me</h1>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque eaque odio incidunt autem deserunt ipsum molestiae dicta est iusto numquam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=''>
            <h1 className='text-center fontPrimary md:hidden text-xl font-semibold'>Education</h1>
            </div>
          </div>
        </section>
      </div>
      {/* <footer>
        <h1 className='text-center py-3'>{ new Date().getFullYear() } rawhx_x</h1>
      </footer> */}
    </div>
  );
}

export default App;
