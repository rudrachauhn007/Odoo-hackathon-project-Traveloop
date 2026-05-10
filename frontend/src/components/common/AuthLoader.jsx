import { useEffect } from "react";

import api from "../../lib/axios";

import useAuthStore from "../../store/authStore";

function AuthLoader() {
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) return;

                const res = await api.get("/users/me");

                setAuth({
                    user: res.data.user,

                    token,
                });
            } catch (error) {
                console.log(error);
            }
        };

        loadUser();
    }, []);

    return null;
}

export default AuthLoader;
