import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../global/context"

const NavBar = ({activeSection}) => {
    const { hamburger } = useContext(GlobalContext)
    
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

    const menu = ["home", "journey", "contact"]
    
    return (
        <>
            {/* <div className=""  onClick={hamburgerActive ? () => setHamburgerActive(!hamburgerActive) : undefined}> */}
            <div className="" >
                <div id="navbar" className="px-5 h-min-12 fixed z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/100 dark:bg-transparent">
                    <div className="flex flex-row justify-between items-center py-3">
                        <div>
                            <button onClick={() => window.location.reload()} className="flex flex-row items-center gap-2">
                                <img src={`${process.env.PUBLIC_URL}/carakter.png`} alt="logo" className="rounded h-9"/>
                                <h6 className="font-bold">RawhWeb</h6>
                            </button>
                        </div>
                        <div className="hidden md:flex flex-row gap-5">
                            {
                                menu.map((data, index) => (
                                    <button 
                                        key={index}
                                        className={`capitalize nav-link ${activeSection === data ? 'nav-link-active' : ''}`}
                                        onClick={() => scrollToSection(data)}>
                                        {data}
                                    </button>
                                ))
                            }
                        </div>
                        <button onClick={()=>hamburger.setHamburgerActive(!hamburger.hamburgerActive)} className="md:hidden">
                            <FontAwesomeIcon icon={hamburger.hamburgerActive ? faXmark : faBars}  className={`hamburger transform ${hamburger.hamburgerActive ? 'rotate-90' : 'rotate-0'}`}  size="xl" />
                        </button>        
                    </div>
                
                        <div className={`${hamburger.hamburgerActive ? 'menu-open' : 'menu-closed'} flex flex-col gap-5 justify-center items-center py-3 transition-all duration-500 ease-in-out`}>
                            {
                                menu.map((data, index) => (
                                    <button 
                                        key={index}
                                        className={`capitalize nav-link ${activeSection === data ? 'nav-link-active' : ''}`}
                                        onClick={() => scrollToSection(data)}>
                                        {data}
                                    </button>
                                ))
                            }
                        </div>
                </div>      
            </div>
        </>
    )
}

export default NavBar