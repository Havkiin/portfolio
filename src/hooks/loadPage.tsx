import { useNavigate } from 'react-router-dom';

export const loadPage = (navigate: ReturnType<typeof useNavigate>, page : string, timeout : number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            navigate(page);
            
            resolve();
        }, timeout);
    });
}