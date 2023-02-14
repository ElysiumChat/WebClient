import { writable } from 'svelte/store';
import type { User, AudioChannel, Space, Channel } from '../global';

export const theme = writable('ElysiumDark');

export const themeList = writable([
    {
        name: 'ElysiumDark',
        url: '/theme/dark/ElysiumDark.css'
    },
    {
        name: 'ElysiumLight',
        url: '/theme/light/ElysiumLight.css'
    }
])

export const token = writable('')

export const user = writable(<User>{})

export const activeSpace = writable(<Space>{})

export const activeChannel = writable(<Channel>{})

export const AudioChannelNotify = writable(<AudioChannel>{})

export const AudioChannelRing = writable(<AudioChannel>{})

export const AudioChannelVoice = writable(<AudioChannel>{})