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
    const [pickedDay, setPickedDay] = useState(1);
    const [pickedMonth, setPickedMonth] = useState(1);
    const [pickedYear, setPickedYear] = useState(2001);
    const [pickedDate, setPickedDate] = useState<Date | null>(null);

    const moonRef = useRef<HTMLDivElement>(null);
    const stars1Ref = useRef<HTMLDivElement>(null);
    const stars2Ref = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const { setPreviousPage } = useNavigationContext();

    useParallaxWithMouse(moonRef, 1, 1, 0.01);
    useParallaxWithMouse(stars1Ref, 1, 1, 0.03);
    useParallaxWithMouse(stars2Ref, 1, 1, 0.02);

    const lunarMonth = 29.53;

    const validatePickedDay = (day: number) => {
        if (day < 1)
            day = 1;
        else if (day > 31)
            day = 31;

        setPickedDay(day);
        setNewPickedDate(day, pickedMonth, pickedYear);
    }

    const validatePickedMonth = (month: number) => {
        if (month < 1)
            month = 1;
        else if (month > 12)
            month = 12;

        setPickedMonth(month);
        setNewPickedDate(pickedDay, month, pickedYear);
    }
    
    const validatePickedYear = (year: number) => {
        if (year < 2001)
            year = 2001;
        else if (year > 9999)
            year = 9999;

        setPickedYear(year);
        setNewPickedDate(pickedDay, pickedMonth, year);
    }

    const setNewPickedDate = (day?: number, month?: number, year?: number) => {
        let date;
        
        if (!day) 
            date = new Date();
        else
            date = new Date(year!, month!- 1, day!);

        setPickedDate(date);
    }

    const getMoonPhaseInDays = (date : Date | null) => {
        if (date === null)
            return;

        const knownNewMoon = new Date('2000-01-06T18:14:00Z');
        const diff = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
        const phase = (diff % lunarMonth + lunarMonth) % lunarMonth;
        return phase;
    }

    const getNextFullMoon = (date : Date | null) => {
        if (!date)
            date = new Date();

        const currentPhase = getMoonPhaseInDays(date);
        const daysUntilFullMoon = (14.75 - currentPhase! + lunarMonth) % lunarMonth;
        const nextFullMoonDate = new Date(date.getTime() + daysUntilFullMoon * 24 * 60 * 60 * 1000);
        return nextFullMoonDate;
    };

    const dateToDDMMYYYY = (date : Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getMoonPhaseName = (moonPhaseInDays : number | undefined) => {
        if (moonPhaseInDays === undefined)
            return;

        if (moonPhaseInDays <= 1) {
            return i18next.t('experiments:moonPhases:newMoon');
        } else if (moonPhaseInDays <= 7.375) {
            return i18next.t('experiments:moonPhases:waxingCrescent');
        } else if (moonPhaseInDays <= 8.375) {
            return i18next.t('experiments:moonPhases:firstQuarter');
        } else if (moonPhaseInDays <= 14.75) {
            return i18next.t('experiments:moonPhases:waxingGibbous');
        } else if (moonPhaseInDays <= 15.75) {
            return i18next.t('experiments:moonPhases:fullMoon');
        } else if (moonPhaseInDays <= 22.125) {
            return i18next.t('experiments:moonPhases:waningGibbous');
        } else if (moonPhaseInDays <= 23.125) {
            return i18next.t('experiments:moonPhases:lastQuarter');
        } else if (moonPhaseInDays <= lunarMonth) {
            return i18next.t('experiments:moonPhases:waningCrescent');
        }

    }
    
    const getMoonPhaseInDecimal = (date : Date | null) => {
        if (!date)
            date = new Date();
        
        const phase = getMoonPhaseInDays(date);
        return phase! / lunarMonth;
    }

    const moonCycleToCircleOffset = (moonPhaseDecimal : number) => {
        const offsetMidPoint = 50;
        const offsetHalfSize = 100;
        const fullestMoonPoint = 0.51;
    
        if (moonPhaseDecimal <= fullestMoonPoint) {
            return offsetMidPoint - offsetHalfSize * (moonPhaseDecimal * (1 / fullestMoonPoint));
        } else {
            return (offsetMidPoint + offsetHalfSize) - offsetHalfSize * ((moonPhaseDecimal - fullestMoonPoint) * (1 / fullestMoonPoint));
        }
    }

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

    useEffect(() => {
        const dateToday = new Date();

        setPickedDay(dateToday.getDate());
        setPickedMonth(dateToday.getMonth() + 1);
        setPickedYear(dateToday.getFullYear());
        setNewPickedDate();
    }, []); 

    return (
        <div className="Environment">
            <div className={"Curtain MoonCurtain open" + (isCurtainClosed ? ' closed' : '')}></div>
            <div className="Moon" ref={moonRef}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <clipPath id='moonClip'>
                        <circle cx='50' cy='50' r='50' />
                    </clipPath>
                    <circle 
                        cx={moonCycleToCircleOffset(getMoonPhaseInDecimal(pickedDate))} cy='50' r='50'
                        className='MoonShadow'
                        fill='black' opacity='65%'
                        clipPath="url(#moonClip)"
                    />
                </svg>
            </div>
            <div className="Stars1 BackgroundImage" ref={stars1Ref}></div>
            <div className="Stars2 BackgroundImage" ref={stars2Ref}></div>
            <div className="InfoHolder">
                <div className="DateContainer">
                    <input type='text' name='day' className="Day"
                        value={pickedDay}
                        onChange={(e) => setPickedDay(parseInt(e.target.value))}
                        onBlur={(e) => validatePickedDay(parseInt(e.target.value))}/> /
                    <input type='number' name='month' className="Month"
                        value={pickedMonth}
                        onChange={(e) => setPickedMonth(parseInt(e.target.value))}
                        onBlur={(e) => validatePickedMonth(parseInt(e.target.value))}/> /
                    <input type='number' name='year' className="Year"
                        value={pickedYear}
                        onChange={(e) => setPickedYear(parseInt(e.target.value))}
                        onBlur={(e) => validatePickedYear(parseInt(e.target.value))}/>
                </div>  
                <div className="MoonPhaseName eras-demi-itc">{getMoonPhaseName(getMoonPhaseInDays(pickedDate))}</div>
                <div className="NextFullMoon">
                    {i18next.t('experiments:moonPhases:nextFullMoon') + dateToDDMMYYYY(getNextFullMoon(pickedDate))}
                </div>
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