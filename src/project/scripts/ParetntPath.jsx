import { useLocation } from 'react-router-dom';

const useParentPath = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    
    // Remove the last segment
    pathSegments.pop();
    
    // Join the remaining segments to form the new path
    const parentPath = `/${pathSegments.join('/')}`;
    
    return parentPath;
};

export default useParentPath;