import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faCircleCheck, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);
  // Temp State
  const [newTask, setNewTask] = useState('');
  // Folders
  const [folders, setFolders] = useState([
    { id: uuidv4(), name: 'General Task', toDo: [] },
  ])
  // Add task 
  const addTask = () => {
    if(newTask) {
      let newEntry = { id: uuidv4(), title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }
  // Create Folders
  const createFolder = () => {
    const folderName = prompt('Enter folder name:')
    if (folderName) {
      setFolders([...folders, { id: uuidv4(), name: folderName, toDo: [] }])
    }
  }
  // move to folder
  const moveTodoToFolder = (todoId, folderId) => {
    const todo = toDo.find((t) => t.id === todoId)
    if (!todo) return
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, toDo: [...(folder.toDo || []), todo] }
          : folder
      )
    )
    setToDo(toDo.filter((t) => t.id !== todoId))
  }

  return (
    <div className="container App">
    <br /><br />
    <h2>Web App Of To Do Lists (ReactJS)</h2>
    <br /><br />
      <>
      {/* Add Task */}
      <div className="row">
        <div className="col">
          <input 
            value={newTask}
            onChange={ (e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button
            onClick={addTask}
            className="btn btn-lg btn-success"
          >Add Task</button>
        </div>
      </div>
      <br />
    </>
    {/* Select Folder */}
    <ul>
        {toDo.map((todo) => (
          <li
            key={todo.id}
          >
            {todo.title}
            <select
              value=''
              onChange={(e) => moveTodoToFolder(todo.id, e.target.value)}
            >
              <option value='' disabled>
                Move to folder
              </option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      <button onClick={createFolder} className='btn btn-success'>
        Add New Folder
      </button>
    {/* Display ToDos */}
    {/* {toDo && toDo.length ? '' : 'No Tasks Available...'} */}
    {folders.map((folder) => (
          <div key={folder.id}>
            <h3>{folder.name}</h3>
            <>
      {folder.toDo
      .map( (task, index) => {
        return(
          <div key={task.id}>
            <div className="col taskBg">
              <div className={ task.status ? 'done' : '' }>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
            </div>
          </div>
        )})
      }  
    </>  
          </div>
        ))}
    </div>
  );
}
export default App;