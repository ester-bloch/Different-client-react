import { useLocation } from "react-router-dom";

const useParentPath = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment);
  pathSegments.pop();
  const parentPath = `/${pathSegments.join("/")}`;
  return parentPath;
};
export default useParentPath;
