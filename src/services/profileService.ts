"use client";

import api from "./api";

interface UserParams {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;  
    createdAt: string;
}

interface PasswordParams {
    currentPassword: string;
    newPassword: string;
}

export const profileService = {
    fetchCurrent: async () => { 
        const token = sessionStorage.getItem("onebitflix-token");

        const res = await api.get("/users/current", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).catch((error: any) => {
            return error.response;
        });
        console.log("USER DATA:", res.data);
        return res.data;
    },

    userUpdate: async (params: UserParams) => { 
        const token = sessionStorage.getItem("onebitflix-token");

        const res = await api.put("/users/current", params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).catch((error: any) => {
            if(error.response.status === 400 || error.response.status === 401) {
                return error.response;
            }           
            return error;
        });
        return res.status;
    },
    passwordUpdate: async (params: PasswordParams) => {
        const token = sessionStorage.getItem("onebitflix-token");

        const res = await api.put("/users/current/password", params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).catch((error: any) => {
            if(error.response.status === 400 || error.response.status === 401) {
                return error.response;
            }
            return error;
        });
        return res.status;
    },
};