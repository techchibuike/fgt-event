import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        const id = hash.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
            // Delay slightly to ensure content is rendered
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToAnchor;
