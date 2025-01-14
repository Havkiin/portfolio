import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../App';
import useParallaxWithMouse from '../hooks/ParallaxWithMouse';
import { useNavigationContext } from '../hooks/NavigationContext';
import { loadPage } from '../hooks/loadPage'
import i18next from '../data/Translations';
import '../styles/MoonPage.css'

const MoonPage : React.FC = () => {
    const [isCurtainClosed, setIsCurtainClosed] = useState(false);

    const moonRef = useRef<HTMLDivElement>(null);
    const stars1Ref = useRef<HTMLDivElement>(null);
    const stars2Ref = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const { setPreviousPage } = useNavigationContext();

    useParallaxWithMouse(moonRef, 1, 1, 0.01);
    useParallaxWithMouse(stars1Ref, 1, 1, 0.03);
    useParallaxWithMouse(stars2Ref, 1, 1, 0.02);

    const lunarMonth = 29.53;

    const getMoonPhaseInDays = (date : Date) => {
        const knownNewMoon = new Date('2000-01-06T18:14:00Z');
        const diff = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
        const phase = (diff % lunarMonth + lunarMonth) % lunarMonth;
        return phase;
    }

    const getNextFullMoon = (currentDate : Date) => {
        const currentPhase = getMoonPhaseInDays(currentDate);
        const daysUntilFullMoon = (14.77 - currentPhase + lunarMonth) % lunarMonth;
        const nextFullMoonDate = new Date(currentDate.getTime() + daysUntilFullMoon * 24 * 60 * 60 * 1000);
        return nextFullMoonDate;
    };

    const formatDateToDDMMYYYY = (date : Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getMoonPhaseName = (moonPhaseInDays : number) => {
        if (moonPhaseInDays <= 1.84) {
            return i18next.t('experiments:moonPhases:newMoon');
        } else if (moonPhaseInDays <= 7.38) {
            return i18next.t('experiments:moonPhases:waxingCrescent');
        } else if (moonPhaseInDays <= 9.22) {
            return i18next.t('experiments:moonPhases:firstQuarter');
        } else if (moonPhaseInDays <= 14.77) {
            return i18next.t('experiments:moonPhases:waxingGibbous');
        } else if (moonPhaseInDays <= 16.61) {
            return i18next.t('experiments:moonPhases:fullMoon');
        } else if (moonPhaseInDays <= 22.15) {
            return i18next.t('experiments:moonPhases:waningGibbous');
        } else if (moonPhaseInDays <= 24) {
            return i18next.t('experiments:moonPhases:lastQuarter');
        } else if (moonPhaseInDays <= 29.53) {
            return i18next.t('experiments:moonPhases:waningCrescent');
        }

    }
    
    const getMoonPhaseInDecimal = (date : Date) => {
        const phase = getMoonPhaseInDays(date);
        return phase / lunarMonth;
    }

    const moonCycleToCircleOffset = (moonPhaseDecimal : number) => {
        const offsetLowBound = -50;
        const offsetHighBound = 150;
    
        if (moonPhaseDecimal <= 0.5) {
            return offsetLowBound * (moonPhaseDecimal * 2);
        } else {
            return offsetHighBound - (offsetHighBound * ((moonPhaseDecimal - 0.5) * 2));
        }
    }

    const dateToday = new Date();
    const currentMoonPhaseInDays = getMoonPhaseInDays(dateToday);
    const currentMoonPhaseDecimal = getMoonPhaseInDecimal(dateToday);
    const nextFullMoonDate = getNextFullMoon(dateToday);

    const closeCurtain = () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setIsCurtainClosed(true);
            
            resolve();
          }, 10);
        });
      }

    const transitionToHome = () => {
        closeCurtain()
          .then(() => loadPage(navigate, `${Pages.Home}#experiments`, 1000))
          .catch((error) => { 
            console.error("An error occurred:", error);
          });
      }

    useEffect(() => {
        setPreviousPage(Pages.Moon);
    }, [setPreviousPage]);

    return (
        <div className="Environment">
            <div className={"Curtain MoonCurtain open" + (isCurtainClosed ? ' closed' : '')}></div>
            <div className="Moon" ref={moonRef}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <clipPath id='moonClip'>
                        <circle cx='50' cy='50' r='50' />
                    </clipPath>
                    <circle 
                        cx={moonCycleToCircleOffset(currentMoonPhaseDecimal)} cy='50' r='50'
                        className='MoonShadow'
                        fill='black' opacity='65%'
                        clipPath="url(#moonClip)"
                    />
                </svg>
            </div>
            <div className="Stars1 BackgroundImage" ref={stars1Ref}></div>
            <div className="Stars2 BackgroundImage" ref={stars2Ref}></div>
            <div className="InfoHolder">
                <p className="MoonPhaseName eras-demi-itc">{getMoonPhaseName(currentMoonPhaseInDays)}</p>
                <p className="NextFullMoon">
                    {i18next.t('experiments:moonPhases:nextFullMoon') + formatDateToDDMMYYYY(nextFullMoonDate)}
                </p>
            </div>
            <div className='BackArrow' onClick={transitionToHome}>
                <svg className='ArrowSVG' xmlns="http://www.w3.org/2000/svg" width='6vw' height='10vh' viewBox='0 0 100 100'>
                    <rect x='30' y='50' width='40%' height='2.5%' fill='var(--isabelline)'/>  
                    <rect x='30' y='50' width='10%' height='2%' fill='var(--isabelline)' transform='rotate(-45, 30, 50)'/>
                    <rect x='30' y='50' width='13%' height='2%' fill='var(--isabelline)' transform='rotate(45, 30, 50)'/>
                    <circle cx='50' cy='50' r='35' stroke='var(--isabelline)' fill='transparent' strokeWidth='2' pathLength='1'/>
                </svg>
            </div>
        </div>
    )
}

export default MoonPage;