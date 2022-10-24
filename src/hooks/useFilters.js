import { useContext } from "react";
import FilterContext from "../context/FilterProvider";

const useAuth = () => {
  return useContext(FilterContext);
};

export default useAuth;
