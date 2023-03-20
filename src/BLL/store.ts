import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppActionsTypeDomian, appReducer } from './app-reducer';
import { ActionsTaskType, TaskReducer } from './tasks-reducer';
import { ActionsTodoType, TodoReducer } from "./todo-reducer";



const rootReducer = combineReducers({
    todoLists: TodoReducer,
    tasks: TaskReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
// кастомный хук, для того, что бы мы могли диспатчить санккриейтры, и в 
// и в компоненте апп, вы получаем диспатч не через уздиспатч а useAppDispatch
export const useAppDispatch = () => useDispatch<AppThunkDispatch>() 

export type AppActionsType = ActionsTodoType | ActionsTaskType | AppActionsTypeDomian

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType> 

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;