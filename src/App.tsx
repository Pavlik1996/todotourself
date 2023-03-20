import { useCallback, useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './BLL/store';
import { addTaskTC, deletetTaskTC, getTasksTC, updateTaskTC } from './BLL/tasks-reducer';
import { GetTodoTC } from './BLL/todo-reducer';
import { TodoList } from './COMPONENTS/todoList';
import { UpdateDomainTaskModelType } from './DAL/api';

function App() {

  const dispatch = useAppDispatch()
  const todoLists = useAppSelector(state => state.todoLists)
  const tasks = useAppSelector(state => state.tasks)

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(addTaskTC(todolistId, title))
  },[])

  const deleteTask = useCallback((todoListId: string, taskId: string)=> {
    dispatch(deletetTaskTC(todoListId, taskId))
  }, [])

  const updateTask = useCallback((todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    dispatch(updateTaskTC(todoListId, taskId, domainModel))
  },[])

  


  useEffect(() => {
    dispatch(GetTodoTC())
  }, [])
  return (
    <div className="App">
      <TodoList/>
    </div>
  );
}

export default App;
