import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"


// API class

// Static class tying together methods used to get/send to the database


class FoodlyApi {

    static token;

    static async request(endpoint , data = {} , method = 'get') {

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization : `Bearer ${this.token}`};
        const params = (method === 'get') ? data : {};
    


    try {
        return (await axios({ url , method , data , params, headers})).data;
    }catch(err) {
        console.error("API Error" , err.response);
        let message = err.response.data.error.mesage;
        throw Array.isArray(message) ? message : [message];
    }
}


    static async register(data) {
        let res = await this.request('auth/register' , data , 'post');
        this.token = res.token;
        return res.token;
    }

    static async get(username) {
        let res = await this.request(`users/${username}`)
        return res.user;
    }

    static async authenticate(data) {
        let res = await this.request('auth/token' , data , 'post');
        this.token = res.token;
        return res.token;
    }

    static async updateUser(username , data) {
        let res = await this.request(`users/${username}` , data , 'patch');
        return res
    }

    static async filterByCategory(searchParam) {
        let res = await this.request(`recipes/filter/${searchParam}`);
        return res
    }

    static async searchRecipesByCategoryOrArea(category , searchParam) {
        let res = await this.request(`recipes/search/${category}/${searchParam}`);
        return res;
    }

    static async randomMeal() {
        let res = await this.request(`recipes/random`);
        return res;
    }

    static async findOne(id) {
        let res = await this.request(`recipes/find/${id}`);
        return res.results;
    }

    static async makeComment(data) {
        if(data.origionalCommentId === ''){
        let res = await this.request(`comments/${data.username}/${data.api_id}/postcomment` , data , 'post')
        return res
        }else {
            let res = await this.request(`comments/${data.api_id}/${data.username}/${data.origionalCommentId}/commentoncomment` , data , 'post');
            return res
        }
    }

    static async getAllComments(recipeId) {
        let res = await this.request(`comments/${recipeId}`);
        return res
    }

    static async deleteComment(commentId , username) {
        let res = await this.request(`comments/delete/${username}/${commentId}` , {} , 'delete');
        return res
    }

    static async getSubComments(origionalCommentId) {
        let res = await this.request(`comments/commentcommentedon/${origionalCommentId}`)
        return res.results
    }

    static async saveMeal(username , mealId) {
        let res = await this.request(`recipes/save/${username}/${mealId}` , {} , 'post')
        return res
    }

    static async getSavedMeal(username , mealId) {
        let res = await this.request(`recipes/liked/${username}/${mealId}`);
        return res;
    }

    static async getAllSavedMeals(username) {
        let res = await this.request(`recipes/${username}/likedrecipes`);
        return res;
    }

    static async deleteSavedMeal(username , mealId) {
        let res = await this.request(`recipes/delete/${username}/${mealId}` , {} ,'delete');
        return res;
    }
}



export default FoodlyApi;