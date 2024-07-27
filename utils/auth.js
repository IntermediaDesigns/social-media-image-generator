// utils/auth.js
import { account } from './appwrite';

export const createAccount = async (email, password, name) => {
    try {
        const response = await account.create('unique()', email, password, name);
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.log('Error getting current user:', error);
        return null;
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.log('Error during logout:', error);
    }
};