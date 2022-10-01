import { ObjectId } from 'mongodb';
import { UserInput } from './../resovers';
import { userDataCollection } from "../../../Database/databaseConnector";
import bcrypt from 'bcrypt'; 


async function hashPassword(password: string) { 
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.genSalt(saltRounds).then(async salt => { 
        return await bcrypt.hash(password, salt); 
    })
    return hashedPassword; 
}
async function CheckPassword(hash: string, passwordToCheck: string) { 
    return await bcrypt.compare(passwordToCheck, hash);
}

export async function updateUser(updatedUser: UserInput) { 
    const response = { str: "Success" }; 
    const list = await userDataCollection.find<UserInput & {_id: string}>({}).toArray(); 
    const oldUser = { ...list[0] as UserInput & {_id: string}};
    if (!oldUser) { 
        response.str = "Not found"; 
    }
    const newUser = updatedUser;
    newUser.password = await hashPassword(updatedUser.password); 
    await userDataCollection.updateOne({_id: new ObjectId(list[0]._id)}, { $set: newUser});

    return response.str 
}

export async function Login(userToLogin: UserInput) { 
    const response = { str: "Success", isLoggedIn: false };
    const userToCheck = await userDataCollection.findOne<UserInput & {_id: string}>({login: userToLogin.login});

    if (!userToCheck) { 
        response.str = "User not found"
        return response
    }

    if (await CheckPassword(userToCheck.password, userToLogin.password)) { 
        response.isLoggedIn = true 
        return response
    } else { 
        response.str = "Wrong password"
        return response
    }
}