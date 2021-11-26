import BlindtestContext from "./BlindtestContext";
import { useState } from "react";
const BlindtestContextProvider = ({children}) => {

  const [blindtest, setBlindtest] = useState(false)

  const handleBlindtest = () => {
    setBlindtest(!blindtest)
  }
  return (
    <div>
      <BlindtestContext.Provider value={{
blindtest,
handleBlindtest
      }}>
        {children}
      </BlindtestContext.Provider>
    </div>
  );
};

export default BlindtestContextProvider;