import { useContext } from "react";
import ContateckContext from "../context/ContactekProvider";

const useContactek = () => {
  return useContext(ContateckContext);
};

export default useContactek;
