import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import Task from "./src/Tasks";

export default function App() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  function handleAddTask() {
    
    if(task === ''){
      return;
    }

    const data = {
      key: Date.now(),
      item: task
    }

    setList(oldArray => [data, ...oldArray]);
    setTask('')
  }

  function handleDelete(item){
    let itemFilter = list.filter((task) => {
      return (task.item !== item)
    })

    setList(itemFilter);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          placeholder="Digite sua tarefa aqui..."
          style={styles.input}
          value={task}
          onChangeText={(event) => setTask(event)}
        />

        <TouchableOpacity onPress={handleAddTask} style={styles.buttonAdd}>
          <FontAwesome name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
      data={list}
      keyExtractor={ (item) => item.key }
      renderItem={ ({ item }) => <Task data={item} deleteTask={() => handleDelete(item.item)}/>}
      style={styles.boxList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12,
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  input: {
    width: '75%',
    backgroundColor: '#FBFBFB',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 14,
  },
  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  boxList: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingStart: '4%',
    paddingEnd: '4%',
  }

})