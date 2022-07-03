console.log('js');

$(document).ready(function () {
	console.log('JQ');
	// Establish Click Listeners
	setupClickListeners();
	// load existing tasks on page load
	getTasks();
	$(document).on('click', '#completedBtn', completedTask);
	$(document).on('click', '#deleteBtn', deleteTask);
}); // end doc ready

function setupClickListeners() {
	$('#addTaskButton').on('click', function () {
		console.log('in addTaskButton on click');
		// get user input and put in an object
		let taskToSend = {
			taskTitle: $('#taskTitleInput').val(),
			taskDescription: $('#taskDescriptionInput').val(),
			taskCompleted: $('#completedInput').val(),
		};
		// call taskToSend with the new obejct
		console.log('task to send', taskToSend);
		$.ajax({
			url: '/tasks',
			method: 'POST',
			data: taskToSend,
		})
			.then(function (response) {
				console.log('test POST response,', response);
				getTasks();
			})
			.catch(function (error) {
				console.log(error);
				alert('Error in taskToSend');
			});
		console.log('end of taskToSend');
	});
} // end setupClickListeners

function getTasks() {
	console.log('in getTasks');
	// ajax call to server to get tasks
	$.ajax({
		url: '/tasks',
		method: 'GET',
	})
		.then(function (response) {
			console.log('test GET response,', response);
			renderTasks(response);
		})
		.catch(function (error) {
			console.log(error);
			alert('Error in getTasks');
		});
	console.log('end of getTasks');
} // end getTasks

function renderTasks(tasks) {
	// changed to render koalas
	console.log('in renderTasks', tasks);
	// ajax call to server to get koalas --  ignore this line
	$('#taskTable').empty();
	for (let task of tasks) {
		console.log(task);
		$('#taskTable').append(`
    <tr data-status="${task.taskCompleted}">
    <td>${task.taskTitle}</td>
    <td>${task.taskDescription}</td>
    <td>${task.taskCompleted}</td>
    <td><button data-id="${task.id}" data-status="${task.taskCompleted}" id="completedBtn">Complete</button></td>
    <td><button data-id="${task.id}" id="deleteBtn">Delete</button></td>
    </tr>
    `);
	}
	$('input').val('');
} // end renderTasks

function deleteTask() {
	let taskId = $(this).data('id');
	$.ajax({
		type: 'DELETE',
		url: `/tasks/${taskId}`,
	})
		.then(function (response) {
			console.log('its DELETED');
			getTasks();
		})
		.catch(function (error) {
			alert('Error DELETEing', error);
		});
}

function completedTask() {
	let taskId = $(this).data('id');
	$.ajax({
		type: 'PUT',
		url: `/tasks/${taskId}`,
	})
		.then(function (response) {
			console.log('its UPDATED');
			getTasks();
		})
		.catch(function (error) {
			alert('Error UPDATEing', error);
		});
}
