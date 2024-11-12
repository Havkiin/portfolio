import i18next from 'i18next';
import React from 'react';

function AppFooter () {
    return (
        <div className = {"AppFooter greywhite"}>
            <p>© Clément Hennebelle 2024</p>
            <a href="mailto:clement.hennebelle@hotmail.fr" className="Email">{i18next.t('footer:contact')}</a>
            <a href={`/Resume_ClémentHennebelle_${i18next.resolvedLanguage}.pdf`} className="Email" download>{i18next.t('footer:resume')}</a>
        </div>
    );
}

export default AppFooter;