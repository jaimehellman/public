import { createContext } from "react";
import Combo from "../../Combo";

interface TreeContextType {
    SetValue : Function;
}

const context = createContext<TreeContextType>({
    SetValue : (nodes: Array<Combo>) => {},
});

export default context;
  