# lootbox API
The application has full CRUD functionality for users. Users can create and add a random item to their ownedItems. Eventually there will be a trading system between users.
## How to setup the application
1. Clone the repo: 
``` 
git clone <repository-url>
cd restfulAPI 
```
2. install all dependencies:
```
npm install
```
3. create a .env file with the following code:
```
PORT=3000
ACCESS_TOKEN_SECRET=<your_secret_key>
MONGO_URI_LOCAL=<your_local_mongo_uri>
MONGO_URI_PROD=<your_production_mongo_uri>
```
5. start the application:
``` 
npm run dev
```
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
| GET | api/profile/filter/users?   | fetch data of all users in the database and filter by the first letter |  
| POST | api/profile | create new user |  
| PUT | api/profile | update current logged in users data by auth token |  
| DELETE | api/profile | delete current logged in user by auth token  |  

## API cURL documentation examples
### Create a user 
 ```
curl --request POST   --url 'https://restfulapi-aqov.onrender.com/api/profile?='   --header 'Content-Type: application/json'   --header 'User-Agent: insomnia/10.3.1'   --data '{ 
    "email": "Desi1@Lasse.com",
    "name": "Desi1",
    "password": "banan1212" ,
    "money": 122,
        "ownedItems": []
 }'
```
### Get user data by id 
```
curl --request GET \
  --url https://restfulapi-aqov.onrender.com/api/profile/67e6c4a53b6051e1fe6a265a \
  --header 'User-Agent: insomnia/10.3.1'
```
### Update user by auth token
```
curl --request PUT \
  --url https://restfulapi-aqov.onrender.com/api/profile \
  --header 'Authorization: Bearer <Access_Token>' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.3.1' \
  --data '{ 
    "email": "Desi@Lasse.com",
    "name": "Desi",
    "password": "banan2121"
 }'
```
### Delete user by auth token
```
curl --request DELETE \
  --url https://restfulapi-aqov.onrender.com/api/profile \
  --header 'Authorization: Bearer <Access_Token>' \
  --header 'User-Agent: insomnia/10.3.1'
```
### Filter by first letter and fetch all data 
```
curl --request GET \
  --url 'https://restfulapi-aqov.onrender.com/api/profile/filter/users?startingLetter=d' \
  --header 'User-Agent: insomnia/10.3.1'
```