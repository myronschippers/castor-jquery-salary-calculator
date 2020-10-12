$(document).ready(onReady);

const employees = [];

function onReady() {
  console.log('page is READY');

  $('.js-btn-submit').on('click', submitEmployee);
  // adding event listener for delete
  $('.js-employee-list').on('click', '.js-btn-delete', deleteEmployee);
}

function deleteEmployee() {
  // find individual employee
  const index = $(this).data('index'); // data-index
  // remove from employees
  employees.splice(index, 1);
  console.log(employees);
  render();

  // ONLY REMOVES FROM DOM
  // $(this).parent().parent().remove()
}

function submitEmployee() {
  console.log('Clicked Submit');
  // gather entered data from inputs/fields
  const employeeObject = {
    firstName: $('.js-input-firstName').val(),
    lastName: $('.js-input-lastName').val(),
    id: Number($('.js-input-id').val()),
    title: $('.js-input-title').val(),
    annualSalary: Number($('.js-input-annualSalary').val()),
  };

  // store my new employee
  storeEmployee(employeeObject);
}

function storeEmployee(newEmployee) {
  employees.push(newEmployee);
  console.log('Employees:', employees);

  // render list to DOM
  render();
}

// TODO - clear fields

function render() {
  const $employeeList = $('.js-employee-list');
  let totalAnnualSalary = 0;
  const monthsInYear = 12;
  const maxMonthly = 20000;

  $employeeList.empty();
  for (let i = 0; i < employees.length; i++) {
    const employeeData = employees[i];

    totalAnnualSalary += employeeData.annualSalary;

    $employeeList.append(`
      <tr>
        <td>${employeeData.firstName}</td>
        <td>${employeeData.lastName}</td>
        <td>${employeeData.id}</td>
        <td>${employeeData.title}</td>
        <td>${employeeData.annualSalary}</td>
        <td><button class="js-btn-delete" data-index="${i}">Delete</button></td>
      </tr>
    `);
  }

  let monthlySalary = totalAnnualSalary / monthsInYear;
  // round for change to nearest cent
  monthlySalary = Math.round(monthlySalary * 100) / 100;

  const $monthlySalaryEl = $('.js-monthly-salary');
  $monthlySalaryEl.text(monthlySalary);

  if (monthlySalary > maxMonthly) {
    $monthlySalaryEl.parent().addClass('warning');
  }
}
