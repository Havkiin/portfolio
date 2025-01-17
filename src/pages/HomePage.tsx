import React, { useEffect, useRef, useState } from 'react';
import '../styles/App.css';
import '../styles/HomePage.css';
import '../styles/IntroSection.css';
import '../styles/ProjectsSection.css';
import '../styles/ExperimentsSection.css';
import '../styles/AboutSection.css';

import logo1 from '/Logo1.svg';
import logo2 from '/Logo2.svg';
import logo3 from '/Logo3.svg';
import logo4 from '/Logo4.svg';

import { useNavigate } from 'react-router-dom';
import useScrollAmount from '../hooks/ScrollAmount';
import useParallaxWithMouse from '../hooks/ParallaxWithMouse';
import { scrollToElement, scrollToSection } from '../hooks/scrollToElement';
import { loadPage } from '../hooks/loadPage'
import { Pages } from '../App';
import { useNavigationContext } from "../hooks/NavigationContext";
import { sendEmail } from '../api/serverCalls'
import i18next from '../data/Translations';
import useElementsOnScreen from '../hooks/ElementOnScreen';

enum EmailSendStateEnum {
  None = 'None',
  Sending = 'Sending',
  Sent = 'Sent'
}
    
const HomePage : React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isCurtainClosed, setIsCurtainClosed] = useState(false);
  const [otherLanguage, setOtherLanguage] = useState<string | undefined>('fr');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSendState, setEmailSendState] = useState<EmailSendStateEnum>(EmailSendStateEnum.None);

  const appRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionTitleRef = useRef<HTMLDivElement>(null);
  const experimentsSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const yisstBannerRef = useRef<HTMLDivElement>(null);
  const yisstBannerShadowRef = useRef<HTMLDivElement>(null);
  const yisstNameRef = useRef<HTMLDivElement>(null);
  const navigationBarRef = useRef<HTMLDivElement>(null);
  const projectColorRef = useRef<HTMLDivElement>(null);

  const [containerRefs, visibleItems] = useElementsOnScreen({ threshold: 0.4 });
  const { navigationType, previousPage } = useNavigationContext();
  const scrollAmount = useScrollAmount();
  const navigate = useNavigate();

  useParallaxWithMouse(titleRef, 1, 1, 0.05);
  useParallaxWithMouse(logoRef, 1, 1, 0.05);

  const getSidebarBottomOffset = (maxOffset : number) : number => {
    var offset = maxOffset - (maxOffset * scrollAmount);
    return offset;
  }

  const changeLanguage = () => {
    setOtherLanguage(getOtherLanguage);
    const lng = i18next.resolvedLanguage === 'en' ? 'fr' : 'en';

    i18next.changeLanguage(lng);
  }

  const getOtherLanguage = () => {
    return (i18next.resolvedLanguage === 'en') ? 'fr' : 'en';
  }

  const dissolveElements = (
    bannerRef : React.RefObject<HTMLDivElement>,
    nameRef : React.RefObject<HTMLDivElement>
  ) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        nameRef.current!.classList.remove("condense");
        projectsSectionTitleRef.current!.classList.remove("condense");
        navigationBarRef.current!.classList.remove("condense");
        var bannerChildren = bannerRef.current!.children;
        for (let child of bannerChildren) {
          child.classList.remove("condense");
        }
        
        nameRef.current!.classList.add("dissolve");
        projectsSectionTitleRef.current!.classList.add("dissolve");
        navigationBarRef.current!.classList.add("dissolve");
        var bannerChildren = bannerRef.current!.children;
        for (let child of bannerChildren) {
          child.classList.add("dissolve");
        }

        resolve();
      }, 500);
    });
  }

  const changeLayout = (
    bannerRef : React.RefObject<HTMLDivElement>,
    bannerShadowRef : React.RefObject<HTMLDivElement>
  ) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        bannerRef.current!.classList.remove("toThumbnail");
        bannerShadowRef.current!.classList.remove("toThumbnailShadow");
        
        bannerRef.current!.classList.add("toBanner");
        bannerShadowRef.current!.classList.add("toBannerShadow");

        resolve();
      }, 500);
    });
  }

  const expandColor = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        projectColorRef.current!.classList.remove("retracted");
        projectColorRef.current!.classList.add("expanded");

        resolve();
      }, 500);
    })
  }

  const closeCurtain = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsCurtainClosed(true);
        
        resolve();
      }, 10);
    });
  }

  const transitionToProject = (
    projectPage : Pages,
    bannerRef : React.RefObject<HTMLDivElement>,
    bannerShadowRef : React.RefObject<HTMLDivElement>,
    nameRef : React.RefObject<HTMLDivElement>
  ) => {
    scrollToSection(projectsSectionRef, 300)
      .then(() => dissolveElements(bannerRef, nameRef))
      .then(() => changeLayout(bannerRef, bannerShadowRef))
      .then(expandColor)
      .then(() => loadPage(navigate, projectPage, 500))
      .catch((error) => { 
        console.error("An error occurred:", error);
      });
  }

  const transitionToExperiment = (experiementPage : Pages) => {
    closeCurtain()
      .then(() => loadPage(navigate, experiementPage, 1000))
      .catch((error) => { 
        console.error("An error occurred:", error);
      });
  }

  const validateName = (input: string) : boolean | undefined => {
    return input.length >= 3;
  }

  const validateEmail = (email : string) : boolean => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null;
  }

  const validateMessage = (input: string) : boolean | undefined => {
    return input.length >= 10;
  }

  const handleSendEmail = async () => {
    try {
      setEmailSendState(EmailSendStateEnum.Sending);
      await sendEmail(name, email, message);
      setEmailSendState(EmailSendStateEnum.Sent);
      console.log('Email sent successfully!');
    }
    catch (error) {
      console.error('Failed to send email:', error);
    }
  }

  useEffect(() => {
    setIsSidebarVisible(scrollAmount > 0.05);
  }, [scrollAmount])

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
      }
    }

  }, [location.hash]);

  useEffect(() => {
    setOtherLanguage(getOtherLanguage());
  }, []);

  return (
    <div className="App" ref={appRef}>
      <div
        ref={(el) => (containerRefs.current[0] = el)}
        className={"Curtain HomeCurtain" + ((navigationType === 'direct') ? ' open' : '')}
      ></div>
      <div className={
        "Curtain MoonCurtain"
        + ((navigationType === 'in-app' && previousPage === Pages.Moon) ? ' open' : '')
        + (isCurtainClosed ? ' closed' : '')}
      >
      </div>
      <div className="Intro Section" ref={introSectionRef}>
        <div className="Header eras-medium-itc slide-from-bottom" style={{ '--animation-delay': '1.5s' } as any}>
          <span className="HeaderElement" onClick={() => { scrollToElement(projectsSectionRef.current) }}>
            {i18next.t('sections:projects')}
          </span>
          <span className="HeaderElement" onClick={() => { scrollToElement(experimentsSectionRef.current) }}>
            {i18next.t('sections:experiments')}
          </span>
          <span className="HeaderElement" onClick={() => { scrollToElement(aboutSectionRef.current) }}>
            {i18next.t('sections:about')}
          </span>
          <span className="HeaderElement" onClick={() => changeLanguage()}>
            {otherLanguage?.toUpperCase()}
          </span>
        </div>
        <div className="MainElements">
          <div className="Presentation" ref={titleRef}>
            <div className="Name eras-demi-itc">Clément Hennebelle</div>
            <svg id="Layer_3" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 509 87">
              <path className="letter" id="Mask-creative-c" d="M33,27.5s6-4,8-8,6-12,2-14-13,2-24,16C8,35.5,1,54.5,10,61.5c7.45,5.79,25.55-18.5,25.55-18.5" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-creative-r" d="M50.98,35.62s-6.53,5.37-11.9,21.09,7.75-14.97,22.7-22.64c14.72-8.19-23.28,18.89,4.9,6.18" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" pathLength="1"/>
              <path className="letter" id="Mask-creative-e1" d="M67.82,51.49s16.16-4.99,14.67-14.49c-1.49-5.5-24.49,19.5-12.49,21.5s17.53-9.5,17.53-9.5" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-creative-a" d="M109.57,35.39c1-10-24,17-15.19,21.4,3.01,1.04,9.19-10.03,15.19-18.72s-13.34,22.16-1.17,20.74" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <g id="Mask-creative-t">
                <path className="letter" id="Mask-creative-t-line2" d="M133.5,20s-22.5,32.5-16,39c3.16,3.16,13.07-11.31,13.07-11.31" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
                <line className="letter" id="Mask-creative-t-line2-2" data-name="Mask-creative-t-line2" x1="118.32" y1="33.01" x2="138.32" y2="28.01" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              </g>
              <g id="Mask-creative-i">
                <path className="letter" id="Mask-creative-i-line1" d="M147.5,35s-10,12-12,24" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
                <path className="letter" id="Mask-creative-i-line2" d="M153.13,22.82s5.37-7.82.37-.82" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              </g>
              <path className="letter" id="Mask-creative-v" d="M157.82,35.71s-12.39,21.19-6.36,21.74,16.03-23.45,15.03-21.45c0,0-8.06,17,6.47,7" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-creative-e2" d="M174.48,49.53s16.16-4.99,14.67-14.49c-1.49-5.5-24.49,19.5-12.49,21.5s17.53-9.5,17.53-9.5" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <g id="Mask-programmer-p">
                <path className="letter" id="Mask-programmer-p-line1" d="M225.58,59.71c4.58-14.79,23.42-54.21,23.42-54.21" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
                <path className="letter" id="Mask-programmer-p-line2" d="M239.65,14.21s32.13-18.17,28.84,0c-3.49,19.29-29.63,25.51-34.56,20.4" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              </g>
              <path className="letter" id="Mask-programmer-r1" d="M270.69,35.79s-6.53,5.37-11.9,21.09,7.75-14.97,22.7-22.64c14.72-8.19-23.28,18.89,4.9,6.18" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" pathLength="1"/>
              <path className="letter" id="Mask-programmer-o" d="M300.75,46.26s7.45-6.49,3.6-12.87-22.03,18.92-14.69,24.02,14.06-15.21,14.06-15.21" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-programmer-g" d="M322.06,45s6-5.52,5.47-12.01-23.03,13.35-17.28,21.93,15.98-12.72,15.98-12.72c0,0-20.23,43.3-26.23,40.3s-.79-14.42,15.1-21.21,18.9-17.79,18.9-17.79" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-programmer-r2" d="M347.61,36.35s-6.53,5.37-11.9,21.09,7.75-14.97,22.7-22.64c14.94-7.67-21.14,18.23,4.9,6.18" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" pathLength="1"/>
              <path className="letter" id="Mask-programmer-a" d="M381.73,35.48c1-10-24,17-15.19,21.4,3.01,1.04,9.19-10.03,15.19-18.72s-13.34,22.16-1.17,20.74" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-programmer-m1" d="M397.03,35.05c-6.53,8.95-12.74,26.48-11.14,24.21s10.6-19.27,18.6-21.27-8,8-9,19c-1,2,8-17,20-20,4-1-14.7,10.94-6.85,22.47" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-programmer-m2" d="M429.43,34.15c-6.53,8.95-12.74,26.48-11.14,24.21s10.6-19.27,18.6-21.27-8,8-9,19c-1,2,8-17,20-20,4-1-14.7,10.94-6.85,22.47" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-programmer-e" d="M451.73,50.04s16.16-4.99,14.67-14.49c-1.49-5.5-24.49,19.5-12.49,21.5s17.53-9.5,17.53-9.5" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4" pathLength="1"/>
              <path className="letter" id="Mask-programmer-r2-2" data-name="Mask-programmer-r2" d="M486.79,35.3s-6.53,5.37-11.9,21.09,7.75-14.97,22.7-22.64c14.94-7.67-21.14,18.23,4.9,6.18" fill="none" stroke="#f2f0eb" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" pathLength="1"/>
            </svg>
          </div>
          <div className = "Logo" ref={logoRef}>
            <img src={logo4} alt="Logo4" className="Logo4"/>
            <img src={logo3} alt="Logo3" className="Logo3"/>
            <img src={logo2} alt="Logo2" className="Logo2"/>
            <img src={logo1} alt="Logo1" className="Logo1"/>
          </div>
        </div>
        <div 
          className={"ToProjects"}
          style={{pointerEvents: isSidebarVisible ? 'none' : 'all'}} 
          onClick={() => { scrollToElement(projectsSectionRef.current) }}>
            <p className={'ToProjectsText opacity-zero lucida-sans' + (isSidebarVisible ? ' hide-toProjects-text' : ' show-toProjects-text')}>
             {i18next.t('sections:projects')}
            </p>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width='10vw' height='5vh'
              className={'ToProjectsArrow ' + (isSidebarVisible ? ' hide-toProjects-arrow' : ' show-toProjects-text')}
            >
              <rect x='45%' y='0' width='0.1em' height='100%' fill='var(--isabelline)' />
            </svg>
        </div>
      </div>
      <section id="projects" ref={(el) => (containerRefs.current[1] = el)}> 
        <div className="Projects Section" ref={projectsSectionRef}>
          <div
            className={"SectionTitle Title eras-demi-itc opacity-zero"
              + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ?
                ' condense' :
                (visibleItems[1] ? ' slide-from-bottom' : ''))}
            ref={projectsSectionTitleRef}
            style={{ '--animation-delay': '0s' } as any}
          >
            {i18next.t('sections:projects')}
          </div>
          <div
            className={"ProjectImageContainer" +
            ((navigationType === 'in-app' && previousPage === Pages.Yisst) ?
              ' toThumbnail' :
              '')}
            ref={yisstBannerRef}
            onClick={() => { transitionToProject(Pages.Yisst, yisstBannerRef, yisstBannerShadowRef, yisstNameRef)}}
          >
            <div className={"ProjectName" + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ? ' condense' : '')} ref={yisstNameRef}>
              <div className="ProjectTitle eras-demi-itc">YISST</div>
              <div className={"ProjectDescription lucida-bright-italic" + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ? ' condense' : '')}>
                {i18next.t('projects:yisst:description')}
              </div>
            </div>
            <button
              className={"SeeMoreButton lucida-sans-regular" + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ? ' condense' : '')}
              >
                {i18next.t('projects:yisst:seeMore')}
            </button>
          </div>
          <div className={"ProjectImageShadow" + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ? ' toThumbnailShadow' : '')} ref={yisstBannerShadowRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%'>
              <rect x='0' y='0' width='100%' height='100%' fill='black' opacity='100%' />
            </svg>
          </div>
          <div className={"ProjectImageShadow2" + (navigationType === 'in-app' ? ' hidden' : (visibleItems[1] ? ' scaleY-down' : ''))}>
           <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%'>
              <rect x='0' y='0' width='100%' height='100%' fill='black' opacity='100%' />
            </svg>
          </div>
        </div>
      </section>
      <section id="experiments" ref={(el) => (containerRefs.current[2] = el)}>
        <div className="Experiments Section" ref={experimentsSectionRef}>
          <div
            className={"SectionTitle Title eras-demi-itc opacity-zero" + (visibleItems[2] ? ' slide-from-bottom' : '')}
            style={{ '--animation-delay': '0s' } as any}
          >
            {i18next.t('experiments:experiments')}
          </div>
          <div 
            className="ExperimentsContainer"
            style={{ '--animation-delay': '0.2s' } as any}
          >
            <div className="SingleExperimentContainer">
              <div className="Experiment" onClick={() => transitionToExperiment(Pages.Moon)}>
                <div className="ExperimentCover eras-demi-itc">{i18next.t('experiments:moonPhases:moonPhases')}</div>
              </div>
              <div className={"ExperimentShadow" + (visibleItems[2] ? ' scaleY-down' : '')}>
                <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%'>
                  <rect x='0' y='0' width='100%' height='100%' fill='black' opacity='100%' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="About Section" ref={aboutSectionRef}>
          <div className="ContactContainer">
            <div className="ProfilePicture">
            </div>
            <div className={"ProfileDescription" + (isAboutExpanded ? ' aboutExpanded' : ' expandOnHover')}>
              <div
                className={"ExpandArrow" + (isAboutExpanded ? ' flipped' : '')}
                onClick={() => {setIsAboutExpanded(!isAboutExpanded)}}>
                  {'>'}
              </div>
              <div className="ProfileDescriptionBackground"></div>
              <div className="ProfileDescriptionTitle eras-medium-itc">
                {i18next.t('about:aboutMe')}
              </div>
              <div className="ProfileDescriptionContent lucida-bright">
                {i18next.t('about:description1')}
              </div>
              <div className="ProfileDescriptionContent lucida-bright">
                {i18next.t('about:description2')}
              </div>
              <div className="ProfileDescriptionContent lucida-bright">
                {i18next.t('about:description3')}
              </div>
              <div className="ProfileDescriptionContent lucida-bright">  
                {i18next.t('about:description4')}
              </div>
              <div className="IconContainer lucida-sans">
                <div className="Icon">
                  <div className="IconImage HTML"></div>
                  <div className="IconName">HTML</div>
                </div>
                <div className="Icon">
                  <div className="IconImage CSS"></div>
                  <div className="IconName">CSS</div>
                </div>
                <div className="Icon">
                  <div className="IconImage TypeScript"></div>
                  <div className="IconName">TypeScript</div>
                </div>
                <div className="Icon">
                  <div className="IconImage React"></div>
                  <div className="IconName">React</div>
                </div>
                <div className="Icon">
                  <div className="IconImage Node"></div>
                  <div className="IconName">Node.js</div>
                </div>
              </div>
            </div>
            <div className="ContactForm">
              <div className="ContactFormTitle eras-medium-itc">{i18next.t('contact:letsTalk')}</div>
              <div className="ContactFormSubtitle lucida-bright-italic">{i18next.t('contact:questionProjects')}</div>
              <input
                className={`ContactInput ContactField eras-medium-itc`
                  + ((name.length > 0) ? ((!validateName(name)) ? ' redBorder' : ' whiteBorder') : ' grayBorder')
                  + (emailSendState === EmailSendStateEnum.Sent ? ' hidden' : '')}
                type="text"
                name="Name"
                placeholder={i18next.t('contact:name')}
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                autoComplete="given-name"
              />
              <input
                className={`ContactInput ContactField eras-medium-itc`
                  + ((email.length > 0) ? ((!validateEmail(email)) ? ' redBorder' : ' whiteBorder') : ' grayBorder')
                  + (emailSendState === EmailSendStateEnum.Sent ? ' hidden' : '')}
                type="text"
                name="Email"
                placeholder={i18next.t('contact:email')}
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                autoComplete="email"
              />
              <textarea
                className={`ContactInput ContactMessage eras-medium-itc`
                  + ((message.length > 0) ? ((!validateMessage(message)) ? ' redBorder' : ' whiteBorder') : ' grayBorder')
                  + (emailSendState === EmailSendStateEnum.Sent ? ' hidden' : '')}
                name="Message"
                placeholder={i18next.t('contact:message')}
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
              />
              <div className="ProfileButtonContainer ">
                <button
                  className={`ProfileButton SendButton lucida-sans-regular`
                    + (emailSendState !== EmailSendStateEnum.None ? ' hidden' : '')
                    + (validateName(name) && validateEmail(email) && validateMessage(message) ? '' : ' disabledButton')}
                  onClick={handleSendEmail}
                >
                  {i18next.t('contact:send')}
                </button>
                <svg
                  className={emailSendState === EmailSendStateEnum.Sending ? '' : 'hidden'}
                  xmlns="http://www.w3.org/2000/svg" width='100%' height='100%' viewBox='0 0 100 100'>
                    <circle cx='50' cy='50' r='40' className='LoadingCircle1'
                      fill='transparent' stroke='var(--isabelline)' strokeWidth='3' pathLength='1'
                    >
                    </circle>
                    <circle cx='50' cy='50' r='30' className='LoadingCircle2'
                      fill='transparent' stroke='var(--isabelline)' strokeWidth='3' pathLength='1'
                    >
                    </circle>
                </svg>
              </div>
              <div className={`SuccessMessage eras-medium-itc`
                + (emailSendState === EmailSendStateEnum.Sent ? ' appear-floating' : '')}
              >
                <p className='Message1'>{i18next.t('contact:messageSent1')}</p>
                <p className='Message2'>{i18next.t('contact:messageSent2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={"NavigationSidebar" + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ? ' condense' : '')}
        ref={navigationBarRef}
      >
        <div
          className='BackToTop lucida-sans'
          style={{
            opacity: isSidebarVisible ? '1' : '0',
            bottom: `${getSidebarBottomOffset(70)}%`,
            pointerEvents: isSidebarVisible ? 'all' : 'none'
          }}
          onClick={() => { scrollToElement(introSectionRef.current) }}>
            <span className="BackToTopArrow">
              <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%' viewBox='0 0 100 100'>
                <g className="ArrowHead">
                  <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%' viewBox='0 0 100 100'>
                    <rect x='50' y='0' width='5' height='20' fill='var(--caramel)' transform='rotate(45, 50, 0)' />
                    <rect x='50' y='0' width='5' height='20' fill='var(--caramel)' transform='rotate(-45, 55, 0)' />
                  </svg>
                </g>
                <rect x='50' y='0' width='5' height='400' fill='var(--caramel)' />
              </svg>
            </span>
            <span className="BackToTopText">
              {i18next.t('general:backToTop')}
            </span>
        </div>
      </div>
      <div className={"ProjectColor" + ((navigationType === 'in-app' && previousPage === Pages.Yisst) ? ' retracted' : '')} ref={projectColorRef}></div>
    </div>
  );
}

export default HomePage;