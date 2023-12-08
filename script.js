// Setting Variables
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;

// Get Dom Elements
const categorySelection = document.getElementById('category-select');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const addButton = document.getElementById('add-btn');
const expensesBody = document.getElementById('expenses-body');
const amountCell = document.getElementById('total-amount');
const numbBorder = document.querySelector('.input-section input[type="number"]');
const dateBorder = document.querySelector('.input-section input[type="date"]');

addButton.addEventListener('click', () => {
  const amount = Number(amountInput.value);
  const category = categorySelection.value;
  const date = dateInput.value;

  if (category === '') {
    const catBorder = document.querySelector('#category-select');
    catBorder.style.border = '2px solid red';
    alert('Please select a category.');
    return;
  }

  if (isNaN(amount) && date === '' || amount <= 0 && date === '') {
    numbBorder.style.border = '2px solid red';
    dateBorder.style.border = '2px solid red';
    alert('Please enter a valid number and date.');
    return;
  } else if (isNaN(amount) || amount <= 0) {
    numbBorder.style.border = '2px solid red';
    alert('Please enter a valid number...');
    return;
  } else if (date === '') {
    dateBorder.style.border = '2px solid red';
    alert('Please enter a valid date.');
    return;
  }

  numbBorder.style.border = '1px solid black';
  dateBorder.style.border = '1px solid black';

  expenses.push({ category, amount, date });

  totalAmount += amount;
  amountCell.textContent = '$ ' + Number(totalAmount).toFixed(2);

  const newRow = expensesBody.insertRow();

  const categoryCell = newRow.insertCell();
  const newAmountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();
  const deleteBtn = document.createElement('button');

  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn-delete');
  deleteBtn.addEventListener('click', () => {
    const index = expenses.indexOf(expense);
    const deletedExpense = expenses.splice(index, 1)[0];

    totalAmount -= deletedExpense.amount;
    amountCell.textContent = '$ ' + Number(totalAmount).toFixed(2);

    expensesBody.removeChild(newRow);

    // Save updated expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  });

  const expense = expenses[expenses.length - 1];
  categoryCell.textContent = expense.category;
  newAmountCell.textContent = '$ ' + Number(expense.amount).toFixed(2);
  dateCell.textContent = expense.date;
  deleteCell.appendChild(deleteBtn);

  // Save expenses to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));
});

// Looping through expenses
for (let i = 0; i < expenses.length; i++) {
  const expense = expenses[i];

  totalAmount += expense.amount;
  amountCell.textContent = '$ ' + Number(totalAmount).toFixed(2);

  const newRow = expensesBody.insertRow();
  const categoryCell = newRow.insertCell();
  const newAmountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();
  const deleteBtn = document.createElement('button');

  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn-delete');
  deleteBtn.addEventListener('click', () => {
    const index = expenses.indexOf(expense);
    const deletedExpense = expenses.splice(index, 1)[0];

    totalAmount -= deletedExpense.amount;
    amountCell.textContent = '$ ' + Number(totalAmount).toFixed(2);

    expensesBody.removeChild(newRow);

    // Save updated expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

  });

  categoryCell.textContent = expense.category;
  newAmountCell.textContent = '$ ' + Number(expense.amount).toFixed(2);
  dateCell.textContent = expense.date;
  deleteCell.appendChild(deleteBtn);
}
