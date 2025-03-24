# Object modeling
## Users model
| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | Number | User ID |
| email | String | User email adress |
| name | String | User name |
| password | String (hashed) | Password for user |
| money | Number | capital for user |
| ownedItems | Number[] | user inventory items |
| createAt | date | user created date |
| updateAt | date | Item updated date |

## Items model
| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | Number | Item ID |
| itemName | String | item name |
| value | Number | value of item in money |
| rarity | Number | chance to recieve item in lootbox |
| creatorId | Number | Owner ID |
| createAt | date | Item created date |


---
# Resource URI:s
| Resource | URI | Description |
| ----------- | ----------- | ----------- |
| Users | /api/profile | Manage logged in user |
| Items | /api/profile/inventory | Manage all items user owns |



# Resource Representations
## Users
```json
{
    "id": 1, 
    "email": "Elias@Lasse.com",
    "name": "Elias",
    "password": "GoodPassword1" ,
    "money": 200,
    "ownedItems": [1, 7, 32],
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
| GET | api/items/lootbox | recieve a random item based on rarity |  
| POST | api/items | create a single item |


| GET | api/profile/:id | fetch data of user by id |  
| GET | api/profile/users    | fetch data of all users in the database |  
| POST | api/profile | create new user |  
| PUT | api/profile/:id | update user data by id |  
| DELETE | api/profile/:id | delete user by id |  

# NTS
1. auth tokens till alla routes X
2. titta igenom och förstå kod X
4. deploy /
5. ändra status error på allt /
3. skriv cURL 
6. extra features? /




