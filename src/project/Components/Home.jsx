import { Outlet } from "react-router";
import { Apartments } from "./Apartments";
import AdvancedSearch from "./AdvancedSearch";

export const Home = () => {
  return (
    <><main>
      <Outlet></Outlet>
      <Apartments></Apartments>
      </main>
    </>
  );
};
export default Home;