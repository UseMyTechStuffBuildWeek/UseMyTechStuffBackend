# Build Week Food Truck

### POST - Create Account
create a user with role type of renter or owner
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/auth/register</summary>

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
<summary>https://foodtruckbuildweek.herokuapp.com/api/auth/login</summary>

```JSON
what you need:
role can be owner or renter
{
    "username": "marco",  
    "password": "foobar", 
    "role": "owner"
    
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
<summary>https://foodtruckbuildweek.herokuapp.com/api/auth/logout</summary>

```JSON
Status: 200 OK
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Diner by id
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/diners/{diner_id}</summary>

```JSON
what you get back:
{
    "diner_id": 2,
    "longitude": "01.44888",
    "latitude": "90.12322",
    "diner_favetruck_id": 2
}
    
    
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get Diner favorite truck by id
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/diners/{diner_id}/trucks</summary>

```JSON
what you get back:
[
    {
        "truck_id": 1,
        "truck_img": "arturo-rey-m6fYkq_P2Cc-unsplash.jpg",
        "cuisine_type": "french",
        "departure_time": "19:00:00",
        "longitude": "44.88888",
        "latitude": "22.12121",
        "diner_favetruck_id": 3,
        "diner_id": 1
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get ALL trucks
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/trucks</summary>

```JSON
what you get back:
[
    {
        "truck_id": 1,
        "truck_img": "arturo-rey-m6fYkq_P2Cc-unsplash.jpg",
        "cuisine_type": "french",
        "departure_time": "19:00:00",
        "longitude": "99.00333",
        "latitude": "44.77777"
    },
    {
        "truck_id": 2,
        "truck_img": "s-o-c-i-a-l-c-u-t--eeAvufLf9A-unsplash.jpg",
        "cuisine_type": "vietnamese",
        "departure_time": "17:00:00",
        "longitude": "91.00998",
        "latitude": "14.75577"
    },
    {
        "truck_id": 3,
        "truck_img": "harry-gillen-b2gdRynjL9Q-unsplash.jpg",
        "cuisine_type": "mexican",
        "departure_time": "21:00:00",
        "longitude": "90.00322",
        "latitude": "77.76654"
    }
]
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get truck by id
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/trucks/{truck_id}</summary>

```JSON
what you get back:
{
    "truck_id": 1,
    "truck_img": "arturo-rey-m6fYkq_P2Cc-unsplash.jpg",
    "cuisine_type": "french",
    "departure_time": "19:00:00",
    "longitude": "99.00333",
    "latitude": "44.77777"
}
```
</details>

-----------------------------------------------------------------------------------------


### POST - Create new truck
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/trucks</summary>

```JSON
what you need: 
{
    "truck_img": "eugene-chystiakov-nlHdn7AhJHY-unsplash.jpg",
    "cuisine_type": "american",
    "departure_time": "11:00pm",
    "longitude": "12.12121",
    "latitude": "13.13133"
}

what you get back: 

{
    "truck_id": 4,
    "truck_img": "eugene-chystiakov-nlHdn7AhJHY-unsplash.jpg",
    "cuisine_type": "american",
    "departure_time": "23:00:00",
    "longitude": "12.12121",
    "latitude": "13.13133"
}
```
</details>

-----------------------------------------------------------------------------------------

### PUT - Update Truck
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/trucks/{truck_id}</summary>

```JSON
What you need: 
{
    "truck_id": 2, 
    "truck_img": "eugene-chystiakov-nlHdn7AhJHY-unsplash.jpg",
    "cuisine_type": "eithopian",
    "departure_time": "11:11pm",
    "longitude": "15.12121",
    "latitude": "13.13443"
}

What you get is:
Status: 200 Ok
```
</details>

-----------------------------------------------------------------------------------------

### DELETE - Delete truck
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/trucks/{truck_id}</summary>

```JSON
{
    "message": "truck deleted"
}
```
</details>


-----------------------------------------------------------------------------------------

### GET - Get operator by id
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/operators/{operator_id}</summary>

```JSON
what you get back:
{
    "operator_id": 2,
    "truck_id": 3
}
```
</details>

-----------------------------------------------------------------------------------------

### GET - Get trucks based on operator's id
<details>
<summary>https://foodtruckbuildweek.herokuapp.com/api/operators/{operator_id}/trucks</summary>

```JSON
what you get back:
[
    {
        "truck_id": 1,
        "truck_img": "arturo-rey-m6fYkq_P2Cc-unsplash.jpg",
        "cuisine_type": "french",
        "departure_time": "19:00:00",
        "longitude": "99.00333",
        "latitude": "44.77777",
        "operator_id": 1
    }
]
```
</details>
