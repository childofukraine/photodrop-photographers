# photodrop-photographers
#
### [POST] /sign-up - using for register new users
### body: JSON
```json
{
	"login": "test", // allowed: letters and underscore
	"password": "test", // allowed: letters and numbers
	"email": "test.test@test.com", // optional field
	"fullName": "Test Test" // optional field
}
```
#
### [POST] /login
#### body: JSON
```json
{
	"login": "test", // allowed: letters and underscore
	"password": "test", // allowed: letters and numbers
}
```
#### After login you will gain access token in response.body and refresh token in cookies. You should store access token in client side app in headers["authorization"].
#
### [POST] /refresh
#### body: none
#### cookies: refreshToken - yourRefreshToken
#### After refreshing tokens you will gain new access token in response.body and new refresh token in cookies
#
### [GET] /me
#### body: none
#### headers: ["authorization"]: access_token
- check access token expiration
#
### [POST] /create-album
#### body: JSON
```json
{
	"name": "Album Name", // required field
	"location": "Kyiv", // required field
	"datapicker": "Bob" // required field
}
```
#### headers: ["authorization"]: access_token
#### You will create new album with data from body
#
### [GET] /get-album/:albumId
#### body: none
#### headers: ["authorization"]: access_token
#### You will get your album with photos by album_id
#
### [GET] /all-albums
#### body: none
#### headers: ["authorization"]: access_token
#### You will get all yours albums
#