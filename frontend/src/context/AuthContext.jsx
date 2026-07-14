import React, { createContext, useState, useEffect, useContext } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext(null)


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const u = await authService.getMe();
                setUser(u);
            } catch (err) {
                console.warn('Authentication check failed:', err.message);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);


    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await authService.login(email, password);
            setUser(data.user);
            return data.user;
        } catch (err) {
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const register = async (name, email, password, role, specialty) => {
        setLoading(true);
        try {
            const data = await authService.register(name, email, password, role, specialty);
            setUser(data.user);
            return data.user;
        } catch (err) {
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        authService.logout();
        setUser(null);
    };


    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isTechnician: user?.role === 'technician'
    };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



export function useAuth() {
    const context = useContext(AuthContext)
    
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
