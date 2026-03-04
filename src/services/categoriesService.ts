import api from "./api";   
import { CourseType } from "./courseService";

export type CategoryType = {
    id: number;
    name: string;
    position: number;
    courses: CourseType[];
};

const categoriesService = {
    getCategories: async () => {
        const res= await api.get("/categories",{
            headers: {
                Authorization: sessionStorage.getItem("onebitflix-token") 
                    ? `Bearer ${sessionStorage.getItem("onebitflix-token")}`
                    : undefined
            }   
        }).catch((error) => {
            // console.log(error.response.data.message);
            return error.response;
        });
        return res.data;
    },

    getCourses: async (id: number) => {
        const res= await api.get(`/categories/${id}`,{
            headers: {
                Authorization: sessionStorage.getItem("onebitflix-token") 
                    ? `Bearer ${sessionStorage.getItem("onebitflix-token")}`
                    : undefined
            }   
        }).catch((error) => {
            // console.log(error.response.data.message);
            return error.response;
        });
        return res.data;
    },
};

export default categoriesService;