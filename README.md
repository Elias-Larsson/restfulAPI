# Object modeling
## Users model
| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | Number | User ID |
| email | string | User email adress |
| name | string | User name |
| password | string (hashed) | Password for user |
| money | Number | capital for user |
| ownedItems | Number[] | user inventory items |
| createAt | date | user created date |
| updateAt | date | Item updated date |

## Items model
| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | Number | Item ID |
| value | number | value of item in money |
| ownerId | number | Owner ID |
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
    "itemName": "SUPER MEGA",
    "value": 100,
    "ownerId": 1,
    "createAt": "2025-03-04T12:00:00Z"
}
```
# Assigning of HTTP methods

| Method | Endpoint |Description|Access Control|
| ----------- | ----------- | ----------- |----------- |
| GET | api/items | fetch all items | |
| GET | api/items/:id | fetch a single item |  |
| POST | api/items | fetch a single item |  |
| GET | api/profile | fetch data of current user |  |
| POST | api/profile | create new user |  |
| PUT | api/profile | update current user data |  |
| DELETE | api/profile | delete current user |  |



