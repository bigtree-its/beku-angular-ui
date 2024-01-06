export interface ChefSearchQuery {
    serviceAreaSlug?: string | undefined;
    cuisines?: string | undefined;
    slots?: string | undefined;
    email?: string | undefined;
    serviceAreas?: string | undefined;
    status?: string | undefined;
    noMinimumOrder?: boolean | undefined;
    collectionOnly?: boolean | undefined;
    delivery?: boolean | undefined;
    takingOrdersNow?: boolean | undefined;
}