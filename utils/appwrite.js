// utils/appwrite.js
import { Client, Account } from 'appwrite'

const client = new Client()
    .setEndpoint('https://[HOSTNAME]/v1')
    .setProject('[PROJECT_ID]')

export const account = new Account(client)

export const login = (email, password) => {
    return account.createEmailSession(email, password)
}

export const logout = () => {
    return account.deleteSession('current')
}