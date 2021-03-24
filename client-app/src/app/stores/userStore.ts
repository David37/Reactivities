import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { User, UserFromValues } from "../models/user";

export default class UserStore {
    user: User | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFromValues) =>{
        try{
            const user = await agent.Account.login(creds);
            console.log(user);
        } catch(error){
            throw error;
        }
    }
}