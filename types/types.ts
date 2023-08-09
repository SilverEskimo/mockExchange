export interface IUserWallet {
    asset_id: string,
    wallet_address: string,
    balance: number
}

export interface IAuthTokens {
    readonly access: string,
    readonly refresh: string
}

export interface IUserData {
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        username: string
        imgUrl: string
    } | null
    
}

export interface IUserSignUpData {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
}

export interface INotificationData {
    status: string,
    msg: string
}