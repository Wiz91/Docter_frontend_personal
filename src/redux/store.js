import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "root",
    storage: localStorage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer); //persist reducer combine both local and root reducer



const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk))); //apply middleware to run rootreducer
let persistor = persistStore(store);


export { store, persistor }