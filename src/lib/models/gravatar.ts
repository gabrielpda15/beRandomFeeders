export interface Photo {
    value: string;
    type: string;
}

export interface Name {
    givenName: string;
    familyName: string;
    formatted: string;
}

export interface Entry {
    id: string;
    hash: string;
    requestHash: string;
    profileUrl: string;
    preferredUsername: string;
    thumbnailUrl: string;
    photos: Photo[];
    name: Name;
    displayName: string;
    urls: any[];
}

export interface GravatarResult {
    entry: Entry[];
}