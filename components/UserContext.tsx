import React, { createContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '~/backend/firebaseConfig';

export const UserContext = createContext(null as User | null)

export const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
