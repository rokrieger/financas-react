import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { Category } from './types/Category';
import { categories } from './data/categories';
import { items } from './data/items';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';

const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let item in filteredList) {
      if (categories[filteredList[item].category].expense) {
        expenseCount += filteredList[item].value;
      } else {
        incomeCount += filteredList[item].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount)
  }, [filteredList])

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  const handleRemItem = () => {
    const updatedList = list.slice(0, -1);
    setList(updatedList);
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>

      <C.Body>
        {/* Área de informações */}
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        {/* Área de inserção */}
        <InputArea onAdd={handleAddItem} onRem={handleRemItem} />

        {/* Tabela de itens */}
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
}

export default App;