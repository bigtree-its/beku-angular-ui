export interface CustomerPreferences{
    customerId: string;
    communicationViaEmail: Boolean;
    communicationViaMobile: Boolean;
    cuisines: string[];
    chefs: string[];
    foods: string[];
}