import { Extra, Food } from "../localchef";
const PartyBundleCandidate = {
    name: String,
    required: Boolean,
    max: Number,
    items: [{
        type: String,
        ref: 'Menu'
    }]
}

export interface PartyBundleCandidate {
    name: string;
    required: boolean;
    max: number;
    items: Food[]
}

export interface PartyBundle{
    image: string;
    _id: string;
    chefId: string;
    collectionId: string;
    name: string;
    slug: string;
    price: number;
    partyBundleCandidates: PartyBundleCandidate[],
    extras: Extra[],
    vegetarian: boolean,
    discounted: boolean,
    discountedPrice: number,
    description: string,
    active: boolean,
}