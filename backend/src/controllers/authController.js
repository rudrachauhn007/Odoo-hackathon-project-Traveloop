import bcrypt from "bcryptjs";

import prisma from "../config/prisma.js";

import generateToken from "../utils/generateToken.js";

import { signupSchema, loginSchema } from "../validations/authValidation.js";

export const signup = async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);

        const { fullName, email, password } = validatedData;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            },
        });

        const token = generateToken(user.id);

        res.status(201).json({
            success: true,

            token,

            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const { email, password } = validatedData;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,

            token,

            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
