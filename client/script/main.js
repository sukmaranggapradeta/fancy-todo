$(()=>{
    $('#todo_id').hide()
    $('#logout').hide()
    $('.row').hide()
    $('#signUpBox').hide()
    $('#createTodo').hide()
    $('#email-err').hide()
    $('#password-err').hide()
    $('#login-err').hide()

    $('#singup-name-err').hide()
    $('#singup-email-err').hide()
    $('#singup-pass-err').hide()
    $('#singup-match-err').hide()

    $('#btn-register').on('click', ()=>{
        $('#loginBox').slideUp(1000)
        $('#signUpBox').fadeIn(1000)
    })

    $('#logout').on('click', ()=>{
        $('#logout').slideUp(1000)
        $('.row').slideUp(1000)
        $('#loginBox').fadeIn(1000)
    })

    $('#btn-addTodo').on('click', ()=>{
        $('#todoDetail').hide()
        $('#createTodo').show()
    })

    $('#todo-form').submit(()=>{
        createTodo()
    })

    $('.tombolDelete').on('click', function(){
        console.log('deletedeeeee')
    })

    $('#btn-login').on('click', function(){
        $('#signUpBox').hide()
        $('#loginBox').fadeIn(1000)
    })
})