// http://localhost:8000/api/users/

export const BASE_URL: string = "http://localhost:8000/api"
// export const VALERIA_BASE_URL: string = "http://192.168.1.134:8000/api"

//Auth
export const LOGIN_URL: string = `${BASE_URL}/users/tokens`
export const USER_DATA_URL: string = `${BASE_URL}/users/me`
export const USER_SIGNUP: string = `${BASE_URL}/users/`
export const GOOGLE_AUTH_URL: string = `${BASE_URL}/users/google-auth`
export const PROFILE_IMG_URL: string = `${BASE_URL}/users/profile/img`
export const PROFILE_IMG_UPLOAD_DONE = `${BASE_URL}/users/profile/img/done`
export const USER_WALLETS = `${BASE_URL}/wallets`