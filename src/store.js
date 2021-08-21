import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["navigation"], // navigation will not be persisted
  // whitelist: ["navigation"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const initialState = {};
const middleware = [thunk];

const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };
