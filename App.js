import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert} from 'react-native';
import { useState } from 'react';

export default function App(){
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);


  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (!expenseName.trim() || isNaN(amount) || amount <= 0) {
      Alert.alert('erreur', 'Veuillez entrer un nom et un montant valide (positif)');
      return;
    }

    const newExpense = { id: Date.now().toString(), name:expenseName, amount: amount};
    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi des dépenses</Text>

      {/* Formulaire pour ajouter une depense */}
      <TextInput
        style={styles.input}
        placeholder="Nom de la depense (ex. course)"
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Montant (ex: 50)"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={(text) => setExpenseAmount(text)}
      />

      <Button title="Ajouter depense" onPress={addExpense} />

      {/* liste des depense */}
      <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <View style={styles.expenseItem}>
          <Text style={styles.expenseText}>
            {item.name} : {item.amount} f
          </Text> 
        </View>
      )}
      keyExtractor={(item) => item.id}
      style={styles.FlatList}
      />

      {/* total */}
      <Text style={styles.total}>Total: {total.toFixed(2)} f</Text>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  list:{
    flex: 1,
    marginTop: 20,
  },
  expenseItem:{
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  expenseText:{
    fontSize: 20,
  },
  total:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#2c3e50'
  },
});
