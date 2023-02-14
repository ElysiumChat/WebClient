import type { User, Space, Channel } from "../global"

const host = 'http://localhost:3030'

export const cache = {
    spaces: new Map<string, Space>(),
    users: new Map<string, User>(),
    channels: new Map<string, Channel>()
}

export const register = (email: string, username: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
        fetch(host + '/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password,
                email: email,
                bot: false
            })
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    console.log(data)
                    resolve(data)
                }
            })
    })
}

export const login = (email: string, password: string) => {
    return new Promise<string>((resolve, reject) => {
        fetch(host + '/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    resolve(data.token)
                }
            })
    })
}

export const me = (token: string) => {
    return new Promise<User>((resolve, reject) => {
        fetch(host + '/api/v1/user/me', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    resolve(data)
                }
            })
    })
}

export const getSpace = (id: string, token: string) => {
    return new Promise<Space>((resolve, reject) => {
        if (cache.spaces.get(id)) return resolve(<Space>cache.spaces.get(id))
        fetch(host + `/api/v1/space/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    cache.spaces.set(id, data)
                    resolve(data)
                }
            })
    })
}

export const getChannel = (id: string, token: string) => {
    return new Promise<Channel>((resolve, reject) => {
        if (cache.channels.get(id)) return resolve(<Channel>cache.channels.get(id))
        fetch(host + `/api/v1/channel/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    cache.channels.set(id, data)
                    resolve(data)
                }
            })
    })
}

export const uploadFile = (token: string, space: string, file: Buffer, ext: string) => {
    return new Promise<string>((resolve, reject) => {
        fetch(host + `/cdn/${space}/`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                buffer: file.toString('base64'),
                ext: ext
            })
        })
            .then(async res => {
                const data = await res.json()
                if (data.error) {
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    resolve(data.url)
                }
            })
    })
}

export const getFile = (url: string, size?: number) => {
    return new Promise<Blob>((resolve, reject) => {
        if (url.startsWith('/')) url = host + `/cdn${url}`
        if (size) url += `?size=${size}`
        fetch(url, {
            method: 'GET'
        })
            .then(async res => {
                if (res.status != 200) {
                    const data = await res.json()
                    reject({
                        error: data.error,
                        status: res.status
                    })
                } else {
                    resolve(await res.blob())
                }
            })
    })
}