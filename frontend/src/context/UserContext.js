import { createContext } from 'react'

import useAuth from '../hooks/useAuth'

const Context = createContext()

function UserProvider({ children }) {

    const { regiter } = useAuth()

    return (
        <Context.Provider value={regiter}>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }