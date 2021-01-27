import React, { useState } from 'react';
import UserContext from "./context";

function UserProvider({ children }) {
    const [user, setUser] = useState();
    const value = {
        state: { user },
        actions: { setUser },
    };
    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    )
}


export default UserProvider
