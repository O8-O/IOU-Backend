# IOU-Backend
IOU ( Interior On You ) 의 Back end Server Project.

# 1. Setup

Clone or download and Use npm install

```
npm install
```

# 2. Usage

> ## user
>> ### POST "/user/sign_in"
>   ```
>   - USAGE : Make new user data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           password : {userPW},
>           email : {userEmail}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/user/log_in"
>   ```
>   - USAGE : Check log_in status of user.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - NOT LOG_INED
>           - BODY(JSON)
>           {
>               result : false
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/user/log_in"
>   ```
>   - USAGE : Request log_in of user.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           password : {userPW}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/user/log_out"
>   ```
>   - USAGE : Request log_out of user.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - ALREADY LOG_OUT
>           - BODY(JSON)
>           {
>               result : false
>           }
>       - POSSIBLE ERROR : 
>   ```
>
> ## popularity_board
>> ### GET "/popularity_board/show"
>   ```
>   - USAGE : Get all popularity board data.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {postData}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/popularity_board/showAll"
>   ```
>   - USAGE : Get all user's popularity board data.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {postData}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/popularity_board/showOne"
>   ```
>   - USAGE : Get one specific popularity board data.
>   - REQUEST
>       - BODY(JSON)
>       {
>           post : {postNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               board : {postData},
>               comment : {commentData}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/popularity_board/create"
>   ```
>   - USAGE : Make popularity board data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           title : {title},
>           contentText : {contentText},
>           id : {userID},
>           imgFile : {imageFile} (생략 가능)
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/popularity_board/comment"
>   ```
>   - USAGE : Make comment data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
>           content : {content},
>           id : {userID}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>
>
