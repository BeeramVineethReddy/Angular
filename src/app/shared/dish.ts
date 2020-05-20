
//shared is to supply the information to both menu and also dishdetails

import {Comment} from './comment';
export class Dish{
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
    comments : Comment[];
}