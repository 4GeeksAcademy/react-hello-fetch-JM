import React, { useState, useEffect } from 'react';

function TaskList() {
  // Estado para las tareas
  const [tasks, setTasks] = useState([]);
  // Estado para el input de nueva tarea
  const [newTask, setNewTask] = useState('');
  // Estado para carga y errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener tareas iniciales
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/juan_mago');
      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }
      console.log(response)
      if(response.status ==404){
            await createUser()
            return
      }

      const data = await response.json();
      console.log(data)
      setTasks(data.todos); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

    // Crear usuario
    const createUser= async () => {
        
        try {
          const response = await fetch('https://playground.4geeks.com/todo/users/juan_mago', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          if (!response.ok) {
            throw new Error('Error al crear la tarea');
          }
          console.log(response)
    
        } catch (err) {
          setError(err.message);
        }
      };

  // Crear una nueva tarea
  const createTask = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    if (!newTask.trim()) return; // Validar que no esté vacío

    try {
      const response = await fetch('https://playground.4geeks.com/todo/todos/juan_mago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: newTask,
          is_done: false,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }
      console.log(response)

      if(response.status == 201){
          await fetchTasks()
          setNewTask(''); // Limpiar el input
      }

    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
     
      console.log(response)

      if(response.status == 204){
        await fetchTasks()
    }
      
    } catch (err) {
      setError(err.message);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Renderizado condicional
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Tareas</h1>

      {/* Formulario para agregar tarea */}
      <form onSubmit={createTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          Agregar
        </button>
      </form>

      {/* Lista de tareas */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #ccc',
            }}
          >
            <span>{task.label}</span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;