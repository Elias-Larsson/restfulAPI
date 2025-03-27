# Object modeling
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
| PUT | api/profile/:id | update user data by id |  
| DELETE | api/profile/:id | delete user by id |  

# NTS
1. auth tokens till alla routes X
2. titta igenom och förstå kod X
3. deploy x

imorn
4. ändra status error på allt /
5. skriv cURL

idag
6. skriv update och delte på user
7. skriv README

trade 
- trade model: implementera user grejer
- trade controller: lycka till 


