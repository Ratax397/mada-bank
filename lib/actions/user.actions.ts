'use server';
import { email } from "zod";
import { createSessionClient } from "../appwrite";
import { createAdminClient } from "../appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email , password}: signInProps) => {
    try {

        //mutation / base de donnee / Faire une requête
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession({
            email,
            password
        })

        //Sauvegarder la session
        const cookieStore = await cookies();
        cookieStore.set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(session)
        
    } catch (error) {
        console.error('Error',error)
    }
}

export const signUp = async (  userData: SignUpParams  ) => {
    try {

        const { email,password,firstName,lastName } = userData;

        //creer un compte
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),           // userId
            email,                 // email  
            password,              // password
            `${firstName} ${lastName}` // name
        );
        const session = await account.createEmailPasswordSession({
            email,
            password
        });

        const cookieStore = await cookies();
        cookieStore.set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });

          return parseStringify(newUserAccount)
        
    } catch (error) {
        console.error('Error',error)
    }
}



export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get();

      return parseStringify(user)
    } catch (error) {
      return null;
    }
  }

  export const logoutAccount = async () => {
    try{

        const {account} = await createSessionClient();

        const cookieStore = await cookies();
        cookieStore.delete('appwrite-session');

        await account.deleteSession('current')

    }
    catch(error){
        return null;
    }
  }


  