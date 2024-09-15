import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { NavBar } from './components';
import dataJson from './data/dataJson.json';
import * as Icons from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { faArrowUpFromBracket, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import "https://smtpjs.com/v3/smtp.js"

function App() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  const [activeSection, setActiveSection] = useState('home')
  const [data, setData] = useState({
    email: '',
    subject: '',
    message: ''
  })

  const handleInput = (e) => {
    const { name, value } = e.target; 
    const element = document.getElementById(name)
    const errorMsgElement = document.getElementById(`error-msg-${name}`);

    if (element.value) {
      element.classList.remove('error')
      errorMsgElement.classList.add('hidden')
    } 

    setData((prev) => ({
      ...prev,    
      [name]: value
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault()
    const email = document.getElementById('email')
    const subject = document.getElementById('subject')
    const message = document.getElementById('message')
    const fields = { email, subject, message };
 
    for (const key in fields) {
      if (!fields[key].value) {
        const errorMsgElement = document.getElementById(`error-msg-${key}`);
        fields[key].classList.add('error');
        errorMsgElement.classList.remove('hidden');
        Toast.fire({
          icon: "error",
          title: "Field is required."
          // title: key
        });
      }
    }

    const response = await fetch(`mailto:achmadhasbil24@gmail.com?cc=${data.email}&subject=${data.subject}&body=${data.message}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
   
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

  const DownloadCV = () => {
    const fileUrl = process.env.PUBLIC_URL + '/cv.pdf';

    fetch(fileUrl).then(response => response.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'cv_Achmad Hasbil.pdf'; // Set the name of the downloaded file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Clean up after the download
      }).catch(() => alert('File download failed'));
  }

  useEffect(()=>{
    const getTime = () => {
      const time = document.getElementById('time')
      const date = new Date()
      time.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    getTime()
    const intervalId = setInterval(getTime, 1000);

    return () => clearInterval(intervalId);
  })

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
              onClick={DownloadCV}
              className='btn !flex flex-row gap-3 items-center'
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              <span>
                Download CV
              </span>
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
                      {dataJson.profil.deskripsiLorem}
                    </p>
                    <div className='place-items-center md:place-items-start grid' data-aos="zoom-in">
                      <button
                        type="button"
                        onClick={DownloadCV}
                        className='btn text-[12px] !flex flex-row gap-3 items-center'
                      >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        <span>
                          Download CV
                        </span>
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
                        <div className={`w-[15px] h-[15px] rounded-full bg-oliveGreen absolute hidden md:block ${index % 2 ? "md:-right-[0.5rem]" : "md:left-[-0.5rem]"}`} data-aos="zoom-in"/>
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
                        <div className={`w-[15px] h-[15px] rounded-full bg-oliveGreen absolute hidden md:block ${index % 2 ? "md:-right-[0.5rem]" : "md:left-[-0.5rem]"}`} data-aos="zoom-in"/>
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
          <div className='h-fit pt-[100px] pb-[20px] flex flex-col gap-5'>
            <h1 className='text-center fontPrimary  text-2xl font-semibold' data-aos="fade-down">Contact With Me</h1>
            <div className='w-full h-fit flex justify-center'>
              <form onSubmit={sendMessage} className='w-full md:w-1/2 p-[50px] rounded-[20px] gap-3 flex flex-col'>
                <div className='flex flex-col lg:flex-row gap-4'>
                  <div data-aos="fade-right" className="w-full h-fit min-w-[200px]">
                    <input id="email" name='email' onChange={handleInput} className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-creamyBrown focus:shadow-md" placeholder="Email"/>
                    <span id='error-msg-email' className='text-[red] text-[11px] hidden'>This field is required.</span>
                  </div>
                  <div data-aos="fade-left" className="w-full h-fit min-w-[200px]">
                    <input id="subject" name='subject' onChange={handleInput} className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-creamyBrown focus:shadow-md" placeholder="Subject"/>
                    <span id='error-msg-subject' className='text-[red] text-[11px] hidden'>This field is required.</span>
                  </div>
                </div>
                <div data-aos="zoom-in" className='flex flex-col gap-4'>
                  <div className="flex flex-col">
                    <textarea id="message" name='message' onChange={handleInput} className="w-full min-h-[250px] max-h-[250px] bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-creamyBrown focus:shadow-md" placeholder="Message" >
                    </textarea>
                    <span id='error-msg-message' className='text-[red] text-[11px] hidden'>This field is required.</span>
                  </div>
                  <div className="w-full h-fit min-w-[200px]">
                    <button type='submit' className='btn w-full !rounded-xl hover:!bg-carbonGray [10px] !m-0 !text-white !bg-oliveGreen !gap-3 !flex !flex-row-reverse !justify-center !items-center'>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <footer className='flex flex-row-reverse justify-between'>
        <h1 className='text-right px-[20px] py-3 text-[12px]'>©{ new Date().getFullYear() } rawhx_x</h1>
        <h1 id='time' className='px-[20px] py-3 text-[12px]'></h1>
      </footer>
    </div>
  );
}

export default App;
