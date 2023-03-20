import axios, { AxiosResponse } from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'cee82169-26b4-4379-a726-b50e84b834c9'
    }
})


export const todoApi = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    addTodoList(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListType }>>>('todo-list', { title })
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lest/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lest/${todolistId}`, { title })
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType>(`todo-lest/${todolistId}`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, { title })
    },
    updateTask(todolistId: string, taskId: string, model: UpdateDomainTaskModelType) {
        return instance.put<UpdateDomainTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}




export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    // entityStatus: RequestStatusType
}

type ResponseTaskType = {
    items: TaskType[],
    totalCount: number,
    error: string
}

export enum ResultCods {
    OK = 0,
    Error = 1,
    Captcha = 10
}

