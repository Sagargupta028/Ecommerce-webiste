import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerProductReducer from "./Product/Reducer";
// import productReducer from "./Admin/Product/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
// import adminOrderReducer from "./Admin/Orders/Reducer";
import ReviewReducer from "./Review/Reducer";
import adminOrderReducer from './Admin/Orders/Reducer';
import customerReducer from './Customer/Reducer';
import analyticsReducer from './Analytics/Reducer';
import categoryReducer from './Category/Reducer';



const rootReducers=combineReducers({

    auth:authReducer,
    products:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    review:ReviewReducer,
    adminOrder: adminOrderReducer,
    customers: customerReducer,
    analytics: analyticsReducer,
    categories: categoryReducer

    // admin
    // adminsProduct:productReducer,
    // adminsOrder:adminOrderReducer,


});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))