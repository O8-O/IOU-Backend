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
> ## free_board
>> ### GET "/free_board/show"
>   ```
>   - USAGE : Get all free board data.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {postData}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/free_board/showAllUser"
>   ```
>   - USAGE : Get current user's entire free board data.
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
>> ### GET "/free_board/showOne"
>   ```
>   - USAGE : Get one specific free board data.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum}
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
>> ### POST "/free_board/create"
>   ```
>   - USAGE : Make free board data in DB.
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
>> ### POST "/free_board/delete"
>   ```
>   - USAGE : Delete free board data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           postNum : {postNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
> ## vote_board
>> ### GET "/vote_board/show"
>   ```
>   - USAGE : Get all vote board data.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {postData}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/vote_board/showAllUser"
>   ```
>   - USAGE : Get current user's entire vote board data.
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
>> ### GET "/vote_board/showOne"
>   ```
>   - USAGE : Get one specific vote board data.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum}
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
>> ### POST "/vote_board/create"
>   ```
>   - USAGE : Make vote board data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           title : {title},
>           contentText : {contentText},
>           id : {userID},
>           imgFile : {imageFile1},
>           imgFile : {imageFile2}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/vote_board/delete"
>   ```
>   - USAGE : Delete vote board data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           postNum : {postNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/vote_board/vote"
>   ```
>   - USAGE : Make vote data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           postNum : {postNum},
>           choice : {1 or 2}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### GET "/vote_board/showVote"
>   ```
>   - USAGE : Show vote data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/vote_board/cancelVote"
>   ```
>   - USAGE : Delete vote data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           postNum : {postNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 
>   ```
> ## comment
>> ### GET "/comment/show"
>   ```
>   - USAGE : Show all comments data.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postType : {postType} (1: free_board, 2: vote_board),
>           postNum : {postNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/comment/make"
>   ```
>   - USAGE : Make comment data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postType : {postType} (1: free_board, 2: vote_board),
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
>> ### POST "/comment/delete"
>   ```
>   - USAGE : Delete user's specific comment data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           commentNum: {commentNum}
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
