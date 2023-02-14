const sounds = new Map<string, string>()

const download = (url: string) => {
    fetch(url, {
        method: 'GET'
    }).then(async res => {
        sounds.set(url, URL.createObjectURL(await res.blob()))
    })
}

export const getSound = (pack: string, sound: string) => {
    const url = `${pack}/${sound}.wav`
    if (sounds.get(url)) return <string>sounds.get(url)
    download(url)
    return url
}