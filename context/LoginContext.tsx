import {createContext, useContext, useState} from 'react';

interface UserContextData {
    isLogin: boolean;
    setLogin: (isLogin: boolean) => void;
}

const AppContext = createContext<UserContextData>({
    isLogin: true,
    setLogin: () => {}

})

export const AppContextProvider = ({children}) => {
    const [isLogin, setLogin] = useState(false);

    return (
        <AppContext.Provider value={{isLogin, setLogin}}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext =()=>useContext(AppContext)