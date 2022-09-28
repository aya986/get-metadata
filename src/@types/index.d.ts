import { IUser } from "./main";

declare global{
    namespace Express {
        interface Request {
            currentUser: IUser
        }
    }
}