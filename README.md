# Use My Tech App

### POST - Create Account
create a user with role type of renter or owner
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/auth/register</summary>

```JSON
what you need:
{
    "username": "marco",  
    "password": "foobar", 
    "role": "owner"
}

what you get back:
{
    "user_id": 12,
    "username": "mary",
    "password": "$2a$08$cHlS2uqmuiHGvZcqcnFKNOnWcHJD49nDpINZslFqKaQi8dWMIoclC",
    "role": "owner"
}
```
</details>

-----------------------------------------------------------------------------------------

### POST - Login
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/auth/login</summary>

```JSON
what you need:
role can be owner or renter
{
    "username": "marco",  
    "password": "foobar",
}

what you get back:
{
    "message": "marco is back!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJtYXJjbyIsInJvbGUiOiJvd25lciIsImlhdCI6MTYxOTM2ODY1OCwiZXhwIjoxNjE5NDU1MDU4fQ.Hl9vOkOOhNPTcuckYaoj1b8KCMUvCHXGgMPFK4Vd2XA",
    "role": "owner"
}
```
</details>

-----------------------------------------------------------------------------------------

### DELETE - Logout User
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/auth/logout</summary>

```JSON
Status: 200 OK
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get All Equipment
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/equipment</summary>
    
```JSON
Returns ALL equipment.

what you get back:
[
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 1,
        "name": "camera",
        "imgUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "description": "like new",
        "isAvailable": true
    },
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 2,
        "name": "video camera",
        "imgUrl": "https://images.unsplash.com/photo-1589872307379-0ffdf9829123?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
        "description": "excellent audio and image",
        "isAvailable": true
    },
    {
        "owner": {
            "id": 2,
            "username": "Mario"
        },
        "id": 3,
        "name": "podcast microphone",
        "imgUrl": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "description": "best audio out there",
        "isAvailable": true
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Equipment By Id
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/equipment/:equipment_id</summary>
    
```JSON
Returns equipment with specific id.

what you get back:
{
    "owner": {
        "id": 2
    },
    "id": 1,
    "name": "camera",
    "imgUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "description": "like new",
    "isAvailable": true
}
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Owned Equipment
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/users/owner</summary>
    
```JSON
Returns equipment the user owns.

what you get back:
[
    {
        "equipment_id": 1,
        "equipment_name": "camera",
        "equipment_description": "like new",
        "equipment_img": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "equipment_available": true,
        "user_id": 1,
        "request_id": 1,
        "accepted": false
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Rented Equipment
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/users/renter</summary>
</details>

-----------------------------------------------------------------------------------------

### POST - Add Equipment
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/equipment</summary>
    
```JSON
Adds equipment to database.

what you need:
{
    "name": "mining rig",
    "description": "generates money",
    "imgUrl": "https://cdn.mos.cms.futurecdn.net/pLmxqBBToop8EyqSyTzExn-970-80.jpg.webp"
}

what you get back:
{
    "owner": {
        "id": 2
    },
    "id": 9,
    "name": "mining rig",
    "imgUrl": "https://cdn.mos.cms.futurecdn.net/pLmxqBBToop8EyqSyTzExn-970-80.jpg.webp",
    "description": "generates money",
    "isAvailable": true
}
```
</details>

-----------------------------------------------------------------------------------------

### PUT - Update Equipment By ID
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/equipment/:equipment_id</summary>
</details>

-----------------------------------------------------------------------------------------

### DELETE - Remove Equipment By ID
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/equipment/:equipment_id</summary>
</details>

-----------------------------------------------------------------------------------------

### GET - Get Requests To Rent Owned Equipment
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/requests</summary>
</details>

-----------------------------------------------------------------------------------------

### POST - Create A Request To Rent
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/requests</summary>
</details>

-----------------------------------------------------------------------------------------

### PUT - Accept Rental Request By ID
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/requests/:request_id</summary>
</details>

-----------------------------------------------------------------------------------------

### DELETE - Delete Rental Request By ID
<details>
<summary>https://use-my-tech-app.herokuapp.com/api/requests/:request_id</summary>
</details>

-----------------------------------------------------------------------------------------
