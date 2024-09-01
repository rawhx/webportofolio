import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { NavBar } from './components';
import dataJson from './data/dataJson.json';
import * as Icons from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const bulanNama = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

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
    <div className="App bg-container overflow-hidden">
      <NavBar activeSection={activeSection}/>
      <div className='flex flex-col gap-5 trans fixed w-fit left-4 items-center top-[50%] bottom-[50%] z-10'>
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
            <p className='fontPrimary text-lg'>Hi.. <span className="animate-pulse">👋</span>, I'm</p>
            <h1 className='fontPrimary text-2xl'>{dataJson.profil.namaLengkap}</h1>
            <h1 className='fontPrimary text-2xl'>{dataJson.profil.position}</h1>
            <button
              type="button"
              className='btn'
              data-twe-ripple-init>
              Download CV
            </button>
          </div>
        </section>
        <section id='about'>
          <div className='py-[100px] h-fit bg-whiteFog flex flex-col gap-20'>
            <div className='flex flex-col gap-10'>
              <h1 className='text-center fontPrimary  text-2xl font-semibold' data-aos="fade-down">About Me</h1>
              <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                <div className='w-[60%] flex justify-center items-center' data-aos="fade-right">
                  <div className='animation h-[15rem] w-[15rem] bg-container overflow-hidden'>
                    <img src={`${process.env.PUBLIC_URL}/me.png`} alt='me' className='object-cover translate-y-[-3rem]' draggable="false"></img>
                  </div>
                </div>
                <div className='w-[80%] pr-[20px] flex flex-col md:justify-center gap-3'>
                  <div>
                    <p className="text-justify text-[12px]" data-aos="fade-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare sollicitudin urna eget rutrum. Mauris convallis sem at lorem interdum molestie. Nunc tempor porta libero, placerat porttitor ante tempor non. Nullam facilisis ornare diam bibendum tempus. Aenean eu fermentum urna, non interdum mauris. Donec dignissim sodales lectus, vitae semper neque ullamcorper sed. Suspendisse potenti. Vestibulum consequat volutpat nibh, vitae gravida orci auctor sed. Sed vel egestas velit. Donec justo ex, vestibulum nec pulvinar non, ultricies sit amet sem. Nulla et ante ut neque hendrerit vehicula. In lacinia quam vel ante venenatis, a aliquet urna accumsan. Sed condimentum maximus lectus eleifend.
                    </p>
                    <div className='place-items-center md:place-items-start grid' data-aos="zoom-in">
                      <button
                        type="button"
                        className='btn text-[12px]'
                        data-twe-ripple-init>
                        Download CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id='education' className='flex flex-col gap-10'>
              <h1 className='text-center fontPrimary text-2xl font-semibold' data-aos="fade-down">Education</h1>
              <div className='h-fit w-full timeline flex flex-col items-center'>
                {
                  dataJson.profil.pendidikan.map((data, index)=>(
                    <>
                      <div className={`content py-5 px-10 h-fit md:w-[40%] flex flex-col gap-3 ml-[55px] md:ml-0 border-l-2 ${index % 2 ? "md:translate-x-[-50%] md:border-l-0 md:border-r-2" : "md:translate-x-[49.6%]"}`}>
                        <div className={`w-[15px] h-[15px] rounded-full bg-oliveGreen absolute hidden md:block ${index % 2 ? "md:-right-[0.5rem]" : "md:left-[-0.5rem]"}`}/>
                        <div className={`w-[15px] h-[15px] rounded-full bg-oliveGreen absolute left-[3rem] md:hidden`}/>
                        <div className={`${index % 2 ? "md:text-right" : null }`} data-aos={`${index % 2 ? "fade-right" : "fade-left" }`}>
                          <h1 className='font-bold text-[14pt]'>{data.nama}</h1>
                          <h2 className='font-bold text-[12pt]'>{data.periodeAwal + " " + bulanNama[data.periodeBulanAwal - 1] + " - " + (data.periodeAkhir <= new Date().getFullYear() ? data.periodeAkhir + " " + bulanNama[data.periodeBulanAkhir - 1] : 'present') }</h2>
                          {/* <h2 className='font-bold text-[12pt]'>{data.periodeAwal < data.periodeAkhir ? data.periodeAwal + " " + bulanNama[data.periodeBulanAwal] : "Present" }</h2> */}
                        </div>
                        <p className='text-justify text-[12px]' data-aos={`${index % 2 ? "zoom-in-right" : "zoom-in-left" }`}>{data.deskripsi}</p>
                      </div>
                    </>
                  ))
                }
              </div>
            </div>
            <div id='experience' className='flex flex-col gap-10'>
              <h1 className='text-center fontPrimary text-2xl font-semibold' data-aos="fade-down">Experience</h1>
              <div className='h-fit w-full timeline flex flex-col items-center'>
                {
                  dataJson.profil.pengalamanKerja.map((data, index)=>(
                    <>
                      <div className={`content py-5 px-10 h-fit md:w-[40%] flex flex-col gap-3 ml-[55px] md:ml-0 border-l-2 ${index % 2 ? "md:translate-x-[-50%] md:border-l-0 md:border-r-2" : "md:translate-x-[49.6%]"}`}>
                        <div className={`w-[15px] h-[15px] rounded-full bg-oliveGreen absolute hidden md:block ${index % 2 ? "md:-right-[0.5rem]" : "md:left-[-0.5rem]"}`}/>
                        <div className={`w-[15px] h-[15px] rounded-full bg-oliveGreen absolute left-[3rem] md:hidden`}/>
                        <div className={`${index % 2 ? "md:text-right" : null }`} data-aos={`${index % 2 ? "fade-right" : "fade-left" }`}>
                          <h1 className='font-bold text-[14pt]'>{data.nama + " ~ " + data.position}</h1>
                          <h2 className='font-bold text-[12pt]'>{data.periodeAwal + " " + bulanNama[data.periodeBulanAwal - 1] + " - " + (data.periodeAkhir <= new Date().getFullYear() ? data.periodeAkhir + " " + bulanNama[data.periodeBulanAkhir - 1] : 'present') }</h2>
                          {/* <h2 className='font-bold text-[12pt]'>{data.periodeAwal < data.periodeAkhir ? data.periodeAwal + " " + bulanNama[data.periodeBulanAwal] : "Present" }</h2> */}
                        </div>
                        <p className='text-justify text-[12px]' data-aos={`${index % 2 ? "zoom-in-right" : "zoom-in-left" }`}>{data.deskripsi}</p>
                      </div>
                    </>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
        <section id='contact'>
          <div className='h-screen py-[100px]'>
            <h1 className='text-center fontPrimary  text-2xl font-semibold' data-aos="fade-down">Contact Me</h1>
          </div>
        </section>
      </div>
      <footer>
        <h1 className='text-right px-[20px] py-3 text-[12px]'>©{ new Date().getFullYear() } rawhx_x</h1>
      </footer>
    </div>
  );
}

export default App;
