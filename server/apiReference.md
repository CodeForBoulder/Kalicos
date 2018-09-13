### GET /hello
used to ensure the server and test suites are up and fully functional. (we can remove this later)

**Example Request**
`http://localhost:3000/hello`

**Example Response**
```json
{
  "welcome": "hello and welcome to the Kalicos rest server!"
}
```

### POST /api/user
used to create a user **This route is currently really only a template it is not fialized. Revision will be needed**

**Example Request**
```json
{
	"name": "joe shmoe",
	"email": "joe@email.com"
}
```

**Example Response**
```json
{
    "__v": 0,
    "name": "joe shmoe",
    "email": "joe@email.com",
    "_id": "59cc54c4df543b03191b243c"
}
```
