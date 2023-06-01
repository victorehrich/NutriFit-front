import { UserInterface } from "../user/user.interface"

export interface LoginResponseInterface{
    token:string
    user:UserInterface
}