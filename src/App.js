import './App.css';
import AddTodo from './components/AddTodo';
import TodosView from './components/Todos';

function App() {

  return (
    <div className="App">
      <AddTodo />
      <TodosView />
    </div>
  );
}

export default App;


// json-server --watch db.json --port 8000