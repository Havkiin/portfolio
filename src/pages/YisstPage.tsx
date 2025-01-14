import React, { useEffect, useRef } from 'react'
import '../styles/YisstPage.css'

import HomeDesktop from '/Yisst-screenshot-accueil-desktop.png';
import DrinksDesktop from '/Yisst-screenshot-aboire-desktop.png';
import DrinksMobile from '/Yisst-screenshot-aboire-mobile.png';
import EventsDesktop from '/Yisst-screenshot-evenements-desktop.png';
import BookingDesktop from '/Yisst-screenshot-reserver-desktop.png';
import BookingMobile from '/Yisst-screenshot-reserver-mobile.png';

import { scrollToSection } from '../hooks/scrollToElement';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../App';
import { useNavigationContext } from '../hooks/NavigationContext';
import { loadPage } from '../hooks/loadPage';
import i18next from '../data/Translations';
import useElementsOnScreen from '../hooks/ElementOnScreen';

const colors = [
    { delay: 0.7, fill: 'var(--kobicha)', text: i18next.t('projects:yisst:colors:kobicha'), textDelay: 1.2 },
    { delay: 0.8, fill: 'var(--sienna)', text: i18next.t('projects:yisst:colors:sienna'), textDelay: 1.3 },
    { delay: 0.9, fill: 'var(--bronze)', text: i18next.t('projects:yisst:colors:bronze'), textDelay: 1.4 },
    { delay: 1.0, fill: 'var(--dune)', text: i18next.t('projects:yisst:colors:dune'), textDelay: 1.5 },
    { delay: 1.1, fill: 'var(--gunmetal)', text: i18next.t('projects:yisst:colors:gunmetal'), textDelay: 1.6 },
];

const YisstPage : React.FC = () => {
    const introRef = useRef<HTMLDivElement>(null);
    const projectPageNameRef = useRef<HTMLDivElement>(null);
    const projectInfoRef = useRef<HTMLDivElement>(null);
    const websiteButtonRef = useRef<HTMLDivElement>(null);
    const separatorRef = useRef<SVGRectElement>(null);

    const [containerRefs, visibleItems] = useElementsOnScreen({ threshold: 0.4 });

    const navigate = useNavigate();
    const { setPreviousPage, navigationType } = useNavigationContext();

    const dissolveElements = () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                projectPageNameRef.current!.classList.remove("fade-in");
                projectInfoRef.current!.classList.remove("fade-in");
                websiteButtonRef.current!.classList.remove("fade-in");
                separatorRef.current!.classList.remove("slide-in");

                projectPageNameRef.current!.classList.add("fade-out");
                projectInfoRef.current!.classList.add("fade-out");
                websiteButtonRef.current!.classList.add("fade-out");
                separatorRef.current!.classList.add("slide-out");
                
                resolve();
          }, 500);
        });
      }

    const backToHomePage = () => {
        scrollToSection(introRef, 0)
            .then(dissolveElements)
            .then(() => loadPage(navigate, `${Pages.Home}#projects`, 1000))
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, []);

    useEffect(() => {
        setPreviousPage(Pages.Yisst);
    }, [setPreviousPage]);

    return (
        <div className='App'>
            <div className={"Curtain YisstCurtain" + ((navigationType === 'direct') ? ' open' : '')}></div>
            <div className='IntroProject Section gunmetal-background' ref={introRef}>
                <div className='Banner'>
                    <div className="ProjectPageName fade-in" ref={projectPageNameRef}>
                        <div className="ProjectBannerTitle eras-demi-itc">YISST</div>
                        <div className="ProjectSubtitle eras-medium-itc">{i18next.t('projects:yisst:subtitle')}</div>
                    </div>
                    <div className='BannerShadow'>
                        <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%'>
                            <rect x='0' y='0' width='100%' height='100%' fill='black' opacity='60%' />
                        </svg>
                    </div>
                    <div className='ProjectInfo eras-medium-itc fade-in' ref={projectInfoRef}>
                        <span className='Role'>
                            <span className='bronze'>{i18next.t('projects:yisst:role')}</span>
                            <span className='dun'>{i18next.t('projects:yisst:roleContent')}</span>
                        </span>
                        <span className='Date'>
                            <span className='bronze'>{i18next.t('projects:yisst:date')}</span>
                            <span className='dun'>2024</span>
                        </span>
                    </div>
                    <div ref={(el) => (containerRefs.current[0] = el)} className='BackArrow' onClick={backToHomePage}>
                        <svg className='ArrowSVG' xmlns="http://www.w3.org/2000/svg" width='6vw' height='10vh' viewBox='0 0 100 100'>
                            <rect x='30' y='50' width='40%' height='2.5%' fill='var(--isabelline)'/>  
                            <rect x='30' y='50' width='10%' height='2%' fill='var(--isabelline)' transform='rotate(-45, 30, 50)'/>
                            <rect x='30' y='50' width='13%' height='2%' fill='var(--isabelline)' transform='rotate(45, 30, 50)'/>
                            <circle cx='50' cy='50' r='35' stroke='var(--isabelline)' fill='transparent' strokeWidth='2' pathLength='1'/>
                        </svg>
                    </div>
                </div>
                <div className='ToWebsite fade-in' ref={websiteButtonRef}>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.yisst.com/'>
                        <button className="WebsiteButton lucida-sans-regular">{i18next.t('projects:yisst:visitWebsite')}</button>
                    </a>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%' viewBox='0 0 10000 100'>
                    <rect className='slide-in' ref={separatorRef} x='50' y='50' width='100%' height='5%' fill='var(--dun)' pathLength='1'/>
                </svg>
            </div>
            <div ref={(el) => (containerRefs.current[3] = el)} className='Context Section gunmetal-background dun'>
                <div
                    className={'TitleProjectPage eras-demi-itc opacity-zero' + (visibleItems[3] ? ' slide-from-bottom' : '')}
                    style={{ '--animation-delay': '0s' } as any}
                >
                    {i18next.t('projects:yisst:context')}
                </div>
                <div
                    className={'Content lucida-bright opacity-zero' + (visibleItems[3] ? ' slide-from-bottom' : '')}
                    style={{ '--animation-delay': '0.2s' } as any}
                >
                    {i18next.t('projects:yisst:contextContent')}
                </div>
            </div>
            <div ref={(el) => (containerRefs.current[1] = el)} className='Design Section'>
                <div
                    className={'TitleProjectPage eras-demi-itc opacity-zero' + (visibleItems[1] ? ' slide-from-bottom' : '')}
                >
                    {i18next.t('projects:yisst:design')}
                </div>
                <div className='DesignColors'>
                    <div className='ColorContainer'>
                        {colors.map((color, index) => (
                            <div className='ColorItem' key={index}>
                                <div
                                    className={'scale-zero' + (visibleItems[1] ? ' scale-up' : '')}
                                    style={{ '--animation-delay': `${color.delay}s` } as any}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width='90%'
                                        height='90%'
                                        viewBox='0 0 100 100'
                                    >
                                        <circle cx="50%" cy="50%" r="45%" fill={color.fill} />
                                    </svg>
                                </div>
                                <p
                                    className={'myriad-pro opacity-zero' + (visibleItems[1] ? ' slide-from-bottom' : '')}
                                    style={{ '--animation-delay': `${color.textDelay}s` } as any}
                                >
                                    {color.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={'DesignFonts opacity-zero' + (visibleItems[1] ? ' slide-from-bottom' : '')}
                    style={{ '--animation-delay': '1.8s' } as any}
                >
                    <div>
                        <p className='true-north'>
                            True North
                        </p>
                    </div>
                    <div>
                        <p className='source-code-pro'>
                            Source Code Pro
                        </p>
                    </div>
                </div>
            </div>
            <div ref={(el) => (containerRefs.current[2] = el)} className='Tech Section gunmetal-background dun'>
                <div
                    className={'TitleProjectPage eras-demi-itc opacity-zero' + (visibleItems[2] ? ' slide-from-bottom' : '')}
                    style={{ '--animation-delay': '0s' } as any}
                >
                    {i18next.t('projects:yisst:tech')}
                </div>
                <div
                    className={'Content lucida-bright opacity-zero' + (visibleItems[2] ? ' slide-from-bottom' : '')}
                    style={{ '--animation-delay': '0.2s' } as any}
                >
                    {i18next.t('projects:yisst:techContent')}
                </div>
            </div>
            <div className='Screenshots Section'>
            <img src={DrinksDesktop} alt='Drinks Desktop' className='ScreenshotDrinks Desktop'/>
                <img src={HomeDesktop} alt='Home Desktop' className='ScreenshotHome Desktop'/>
                <img src={BookingDesktop} alt='Booking Desktop' className='ScreenshotBooking Desktop'/>
                <img src={EventsDesktop} alt='Events Desktop' className='ScreenshotEvents Desktop'/>
                <img src={DrinksMobile} alt='Drinks Mobile' className='ScreenshotDrinks Mobile'/>
                <img src={BookingMobile} alt='Booking Mobile' className='ScreenshotBooking Mobile'/>
            </div>
            <div className='Back Section gunmetal-background'>
                <div className='BackLink' onClick={backToHomePage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%' viewBox='0 0 500 100'>
                        <rect x='1%' y='50' width='80%' height='10%' fill='var(--dun)'/>
                        <rect x='1%' y='50' width='5%' height='10%' fill='var(--dun)' transform='rotate(-45, 5, 50)'/>
                        <rect x='1%' y='50' width='6.5%' height='10%' fill='var(--dun)' transform='rotate(45, 5, 50)'/>
                    </svg>
                    <span className='BackLinkText'>
                        <p className='eras-demi-itc dun'>
                            {i18next.t('projects:yisst:back')}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default YisstPage;