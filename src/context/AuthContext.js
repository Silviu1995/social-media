import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"


const INITIAL_STATE = {
    user:{
        _id: "63d907f3c1e0fc1d678a4bef",
        username: "baca",
        email: "baca@gmail.com",
        profilePicture: "1675697728436Brad-Pitt-Wiki.jpg",
        coverPicture: "",
        isAdmin: false,
        followers: [],
        following: []
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return(
        <AuthContext.Provider
            value = {{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
                {children}
        </AuthContext.Provider>
    )
}