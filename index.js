const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// https://ankit3054stackblitzappinvbd3-ggj1--3000--d3acb9e1.local-credentialless.webcontainer.io

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

function addToTasks(taskId,review,priority) {
  let task = {
    taskId: taskId, 
    text: review, 
    priority: priority 
  }
  tasks.push(task);
  return tasks;
}

function sortAscOrderBasedOnPiority(task_one, task_two) {  
  return task_one.priority - task_two.priority;
}

function editTaskPriority(taskId, priority) {
  let index = tasks.findIndex(task => task.taskId === taskId);
  tasks[index].priority = priority;
  return tasks;
}

function editTaskText(taskId, text) {
  let index = tasks.findIndex(task => task.taskId === taskId);
  tasks[index].text = text;
  return tasks;
}
function deleteTask(taskId) {
  let index = tasks.findIndex(task => task.taskId === taskId);
  tasks.splice(index, 1);
  return tasks;
}

function filterTaskByPriority(priority) {
  console.log('priority', priority);
  let finalTasks = tasks.filter(task => {
    console.log(task.priority, priority);
    return task.priority == priority;
  });
  return finalTasks;
}

// /tasks/add?taskId=4&text=Review%20code&priority=1
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let review = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addToTasks(taskId,review,priority);
  res.json(result);
});

// /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// /tasks/sort-by-priority
app.get('/tasks/sort-by-priority', (req, res) => {
  tasks.sort(sortAscOrderBasedOnPiority);
  res.send(tasks);
});

// /tasks/edit-priority?taskId=1&priority=5
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPriority(taskId, priority);
  res.send(result);
});

// /tasks/edit-text?taskId=3&text=Update%20abcs
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = String(req.query.text);
  let result = editTaskText(taskId, text);
  res.send(result);
});

// /tasks/delete?taskId=2
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = deleteTask(taskId);
  res.send(result);
});

// /tasks/filter-by-priority?priority=1
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = filterTaskByPriority(priority);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
