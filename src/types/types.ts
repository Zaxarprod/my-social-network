

export type PhotosType = {
    small: string
    large: string
};

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    city: string

};

export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: PhotosType
    status: string
};

export type PostType = {
    id: number
    header: string
    description: string
    likes: number
};

export type DialogType = {
    id: number
    name: string | null | undefined
}

export type MessageType = {
    id: number
    message: string | null | undefined
};

export type DispatchType<T> = (...args: T[]) => void;