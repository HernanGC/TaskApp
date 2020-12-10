$(document).ready(function(){

    let edit = false;    

    $('#search-result').hide();
    updateTasks();
    $('#search-nav').keyup( (event) => {
        event.preventDefault();
        if ($('#search-nav').val()) {
            let search = $('#search-nav').val();
            console.log(search)
            $.ajax({
                url: 'backend/task-search.php',
                type: 'POST',
                data: { search },
                success: (response) => {
                    let tasks = JSON.parse(response);
                    let template = '';
                    console.log(tasks);
                    tasks.forEach(task => {
                        template += `<li>
                            ${task.name}
                        </li>`
                        $('#container').html(template);
                        $('#search-result').show();
                    });
                }
            });
        }
    });

    $('#task-form').submit( (event) => {
        const postData = {
            id: $('#taskId').val(),
            name: $('#name').val(),
            description: $('#description').val()
        }
        let url = edit === false ? 'backend/task-post.php' : 'backend/task-edit.php'
        $.post(url, postData, (response) => {
            console.log(response);
            updateTasks();
            $('#task-form').trigger('reset');
        })
        edit = false;
        event.preventDefault();
    });



    function updateTasks() {
        $.ajax({
            url: 'backend/task-list.php',
            type: 'GET',
            success: (res) => {
                let tasks = JSON.parse(res);
                let template = '';
                tasks.forEach(task => {
                    template += `<tr task-id="${task.id}">
                        <td class="task-id">${task.id}</td>
                        <td class="task-name">${task.name}</td>
                        <td class="task-description">${task.description}</td>
                        <td class="conf-buttons">
                            <button class="btn btn-danger btn-sm task-delete">
                                Delete
                            </button>
                            <button class="btn btn-info btn-sm task-edit">
                                Edit
                            </button>
                        </td>
                    </tr>`
                });
                $('#tasks').html(template);
            }
        });
    }

    $(document).on('click', '.task-delete', function() {
        if (confirm('¿Seguro que deseas eliminar esta tareas?')) {
            let e = $(this)[0].parentElement.parentElement;
            let el = $(e).attr('task-id');
            console.log(e);
            console.log(el);
            $.post('backend/task-delete.php', { el }, (res) => {
                    console.log(res);
                    updateTasks();
                }
            );
        }
    });

    $(document).on('click', '.task-edit', function() {
        let taskId = $(this).parent().parent().find('.task-id').html()
        $.post('backend/task-single.php', { taskId }, (res) => {
            const task = JSON.parse(res);
            $('#name').val(task[0].name);
            $('#description').val(task[0].description);
            $('#taskId').val(taskId);
            console.log(task[0].name);
            console.log(task);
            edit = true;
        });
    });

    /*$(document).on('click', '.task-edit', function(){
        if (confirm('Estas a punto de editar esta tarea.')) {
            let taskId = $(this).parent().parent().find('.task-id').html();
            let taskName = $(this).parent().parent().find('.task-name').html();
            let taskDescription = $(this).parent().parent().find('.task-description').html();
            let fieldName = $('#name');
            let fieldDescription = $('#description');
            fieldName.val(taskName);
            fieldDescription.val(taskDescription);
            $('#task-form').submit( (event) => {
                const postData = {
                id: taskId,
                name: fieldName,
                description: fieldDescription
            }
            $.post('backend/task-edit.php', { postData }, (res) => {
                    console.log(res);
                }
            );
            event.preventDefault();
            updateTasks();
            });
        }
    });*/

});
