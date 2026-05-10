import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,

            user: {
                id: req.user.id,
                fullName: req.user.fullName,
                email: req.user.email,
                profileImage: req.user.profileImage,
                bio: req.user.bio,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, bio } = req.body;

        let profileImage;

        if (req.file) {
            const base64 = req.file.buffer.toString("base64");

            const dataURI = `data:${req.file.mimetype};base64,${base64}`;

            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: "traveloop/profiles",
            });

            profileImage = uploadResult.secure_url;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id,
            },

            data: {
                fullName,
                bio,

                ...(profileImage && {
                    profileImage,
                }),
            },
        });

        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};