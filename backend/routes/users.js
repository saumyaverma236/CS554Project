import { Router } from 'express';
export const router = Router();

import { users } from "../config/mongoCollection.js";
import * as userData from '../data/users.js'
import bcryptjs from 'bcryptjs';
import xss from 'xss';

router.post("/signup", async (req, res) => {
    let input = req.body;
    let name = input.name;
    let email = input.email;

    // Check if the user already exists
    try {
      
        const existingUser = await userData.getUserByEmail(email);
        console.log("Existing user:",existingUser);
        if (existingUser) {
            // User already exists, redirect to the frontend dashboard
            
            return res.status(409).json({ message: "User already exists. Redirecting to dashboard." });
        }
    } catch (error) {
        // Handle errors that might occur during fetching the user
        return res.status(500).json({ error: "Internal server error while checking user existence." });
    }

    // If user does not exist, proceed with creating a new user
    try {
      console.log(email);
        const newUser = await userData.createUser(xss(name), xss(email));
        return res.status(200).json({_id: newUser._id, name: newUser.name, email: newUser.email});gi 
    } catch (e) {
        return res.status(e[0]).json({error:e[1]});
    }
});

export default router;
