import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    setTaskList((curretTaskList) =>
      [...curretTaskList,
        {
          id: Date.now(),
          nome: nome,
          email: email,
          telefone: telefone,
          done: false,
        }
      ]
    );
    setNome("");
    setEmail("");
    setTelefone("");
  };

  const finishTask = (id) => {
    setTaskList((currentTaskList) => {
      const index = currentTaskList.findIndex((nome) => nome.id === id);
      currentTaskList[index].done = !currentTaskList[index].done;
      return [...currentTaskList];
    });
  }



  return (
    <View style={styles.container}>
      <View style={styles.taskInput}>
        <TextInput
          placeholder='Digite seu nome'
          style={styles.taskTextInput}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <View style={styles.taskInput}></View>
        <TextInput
          placeholder='Digite seu email'
          style={styles.taskTextInput}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          placeholder='Digite seu telefone'
          style={styles.taskTextInput}
          value={telefone}
          onChangeText={(telefone) => setTelefone(telefone)}
        />
        <Button
          title='Adicionar'
          onPress={addTask}
        />
      </View>
      <View style={styles.taskList}>
        <ScrollView>
        {taskList.map(({ id, nome, email, telefone, done }) => {
            return (
              <Pressable key={id}  onPress={() => finishTask(id)}>
                <View style={styles.taskListItem(done)}>
                  <Text>{nome}</Text>
                  <Text style={styles.taskListItemTask(done)} >{email}</Text>
                  <Text style={styles.taskListItemTask(done)} >{telefone}</Text>
                </View>
            </Pressable>
            )
          })}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  taskInput: {
    flex: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    paddingTop: 16,
  },
  taskTextInput: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    fontSize: 16,
    padding: 12,
    margin: 10,
    width: "90%",

  },
  taskList: {
    backgroundColor: 'lightyellow',
    flex: 4,
    paddingTop: 8
  },
  taskListItem: (done) => {
    return {
      padding: 16,
      border: 1,
      backgroundColor: done ? "green" : "indianred",
      borderRadius: 16,
      margin: 8,
    }
  },
  taskListItemTask: (done) => {
    return {
      fontSize:12,
      textDecorationLine: done ? "line-through" : "none"
    };
  }
});