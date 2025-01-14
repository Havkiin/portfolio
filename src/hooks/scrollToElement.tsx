export const scrollToElement = (element: HTMLElement | null) => {
    if (element !== null) {
        element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
}

export const scrollToSection = (divRef : React.RefObject<HTMLDivElement>, delay : number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            scrollToElement(divRef.current);
            resolve();
        }, delay);
    });
}
