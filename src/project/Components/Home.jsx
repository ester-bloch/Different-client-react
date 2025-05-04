import { Outlet } from "react-router";
import { Apartments } from "./Apartments";
import AdvancedSearch from "./AdvancedSearch";

export const Home = () => {
  return (
    <><main>
      <Outlet></Outlet>
      <AdvancedSearch></AdvancedSearch>
      <Apartments></Apartments>
      </main>
    </>
  );
};
