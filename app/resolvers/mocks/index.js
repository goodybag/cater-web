import {MenuCategoriesResolver} from './menu';
import {OrderResolver} from './order';
import {OrderItemsResolver} from './order-item';
import {CurrentUserResolver} from './user';
import {PastOrdersResolver} from './past-orders';
import {MenuItemsResolver} from './menu-item';

export const mocks = [
    OrderResolver,
    MenuCategoriesResolver,
    OrderItemsResolver,
    CurrentUserResolver,
    PastOrdersResolver,
    MenuItemsResolver
];
