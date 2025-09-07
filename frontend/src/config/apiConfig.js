import axios from "axios"

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5454"
const jwt = localStorage.getItem("jwt")


export const api = axios.create({
    baseURL : API_BASE_URL,
    header:{
        "Authorization": `Bearer${jwt}`,
        'content-type': "application/json"
    }
})