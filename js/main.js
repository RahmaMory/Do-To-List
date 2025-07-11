var NewTask=document.querySelector('#NewTask');
var TaskArr=[];
var AddBtn=document.querySelector('#AddBtn');
var currentIndex = null; 
console.log(NewTask.value);

 //local storage

if(localStorage.getItem('UserTasks')!=null){
  TaskArr=JSON.parse(localStorage.getItem('UserTasks'));
  console.log(TaskArr);
  DisplayTask()
  
}

function AddTask() {
  if (NewTask.value.trim() === '') return;

  var tasks = {
    taskInfo: NewTask.value,
  };

  if (currentIndex === null) {
    // إضافة جديدة
    TaskArr.push(tasks);
  } else {
    // تحديث
    TaskArr[currentIndex] = tasks;
    currentIndex = null;
    AddBtn.innerHTML = 'Add'; // نرجّع الزرار
  }

  localStorage.setItem('UserTasks', JSON.stringify(TaskArr));
  DisplayTask();
  clearForm();
}


AddBtn.addEventListener('click',AddTask);

function clearForm(){
  NewTask.value='';
}

function DisplayTask() {
  if (TaskArr.length === 0) {
    document.querySelector('.body-table tbody').innerHTML = `
      <tr>
        <td colspan="4" class="fw-bold text-center ">Task List Is Empty!</td>
      </tr>
    `;
  } else {
    var cartoona = '';

    for (let i = 0; i < TaskArr.length; i++) {
      cartoona += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${TaskArr[i].taskInfo}</td>
          <td><i class="fa-solid fa-pen-nib fs-5 text-warning" onclick="UpdateTask(${i})"></i></td>
          <td><i class="fas fa-trash-alt fs-5 text-danger" onclick="DeleteTask(${i})"></i></td>
        </tr>
      `;
    }

    document.querySelector('.body-table tbody').innerHTML = cartoona;
  }
}

function DeleteTask(i){

  TaskArr.splice(i,1);
    localStorage.setItem('UserTasks',JSON.stringify(TaskArr))
  console.log(TaskArr);
  
  DisplayTask();
}


///////update
function UpdateTask(i) {
  NewTask.value = TaskArr[i].taskInfo;
  currentIndex = i;
  AddBtn.innerHTML = 'Update';
}
