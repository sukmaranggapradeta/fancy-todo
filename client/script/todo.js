function createTodo(){
    event.preventDefault()
    let todo_name = $('#todo_name').val()
    let description = $('#description').val()
    let due_date = $('#due_date').val()
    let userId = localStorage.getItem('id')
    // console.log(userId)
    $.ajax({
        url:'http://localhost:4000/todos',
        method:'POST',
        data:{ 
            todo_name, description, due_date, owner: userId
        },
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done((newTodo)=>{
        // console.log(newTodo)
        $('#todo_name').val('');
        $('#description').val('');
        $('#due_date').val('');
        $('#createTodo').hide();
        $('#todoDetail').show();
        $('#todoDetail').empty();
        getMyTodosOpen()
    })
    .fail((jqXHR, textStatus)=>{
        console.log(textStatus, 'request failed')
    })
}

function getMyTodosOpen(){
    // event.preventDefault();
    $('#createTodo').hide();
    $('#todoDetail').show();
    $('#todoDetail').empty();
    $.ajax({
        url:`http://localhost:4000/todos/open/${localStorage.getItem('id')}`,
        method:'GET',
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done((todos)=>{
        $('#todoDetail').empty()
        if (todos.length === 0){
            $('#todoDetail').append(`
                <div class="conten">
                    <div class="card">
                        <h2>Empty</h2>
                    </div>
                </div>
            `)
        }else{
            todos.reverse()
            todos.forEach(todo => {
                let sekarang = new Date()
                let target = new Date(todo.due_date)
                let sisaHari = Math.floor((target - sekarang)/1000/24/3600)
                $('#todoDetail').append(`
                    <div class="conten">
                        <div class="card">
                            <a id="showTips" onclick="cariVideo('${todo.todo_name}')" style="float:right" href="#!">
                                <i class="fa fa-video-camera"></i> ShowTips
                            </a>    
                            <a class="btn-complete" style="float:right" onclick="updateStatus('${todo._id}')" href="#!">
                                <i class="fa fa-thumbs-up"></i> Complete
                            </a>
                            <h2>${todo.todo_name}</h2>
                            <h6><i class="fa fa-child"> Owner: ${todo.owner.name}</i></h6>
                            <hr>
                            <p>${todo.description}</p>
                            <div class="w3-container">
                                <h6 style="float:right"><i class="fa fa-calendar"> Remaining: ${sisaHari} days left</i></h6><br>
                            </div>
                        </div>
                        <a class="btn-danger" onclick="deleteTodo('${todo._id}')" style="float:right" href="#!">
                            <i class="fa fa-trash-o fa-lg"></i> Delete
                        </a>   
                    </div>
                `)
            });
        }
    })
    .fail((jqXHR, textStatus)=>{
        console.log(textStatus, 'request failed');
    })
}

function getMyTodosHistory(){
    // event.preventDefault();
    $('#createTodo').hide();
    $('#todoDetail').show();
    $('#todoDetail').empty();
    $.ajax({
        url:`http://localhost:4000/todos/history/${localStorage.getItem('id')}`,
        method:'GET',
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done((todos)=>{
        $('#todoDetail').empty()
        if (todos.length === 0){
            $('#todoDetail').append(`
                <div class="conten">
                    <div class="card">
                        <h2>Empty</h2>
                    </div>
                </div>
            `)
        }else{
            todos.reverse()
            todos.forEach(todo => {
                $('#todoDetail').append(`
                    <div class="conten">
                        <div class="card">
                            <h2>${todo.todo_name}</h2>
                            <h6><i class="fa fa-child"> Owner: ${todo.owner.name}</i></h6>
                            <hr>
                            <p>${todo.description}</p>
                        </div>
                        <a class="btn-danger" onclick="deleteTodo('${todo._id}')" style="float:right" href="#!">
                            <i class="fa fa-trash-o fa-lg"></i> Delete
                        </a>    
                    </div>
                `)
            });            
        }
    })
    .fail((jqXHR, textStatus)=>{
        console.log(textStatus, 'request failed');
    })
}

function cariVideo(todoName){
    // $("#showTips").on("click", function() {
        console.log(todoName)
        $.ajax({
            url:`https://www.googleapis.com/youtube/v3/search`,
            method:'GET',
            data:{
                key:'AIzaSyBLYRr8oVVLltzRbDQ3F9eerFgKbVU1AOc',
                part: "snippet",
                q: `tips how to ${todoName}`,
                type:"video",
                maxResults: 1,
                order: "viewCount",
                publishedAfter: "2015-01-01T00:00:00Z",
            }
        })
        .done((response)=>{
            $("#todoDetail").empty()
            response.items.forEach(el => {
                $("#todoDetail").append(
                    `<div class="item">
                        <iframe class="video w100" width="640" height="355" center-align src="//www.youtube.com/embed/${el.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>`
                );     
            });
        })
        .fail((jqXHR, textStatus)=>{
            console.log(`request failed ${textStatus}`)
        })
    // });
}

function updateStatus(id){
    // console.log('updateeeed')
    // event.preventDefault();
    $.ajax({
        url:`http://localhost:4000/todos/${id}`,
        method:'PUT',
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done((updated)=>{
        // console.log(updated)
        getMyTodosOpen()
    })
    .fail((jqXHR, textStatus)=>{
        console.log(textStatus, 'request failed');
    })
}

function deleteTodo(id){
    event.preventDefault();
    $.ajax({
        url:`http://localhost:4000/todos/${id}`,
        method:'DELETE',
        headers:{
            token : localStorage.getItem('token')
        }
    })
    .done((deleted)=>{
        getMyTodosOpen()
    })
    .fail((jqXHR, textStatus)=>{
        console.log(textStatus, 'request failed');
    })
}

$('[type="date"]').prop('min', function(){
    return new Date().toJSON().split('T')[0];
});
