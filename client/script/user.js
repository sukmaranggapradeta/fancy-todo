function register(){
    event.preventDefault()
    if ($('#register_name').val() === ''){
        $('#singup-name-err').show()
        $('#singup-email-err').hide()
        $('#singup-pass-err').hide()
        $('#singup-match-err').hide()
    }else
    if($('#register_email').val() === ''){
        $('#singup-email-err').show()
        $('#singup-name-err').hide()
        $('#singup-pass-err').hide()
        $('#singup-match-err').hide()
    }else
    if($('#register_password').val() === ''){
        $('#singup-pass-err').show()
        $('#singup-name-err').hide()
        $('#singup-email-err').hide()
        $('#singup-match-err').hide()    
    }else
    if($('#register_password').val() !== $('#register_confirm_password').val()){
        $('#singup-name-err').hide()
        $('#singup-email-err').hide()
        $('#singup-pass-err').hide()    
        $('#singup-match-err').show()
    }else{
        // console.log('create user')
        $.ajax({
            url:'http://localhost:4000/users/',
            method:'POST',
            data:{
                name: $('#register_name').val(), 
                email: $('#register_email').val(), 
                password: $('#register_password').val(),
            }
        })
        .done((Response)=>{
            // console.log(Response, "response")
            $.ajax({
                url:'http://localhost:4000/users/login',
                method:'POST',
                data:{
                    email: $('#register_email').val(),
                    password: $('#register_password').val()
                }
            })
            .done((loginSukses)=>{
                // console.log(loginSukses,"login sukses")
                localStorage.setItem('token', loginSukses.token)
                localStorage.setItem('id', loginSukses._id)
                localStorage.setItem('name', loginSukses.name)
                $('#signUpBox').hide()
                $('#loginBox').slideUp(1000)
                $('.row').show(1000)
                $('#logout').show(1000)
                $('#profileUser').empty()
                $('#profileUser').append(
                    `
                    <p id="myProfile" style="margin-left: 20%">Welcome ${localStorage.getItem('name')}</p>

                    `
                )
                getMyTodosOpen()
            })
            .fail((jqXHR, textStatus)=>{
                console.log(textStatus, 'request failed')
            })    
        })
        .fail((jqXHR, textStatus)=>{
            console.log(textStatus, 'request failed')
        })
    }
}

function login(){
    event.preventDefault()
    if ($('#email').val() === '' ){
        $('#email-err').show()
        // console.log('Please input email and password')
    }else if ($('#password').val() === '' ){
        $('#email-err').hide()
        $('#password-err').show()
        // console.log('Please input email and password')
    } else{
        $.ajax({
            url:`http://localhost:4000/users/${$('#email').val()}`,
            method:'GET',
        })
        .done((userFound)=>{
            if (userFound === null){
                $('#password-err').hide()
                $('#login-err').show()
            }else{
                $.ajax({
                    url:'http://localhost:4000/users/login',
                    method:'POST',
                    data:{
                        email: $('#email').val(),
                        password: $('#password').val()
                    },
                    headers:{
                        token : localStorage.getItem('token')
                    }            
                })
                .done((loginSukses)=>{
                    // console.log(loginSukses)
                    localStorage.setItem('token', loginSukses.token)
                    localStorage.setItem('id', loginSukses.id)
                    localStorage.setItem('name', loginSukses.name)
                    $('#loginBox').slideUp(1000)
                    $('.row').show(1000)
                    $('#logout').show(1000)
                    $('#profileUser').empty()
                    $('#profileUser').append(
                        `
                        <p id="myProfile" style="margin-left: 20%">Welcome ${localStorage.getItem('name')}</p>

                        `
                    )
                    getMyTodosOpen()
                })
                .fail((jqXHR, textStatus)=>{
                    console.log(textStatus, 'request failed')
                })
            }
        })
        .fail((jqXHR, textStatus)=>{
            console.log(textStatus, 'request failed')
        })
    }
}

function onSignIn(googleUser) {
    // console.log('masuk sign in')
    let token = googleUser.getAuthResponse().id_token;
    // console.log(id_token, "ini id_token")
    $.ajax({
        url:'http://127.0.0.1:4000/google',
        method:'POST',
        headers:{
            token : token
        }
    })
    .done((Response)=>{
        // console.log(Response.data)
        // console.log(Response, "ini response")
        $.ajax({
            url:`http://127.0.0.1:4000/users/${Response.data.email}`,
            method:'GET',
            headers:{
                token : Response.token
            }
    
        })
        .then((found)=>{
            if (found){
                // console.log('sudah member')
                // console.log(found ,"-----found")
                localStorage.setItem('token', Response.token)
                localStorage.setItem('name', found.name) 
                localStorage.setItem('id', found._id)       
                $('#signUpBox').hide()
                $('#loginBox').slideUp(1000)
                $('.row').show(1000)
                $('#logout').show(1000)
                $('#profileUser').empty()
                $('#profileUser').append(
                    `
                    <p id="myProfile" style="margin-left: 20%">Welcome ${localStorage.getItem('name')}</p>

                    `
                )
                getMyTodosOpen()
            }else{
                // console.log('belum member')
                // console.log(Response.data.name)
                // console.log(Response.data.email)
                $.ajax({
                    url:'http://localhost:4000/users/',
                    method:'POST',
                    data:{
                        name: Response.data.name, 
                        email: Response.data.email, 
                        password: Response.data.email,
                    },
                    headers:{
                        token : localStorage.getItem('token')
                    }                        
                })
                .done((Response)=>{
                    // console.log(Response, "response")
                    // console.log(loginSukses,"login sukses")
                    localStorage.setItem('token', Response.token)
                    localStorage.setItem('name', Response.name) 
                    localStorage.setItem('name', Response.id)       
                    $('#signUpBox').hide()
                    $('#loginBox').slideUp(1000)
                    $('.row').show(1000)
                    $('#logout').show(1000)
                    $('#profileUser').empty()
                    $('#profileUser').append(
                        `
                        <p id="myProfile" style="margin-left: 20%">Welcome ${Response.name}</p>

                        `
                    )
                    getMyTodosOpen()
                })
                .fail((jqXHR, textStatus)=>{
                    console.log(textStatus, 'request failed')
                })        
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .fail((jqXHR, textStatus)=>{
        console.log(`request failed ${textStatus}`)
    })
}

function signOut() {
    // console.log('ini sign out')
    // localStorage.removeItem()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        // console.log('User signed out.');
        event.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        $('#login-err').hide()
        $('#email').val('')
        $('#password').val('')
    });
}
