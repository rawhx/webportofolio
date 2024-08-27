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
      <div className='flex flex-col gap-5 fixed w-fit left-4 items-center topp-[50%] bottom-[50%]'>
        {
          dataJson.sosialMedia.map(data => (
            <>
              <button onClick={()=>window.open(data.link)} className='flex flex-row gap-2 btn-sosmed'>
                <span style={{width: '70px'}} className='label-sosmed'>
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
          <h1 className='fontPrimary flex flex-col items-center'>
            <span className='fa-2x'>Hi.., I'm</span>
            <span className="fa-2x text-center px-5">{dataJson.profil.namaLengkap}</span>
          </h1>
          <button
            type="button"
            className='border border-lime-600 inline-block px-5 py-2 font-semibold text-[#778766] rounded-full hover:bg-lime-600 hover:text-white'
            data-twe-ripple-init>
            Download CV
          </button>
        </section>
        <section id='about' className='h-screen bg-slate-600 rounded-tr-[0px] rounded-tl-[0px]'>
          <h1 className='fontPrimary text-center pt-[20px] font-bold'>
            About Me
          </h1>
        </section>
      </div>
      <footer>

      </footer>
    </div>
  );
}

export default App;
