import { Extra, Food } from "../localchef";

export interface PartyBundle{
    _id: string;
    chefId: string;
    collectionId: string;
    name: string;
    slug: string;
    price: number;
    maxStarters: number;
    maxMains: number;
    maxDeserts: number;
    maxSides: number;
    starters: Food[],
    mains: Food[],
    sides: Food[],
    deserts: Food[],
    extras: Extra[],
    vegetarian: boolean,
    discounted: boolean,
    discountedPrice: number,
    description: string,
    active: boolean,
}