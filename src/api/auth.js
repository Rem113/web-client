import axios from "axios"

// { token: Token, name: String, isManager: Boolean }
export const login = (data) =>
  axios
    .post("http://localhost:3000/api/auth/login", data)
    .then((res) => res.data)

export const register = (data) =>
  axios
    .post("http://localhost:3000/api/auth/register", data)
    .then((res) => res.data)
