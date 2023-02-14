interface Theme {
    name: string;
    url: string;
}

export interface User {
    _id: string;
    node: string;
    bot: boolean;
    name: string;
    avatar: string;
    spaces: string[];
}

export interface Member {
    user: User;
    nickname?: string;
    avatar?: string;
}

export interface Space {
    _id: string;
    name: string;
    icon: string;
    channels: string[];
    members: string[];
    open: boolean;
    invites: string[];
}

export interface Message {
    _id: string;
    content?: string;
    attachments?: MessageAttachment[];
    author: Member | User;
    channel: string;
}

export interface MessageAttachment {
    name: string;
    base64: string;
}

export interface Channel {
    _id: string;
    name: string;
    type: string;
    members: User[];
    space: string;
}

export interface TextChannel extends Channel {
    encrypted: boolean;
}

export interface AudioChannel {
    stop?: boolean;
    url: string;
    loop: boolean;
}