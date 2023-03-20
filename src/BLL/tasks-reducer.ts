import { TaskPriorities, TaskStatuses, todoApi, UpdateDomainTaskModelType } from './../DAL/api';
import { Dispatch } from "redux"
import { TaskType } from "../DAL/api"
import { addTodoList, deleteTodoList } from './todo-reducer';
import { AppRootStateType, AppThunk } from './store';

const initialState: TasksStateType = {}

//----------------------------REDUCER----------------------------
export const TaskReducer = (state = initialState, action: ActionsTaskType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASK':
            return {
                ...state, [action.todoListId]: [...action.tasks]
            }
        case 'ADD-TASK':
            return {
                ...state, [action.task.todoListId]: [{ ...action.task }, ...state[action.task.todoListId]]
            }
        case 'DELTE-TASK':
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)
            }
        case 'DELETE-TODO-LIST':
            let copyState = { ...state }
            delete copyState[action.todoListId]
            return copyState
        case 'ADD-TODO-LIST':
            return {
                [action.todoLists.id]: [], ...state
            }
        case 'UPDATE-TASK':
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId ? { ...el, ...action.model } : el)
            }
        default: return state
    }
}


//----------------------------ACTIONS----------------------------
export const getTasks = (todoListId: string, tasks: TaskType[]) => ({ type: 'SET-TASK', tasks, todoListId } as const)
export const addTask = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const deleteTask = (todoListId: string, taskId: string) => ({ type: 'DELTE-TASK', todoListId, taskId } as const)
export const updateTask = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => ({ type: 'UPDATE-TASK', todoListId, taskId, model } as const)


//----------------------------THUNKS----------------------------
export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todoApi.getTasks(todolistId)
        .then(res => dispatch(getTasks(todolistId, res.data.items)))
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todoApi.addTask(todolistId, title)
        .then((res) => dispatch(addTask(res.data.data.item)))
}

export const deletetTaskTC = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    todoApi.deleteTask(todoListId, taskId)
        .then(() => dispatch(deleteTask(todoListId, taskId)))
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todoListId].find(el => el.id === taskId)

    if (!task) {
        console.warn('task is not defined');
        return
    }

    const model: UpdateDomainTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }

    todoApi.updateTask(todoListId, taskId, model)

        .then(() => dispatch(updateTask(todoListId, taskId, domainModel)))
}
//----------------------------TYPES----------------------------
export type ActionsTaskType =
    | ReturnType<typeof getTasks>
    | ReturnType<typeof addTask>
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof deleteTodoList>
    | ReturnType<typeof updateTask>

type TasksStateType = {
    [key: string]: TaskType[]
}


