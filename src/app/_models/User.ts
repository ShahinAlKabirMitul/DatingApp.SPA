import { Photo } from './Photo';
export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastactive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    indroduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}