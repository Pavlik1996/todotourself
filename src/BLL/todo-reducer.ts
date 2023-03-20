import { todoApi } from './../DAL/api';
import { Dispatch } from "redux";
import { TodoListType } from "../DAL/api"
import { AppThunk } from './store';

const initialState: TodolistDomainType[] = []


//----------------------------REDUCER----------------------------
export const TodoReducer = (state = initialState, action: ActionsTodoType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODO-LIST':
            return action.todoLists.map(el => ({ ...el, filter: 'all' }))
        case 'ADD-TODO-LIST':
            return [{ ...action.todoLists, filter: 'all' }, ...state]
        case 'DELETE-TODO-LIST':
            return state.filter(el => el.id !== action.todoListId)
        case 'CHANGE-TODO-LIST-TITLE':
            return state.map(el => el.id === action.todolistId ? { ...el, title: action.title } : el)
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.todolistId ? { ...el, filter: action.filter } : el)
        default: return state
    }
}


//----------------------------ACTIONS----------------------------
export const getTodo = (todoLists: TodoListType[]) => ({ type: 'SET-TODO-LIST', todoLists } as const)
export const addTodoList = (todoLists: TodoListType) => ({ type: 'ADD-TODO-LIST', todoLists } as const)
export const deleteTodoList = (todoListId: string) => ({ type: 'DELETE-TODO-LIST', todoListId } as const)
export const updateTodoList = (todolistId: string, title: string) => ({ type: 'CHANGE-TODO-LIST-TITLE', todolistId, title } as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({ type: 'CHANGE-FILTER', todolistId, filter } as const)


//----------------------------THUNKS----------------------------
export const GetTodoTC = (): AppThunk => (dispatch) => {
    todoApi.getTodoLists()
        .then(res => dispatch(getTodo(res.data)))
}

export const AddTodoTC = (title: string): AppThunk => (dispatch) => {
    todoApi.addTodoList(title)
        .then(res => dispatch(addTodoList(res.data.data.item)))
}

export const deleteTodoListTC = (todoListId: string): AppThunk => (dispatch) => {
    todoApi.deleteTodoList(todoListId)
        .then(() => dispatch(deleteTodoList(todoListId)))
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todoApi.updateTodoList(todolistId, title)
        .then(() => dispatch(updateTodoList(todolistId, title)))
}


//----------------------------TYPES----------------------------
export type ActionsTodoType =
    | ReturnType<typeof getTodo>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof deleteTodoList>
    | ReturnType<typeof updateTodoList>
    | ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType,
}
