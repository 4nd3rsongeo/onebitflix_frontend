import api from "./api";

export type EpisodeType = {
    id: number;
    name: string;
    synopsis: string;
    order: number;
    videoUrl: string;
    secondsLong: number;
};

export type CourseType = {
    id: number;
    name: string;
    thumbnailUrl: string;
    synopsis: string;
    episodes?: EpisodeType[];
}

const courseService = {
    getNewestCourses: async () => {
        const res = await api.get("/courses/newest").catch((error) => {
            // console.log(error.response.data.message);
            return error.response;
        })
        return res;
    },
    getFeaturedCourses: async () => {
        try {
        const token = sessionStorage.getItem("onebitflix-token");

        const res = await api.get("/courses/featured", {
            headers: {
            Authorization: token ? `Bearer ${token}` : "",
            },
        });

        return { data: res.data, error: null };
        } catch (error: any) {
        // console.log(error.response?.data?.message || "Erro inesperado");
        return { data: null, error: error.response?.data?.message };
        }
   },
   addToFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api.post("/favorites", { courseId }, {
        headers: {
        Authorization: token ? `Bearer ${token}` : "",
        },
    }).catch((error) => {
        // console.log(error.response.data.message);
        return error.response;
    })
    return res;
   },

   removeFav:  async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api.delete(`/favorites/${courseId}`, {
        headers: {
        Authorization: token ? `Bearer ${token}` : "",
        },
        data: { courseId }
    }).catch((error) => {        
        return error.response;
    })
    return res;
    },
    getFavCourses: async () => {
        const token = sessionStorage.getItem("onebitflix-token");
        const res = await api.get("/favorites", {
            headers: {
            Authorization: token ? `Bearer ${token}` : "",  
            },
        }).catch((error) => {            
            return error.response;
        })
        return res;
    }


}

export default courseService;