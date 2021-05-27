import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';
import { Alert } from 'react-native';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle){
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldTasks => [...oldTasks, newTask]);
    } else {
      Alert.alert('No title informed', 'Please, type some title to your task');
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const myUpdatedTasks = tasks.map((task) => {
      task.id === id ? task.done = !task.done : task.done;
      return task; 
    });

    setTasks(myUpdatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}