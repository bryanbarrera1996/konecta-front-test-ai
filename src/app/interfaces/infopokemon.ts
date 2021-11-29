export interface Infopokemon {
    id?: number,
    name?: string,
    types?: Array<Types>, 
    weight?: number,
    base_experience?: number,
    height?: number 
}

interface Types{
    slot?: number,
    type?: {name: string, url: string}
}
