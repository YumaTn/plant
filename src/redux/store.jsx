import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import watcherSaga from '../sagas';
const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{

    },

    middleware:(getDefaultMiddleware) =>{
        return getDefaultMiddleware({think:false}).prepend(SagaMiddleware);
    }
});

SagaMiddleware.run(watcherSaga)

export default store;