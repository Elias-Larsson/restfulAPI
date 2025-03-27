# Object modeling
The application has full CRUD functionality for users. Users can create and add a random item to their ownedItems.  
## Users model
| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | Number | User ID |
| email | String | User email adress |
| name | String | User name |
| password | String (hashed) | Password for user |
| money | Number | capital for user |
| ownedItems | ObjectId[] | user owned items in inventory |
| createAt | date | user created date |
| updateAt | date | Item updated date |

## Items model
| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | Number | Item ID |
| itemName | String | item name |
| value | Number | value of item in money |
| rarity | Number | chance to recieve item in lootbox |
| creatorId | ObjectId | user who created the item|
| createAt | date | Item created date |
| updateAt | date | Item updated date |


---
# Resource URI:s
| Resource | URI | Description |
| ----------- | ----------- | ----------- |
| Users | /api/profile | Manage logged in user |
| Items | /api/items | Manage all items user owns |



# Resource Representations
## Users
```json
{
    "id": 67db9a712kda52e0adc1135f, 
    "email": "Elias@larsson.com",
    "name": "Elias",
    "password": "PasswordsPass" ,
    "money": 200,
    "ownedItems": [
        67d9912d05h222d109f380f2,
        67dae6aee07d179305ab2752
        ],
    "createAt": "2025-03-04T12:00:00Z",
    "updateAt": "2025-03-04T12:00:00Z"
}
```
# Items
```json
{
    "id": 1, 
    "itemName": "Awesome name",
    "value": 100,
    "rarity": 0.1, 
    "creatorId": 1,
    "createAt": "2025-03-04T12:00:00Z"
}
```
# Assigning of HTTP methods

| Method | Endpoint |Description|
| ----------- | ----------- | ----------- |
| GET | api/items | fetch all items | 
| GET | api/items/:id | fetch a single item |  
| GET | api/items/lootbox | recieve a random item |  
| POST | api/items | create a single item |
| GET | api/profile/:id | fetch data of user by id |  
| GET | api/profile/users    | fetch data of all users in the database |  
| POST | api/profile | create new user |  
| PUT | api/profile | update current logged in users data by auth token |  
| DELETE | api/profile | delete current logged in user by auth token  |  

## API cURL documentation

Create a new user
curl -X POST "https://restfulapi-aqov.onrender.com/api/profile" \
     -H "Content-Type: application/json" \
     -d '{"name": "Elias", "password": "mypassword2025", "email": "elias@larsson.com"}'
log in
curl -X POST http://localhost:8080/api/login \
     -H "Content-Type: application/json" \
     -d '{"username": "Elias", "password": "mypassword2025" }'
Get user
curl -X GET "https://restfulapi-aqov.onrender.com/api/67e11bc35a26e1b4c64bd9e1" \
     -H "Authorization: Bearer <Your_Access_Token>"
Delete user
usercurl -X DELETE "https://restfulapi-aqov.onrender.com/api/profile" \
     -H "Authorization: Bearer <Your_Access_Token>"
Update user
curl -X PUT "https://restfulapi-aqov.onrender.com/api/profile" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <Your_Access_Token>" \
     -d '{"username":"testuser1"}'
