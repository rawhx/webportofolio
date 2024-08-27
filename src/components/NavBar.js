import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const NavBar = ({activeSection}) => {
    const [hamburgerActive, setHamburgerActive] = useState(false)
    
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) { // Atur nilai sesuai kebutuhan
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    return (
        <>
            <div id="navbar" className="px-5 h-min-12 fixed z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/100 dark:bg-transparent">
                <div className="flex flex-row justify-between items-center py-3">
                    <div>
                        <span className="flex flex-row items-center gap-2">
                            <img src="/carakter.png" alt="logo" className="rounded h-9"/>
                            <h6 className="font-bold">RawhWeb</h6>
                        </span>
                    </div>
                    <div className="hidden md:flex flex-row gap-5">
                        <button 
                            className={`nav-link ${activeSection === "home" ? 'nav-link-active' : ''}`}
                            onClick={() => scrollToSection('home')}>
                            Home
                        </button>

                        <button 
                            className={`nav-link ${activeSection === "about" ? 'nav-link-active' : ''}`}
                            onClick={() => scrollToSection('about')}>
                            About
                        </button>

                        <button 
                            className={`nav-link ${activeSection === "portfolio" ? 'nav-link-active' : ''}`}
                            onClick={() => scrollToSection('portfolio')}>
                            Portfolio
                        </button>
                    </div>
                    <button onClick={()=>setHamburgerActive(!hamburgerActive)} className="md:hidden">
                        <FontAwesomeIcon icon={hamburgerActive ? faXmark : faBars}  className={`hamburger transform ${hamburgerActive ? 'rotate-90' : 'rotate-0'}`}  size="xl" />
                    </button>        
                </div>
                <div className={`${hamburgerActive ? 'menu-open' : 'menu-closed'} flex flex-col gap-5 justify-center items-center py-3 transition-all duration-500 ease-in-out`}>
                    <button 
                        className={`nav-link ${activeSection === "home" ? 'nav-link-active' : ''}`}
                        onClick={() => scrollToSection('home')}>
                        Home
                    </button>

                    <button 
                        className={`nav-link ${activeSection === "about" ? 'nav-link-active' : ''}`}
                        onClick={() => scrollToSection('about')}>
                        About
                    </button>

                    <button 
                        className={`nav-link ${activeSection === "portfolio" ? 'nav-link-active' : ''}`}
                        onClick={() => scrollToSection('portfolio')}>
                        Portfolio
                    </button>
                </div>
            </div>
        </>
    )
}

export default NavBar