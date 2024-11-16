import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [toggleFinished, setToggleFinished] = useState(true)


 useEffect(() => {
    const todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      setTodos(todoString);
    }
  }, []);

  const saveLoc = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleSave = () => {
    setTodos([...todos, { id: Date.now(), todo, isCompleted: false }])
    setTodo("")
    saveLoc()
  }
  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveLoc()
  }

  const handleEdit = (id) => {
    let newTodos = todos.filter(item => {
      return item.id == id;
    });
    setTodo(newTodos[0].todo)
    handleDelete(id)
    saveLoc()
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveLoc()
  }
  const toggleFinish = () => {
    setToggleFinished(!toggleFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container bg-violet-200 m-auto rounded-2xl min-h-[70vh] p-9">
        <h1 className='font-bold text-center text-2xl mb-5'>Todo list</h1>
        <div className='font-bold ml-10'>Add your todo</div>
        <div className="todo flex  justify-between md:justify-between w-2/3">
          <input onChange={handleChange} value={todo} type="text" className=' rounded-full px-5 py-1  md:w-full' />
          <button onClick={handleSave} disabled={todo.length < 3} className='bg-violet-800 font-bold px-2 py-1 mx-5 text-white rounded-md hover:bg-violet-950'>save</button>
        </div>
        <div className='pt-5'>
          <input onChange={toggleFinish} type="checkbox" checked={toggleFinished} />
          <span className='px-4 font-bold'>Show Finished</span></div>
        <h1 className='m-6 text-xl font-bold text-center'>YourTodos</h1>

        {todos.map(item => {

          return (toggleFinished || !item.isCompleted) && <div key={item.id} className='flex justify-between my-3 md:w-2/3 '>
            <div className='flex justify-center items-center gap-3'>
              <input onChange={handleCheck} type="checkbox" name={item.id} id={item.id} checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}

              </div>
            </div>
            <div className='flex h-full'>
              <button onClick={() => { handleEdit(item.id) }} className='bg-violet-800 text-white font-bold px-2 py-1  rounded-md hover:bg-violet-950 mx-3'>Edit</button>
              <button onClick={() => { handleDelete(item.id) }} className='bg-violet-800  text-white font-bold px-2 py-1 rounded-md hover:bg-violet-950 mx-3'>delete</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
