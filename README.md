# semantic-web
# Fancy Todo

### Register :
```sh
URL: http://localhost:4000/users
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        name: "nobita",
        email: "nobita@mail.com",
        password: "nobita"
    }
Response Status : 201
Data Output :
    {
        "_id": "5ccf109c227c7e1387ab12f1",
        "name": "nobita",
        "email": "nobita@mail.com",
        "password": "$2a$10$BwEf3Bwsa8PJfliNr7UVOOoHPU0z8ucUdyt9JyJzM4KU3hdTwxHTW",
        "__v": 0
    }

Response Status : 400
    "User validation failed: email: Email already registered"
    
Response Status : 500
    "Internal Server Error"
```


### Login :

```sh
URL: http://localhost:4000/users
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "sakura@mail.com",
        password: "sakura"
    }
Response Status : 200
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FrdXJhIiwiaWQiOiI1Y2NlNjVhZDNmMTEzMDI1MjkzODgyZTgiLCJlbWFpbCI6InNha3VyYUBtYWlsLmNvbSIsImlhdCI6MTU1NzA3NDI4N30.BRYKqtEzh1vlyy5Zq36xXFYEVY_FDogwJPRtzcM7Hq0",
        "id": "5cce65ad3f113025293882e8",
        "name": "sakura"
    }
Response Status : 400
    "email/password wrong!"

Response Status : 500
    "Internal Server Error"
```
### Create Todo :

```sh
http://127.0.0.1:4000/todos
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Data Input :
    {
        todo_name: "Menguasai dunia",
        description: "Menjadikan dunia adil & makmur",
        due_date: 2019-05-11
    }
Response Status : 201
    {
        "_id": "5ccd3e14c02d9c40106c1414",
        "todo_name": "bikin app",
        "description": "bikin app pake mongoose",
        "due_date": "2019-05-11T00:00:00.000Z",
        "owner": {
            "_id": "5ccd39b7ec80993766ed132c",
            "name": "naruto",
            "email": "naruto@mail.com",
            "password": "$2a$10$tl5NrYUlPx6yDBIquSpok.gKA5uIRUS8SygDqaJttbt1uKVYTKlmC",
            "__v": 0
        },
        "status": "close",
        "createdAt": "2019-05-04T07:24:04.652Z",
        "__v": 0
    }
    
Response Status : 500
    "Internal Server Error"
```
### All Todos :

```sh
http://127.0.0.1:4000/todos
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Response Status : 200
    [
        {
            "_id": "5ccd3e14c02d9c40106c1414",
            "todo_name": "bikin app",
            "description": "bikin app pake mongoose",
            "due_date": "2019-05-11T00:00:00.000Z",
            "owner": {
                "_id": "5ccd39b7ec80993766ed132c",
                "name": "naruto",
                "email": "naruto@mail.com",
                "password": "$2a$10$tl5NrYUlPx6yDBIquSpok.gKA5uIRUS8SygDqaJttbt1uKVYTKlmC",
                "__v": 0
            },
            "status": "close",
            "createdAt": "2019-05-04T07:24:04.652Z",
            "__v": 0
        },
        {...},
        {...}
    ]

Response Status : 500
    "Internal Server Error"
```

### My Todos :

```sh
http://127.0.0.1:4000/todos/:id
METHOD : GET
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
    [
        {
            "_id": "5ccd3e14c02d9c40106c1414",
            "todo_name": "bikin app",
            "description": "bikin app pake mongoose",
            "due_date": "2019-05-11T00:00:00.000Z",
            "owner": {
                "_id": "5ccd39b7ec80993766ed132c",
                "name": "naruto",
                "email": "naruto@mail.com",
                "password": "$2a$10$tl5NrYUlPx6yDBIquSpok.gKA5uIRUS8SygDqaJttbt1uKVYTKlmC",
                "__v": 0
            },
            "status": "close",
            "createdAt": "2019-05-04T07:24:04.652Z",
            "__v": 0
        },
        {...},
        {...}
    ]

Response Status : 500
    "Internal Server Error"
```

### Delete Todos :

```sh
http://127.0.0.1:4000/todos/:id
METHOD : PUT
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
    "Success"

Response Status : 500
    "Internal Server Error"
```

### Update Todo Status :

```sh
URL: https://ancient-brook-85580.herokuapp.com/api/todos/:id
METHOD : PUT
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
    "Success"

Response Status : 500
    "Internal Server Error"
```

```
FancyTodo License
----
**Free Software, Yeah!**
