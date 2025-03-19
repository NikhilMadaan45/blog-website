import config from './config.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name}) {
        try {
            const userAccount = await this.account.create( ID.unique(),email, password, name);
            if(!userAccount) {
                // Handle error
                return null;
            }

            // Called another method to login the user
            return this.login({ email, password });
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if(!session) {
                // Handle error
                return null;
            }
            return session;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if(!user) {
                // Handle error
                return null;
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
