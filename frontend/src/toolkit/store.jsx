import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import coordinatesReducer from './reducers/CoordinatesReducer';
import authReducer from './reducers/User'
import dataReducer from './reducers/admin'
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated']
}

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistAuthReducer,
    coordinatesReducer: coordinatesReducer,
    data: dataReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore actions from redux-persist
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
            thunk: {
                extraArgument: {
                    navigate: () => { }
                }
            }
        }),
}
)

export const persister = persistStore(store)