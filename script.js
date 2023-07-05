const students = [
 { ID: 1, name: 'Alice', email: 'alice@example.com', age: 21,email: 'alice@example.com', grade: 'A', degree: 'Btech' },
 { ID: 2, name: 'Bob', email: 'bob@example.com', age: 22,  grade: 'B', degree: 'MBA',  },
 { ID: 3, name: 'Charlie', email: 'charlie@example.com', age: 20,   grade: 'C', degree:'Arts', }
 ];

 const studentsTable = document.getElementById("studentsTable");
 const studentsList = document.getElementById("studentsList");
 const studentForm = document.getElementById('studentForm');
 const searchInput = document.getElementById('searchInput');

 let isEditMode = false;
 let currentStudentId = null;

// adding given students info
function renderStudents(){
    studentsList.innerHTML = " ";
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = 
        `<td>${student.ID}</td>
         <td>${student.name}</td>
         <td>${student.email}</td>
         <td>${student.age}</td>
         <td>${student.grade}</td>  
         <td><div class="logos">
         <div class="logos">${student.degree}</div>
          <div class="logo">
         <button class="edit-btn" data-id="${student.ID}">
         <img src="edit .png" alt="img1">
         </button>
         <button class="delete-btn" data-id="${student.ID}">
         <img src="delete.png" alt="img2">
         </button>
         </div>
         </div>
         </td>`;

         studentsList.appendChild(row);
    }); 
}

// adding new student
function addNewStudent(name ,email, age, grade, degree ){
   const newStudent = {
    ID : students.length +1,
    name,
    email,
    age,
    grade,
    degree
   };

   students.push(newStudent);
}

  // Function to update an existing student
  function updateStudent(id, name, email, age, grade, degree) {
    const studentIndex = students.findIndex(student => student.ID === id);
    if (studentIndex !== -1) {
      students[studentIndex].name = name;
      students[studentIndex].email = email;
      students[studentIndex].age = age;
      students[studentIndex].grade = grade;
      students[studentIndex].degree = degree;
      
    }
  }

    // Function to delete a student from the array
    function deleteStudent(id) {
        const studentIndex = students.findIndex(student => student.ID === id);
        if (studentIndex !== -1) {
          students.splice(studentIndex, 1);
        }
   }

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = parseInt(document.getElementById('age').value);
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
   
  
    if (isEditMode) {
      updateStudent(currentStudentId, name, email, age, grade, degree );
      isEditMode = false;
      currentStudentId = null;
      document.getElementById('submitButton').textContent = 'Add Student';
    } else {
      addNewStudent( name, email, age, grade, degree );
    }
  
    renderStudents();
    studentForm.reset();
  }

   // Function to handle edit button click
   function handleEdit(event) {
    const id = parseInt(event.target.dataset.id);
    const student = students.find(student => student.ID === id);
  
    if (student) {
      isEditMode = true;
      currentStudentId = id;
      document.getElementById('name').value = student.name;
      document.getElementById('email').value = student.email;
      document.getElementById('age').value = student.age;
      document.getElementById('grade').value = student.grade;
      document.getElementById('degree').value = student.degree;
      
  
      document.getElementById('submitButton').textContent = 'Edit Student';
    }
  }  
      
  // Function to handle delete button click
  function handleDelete(event) {
    const id = parseInt(event.target.dataset.id);
    deleteStudent(id);
    renderStudents();
  }

   // Function to handle search
   function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
    renderFilteredStudents(filteredStudents);
  }

    // Function to render the filtered students as a table
    function renderFilteredStudents(filteredStudents) {
        studentsList.innerHTML = '';
        filteredStudents.forEach(student => {
          const row = document.createElement('tr');
          row.innerHTML = 
          `<td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>  
          <td><div class="logos">
         <div class="logos">${student.degree}</div>
          <div class="logo">
         <button class="edit-btn" data-id="${student.ID}">
         <img src="edit .png" alt="img1">
         </button>
         <button class="delete-btn" data-id="${student.ID}">
         <img src="delete.png" alt="img2">
         </button>
          </div>
         </div>
         </td>`;
    
          studentsList.appendChild(row);
        });
      }
 
    // Event listeners
  studentForm.addEventListener('submit', handleSubmit);
  studentsTable.addEventListener('click', event => {
    if (event.target.classList.contains('edit-btn')) {
      handleEdit(event);
    } else if (event.target.classList.contains('delete-btn')) {
      handleDelete(event);
    }
  });
  searchInput.addEventListener('input', handleSearch);
  
  // Initial render
  renderStudents();


