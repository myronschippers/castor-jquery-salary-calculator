$(document).ready(onReady);

const employees = [];

function onReady() {
  console.log('page is READY');

  $('.js-btn-submit').on('click', submitEmployee);
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

// TODO - render employees to DOM (make function)
function render() {
  const $employeeList = $('.js-employee-list');
  let totalAnnualSalary = 0;
  const monthsInYear = 12;

  $employeeList.empty();
  for (let i = 0; i < employees.length; i++) {
    const employeeData = employees[i];

    // TODO - function to calc monthly
    totalAnnualSalary += employeeData.annualSalary;

    $employeeList.append(`
      <tr>
        <td>${employeeData.firstName}</td>
        <td>${employeeData.lastName}</td>
        <td>${employeeData.id}</td>
        <td>${employeeData.title}</td>
        <td>${employeeData.annualSalary}</td>
        <td><button>Delete</button></td>
      </tr>
    `);
  }

  let monthlySalary = totalAnnualSalary / monthsInYear;
  // round for change to nearest cent
  monthlySalary = Math.round(monthlySalary * 100) / 100;
  $('.js-monthly-salary').text(monthlySalary);
}
