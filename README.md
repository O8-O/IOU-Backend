# IOU-Backend
IOU ( Interior On You ) 의 Back end Server Project.

# 1. Setup

Clone or download and Use npm install
>   ```
>   npm install
>   ```

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
>       - POSSIBLE ERROR : 101
>   ```
>> ### GET "/user/log_in_status"
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
>       - POSSIBLE ERROR : 103
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
>       - POSSIBLE ERROR : 101, 102
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
>       - POSSIBLE ERROR : 103
>   ```
>> ### POST "/user/upload_image"
>   ```
>   - USAGE : Upload and make image data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           imgFile : {imageFile}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 104
>   ```
>> ### GET "/user/show_all_image"
>   ```
>   - USAGE : Show user's uploaded image.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {list}
>           }
>       - POSSIBLE ERROR : 105
>   ```
>> ### GET "/user/show_one_image"
>   ```
>   - USAGE : Show user's specific uploaded image.
>   - REQUEST
>       - BODY(JSON)
>       {
>           imageNum : {imageNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 105
>   ```
>> ### POST "/user/delete_image"
>   ```
>   - USAGE : Delete image data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           imageNum : {imageNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 106, 107
>   ```
>> ### POST "/user/download_image"
>   ```
>   - USAGE : Download image data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           image : {imageURI}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY
>           IMAGE
>       - POSSIBLE ERROR : 
>   ```
>> ### POST "/user/save_preference"
>   ```
>   - USAGE : Save preference selection data of user's in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           list : {array of imageNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 108
>   ```
>> ### POST "/user/show_user_preference"
>   ```
>   - USAGE : Show preference selection data of user's.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 101
>   ```
>> ### POST "/user/show_preference"
>   ```
>   - USAGE : Show recommended preference data.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 105
>   ```
>> ### POST "/user/add_preference"
>   ```
>   - USAGE : Add preference selection data of user's in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           image : {imageNum}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 109
>   ```
>> ### POST "/user/find_id"
>   ```
>   - USAGE : Find user's ID.
>   - REQUEST
>       - BODY(JSON)
>       {
>           email : {userEmail}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {userID}
>           }
>       - POSSIBLE ERROR : 101
>   ```
>> ### POST "/user/reset_password"
>   ```
>   - USAGE : Reset user's password.
>   - REQUEST
>       - BODY(JSON)
>       {
>           id : {userID},
>           email : {userEmail},
>           password: {newPassword}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 107, 110
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
>
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
>
> ## hot_board
>> ### GET "/hot_board/show"
>   ```
>   - USAGE : Show all free_board in recommend DESC Order. (if same recommend count, date desc order)
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 
>   ```
>
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
> ## recommend
>> ### POST "/recommend/free"
>   ```
>   - USAGE : Make free board recommend data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
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
>> ### POST "/recommend/vote"
>   ```
>   - USAGE : Make vote board recommend data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
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
>> ### POST "/recommend/freeCancel"
>   ```
>   - USAGE : Delete free board recommend data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
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
>> ### POST "/recommend/voteCancel"
>   ```
>   - USAGE : Delete vote board recommend data in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
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
> ## ERROR CASE
>   ```
>   - case 0 : The Unexpected error.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 0,
>               msg : "Unexpected error"
>           }
>   - case 101 : ID doesn't exist in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 101,
>               msg : "No ID Exists"
>           }
>   - case 102 : Password doesn't match with ID.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 102,
>               msg : "Incorrect Password"
>           }
>   - case 103 : Session is not valid.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 103,
>               msg : "Not valid session"
>           }
>   - case 104 : Fail to upload image.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 104,
>               msg : "Fail to upload image"
>           }
>   - case 105 : Fail to show image.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 105,
>               msg : "Fail to show image"
>           }
>   - case 106 : Fail to delete image.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 106,
>               msg : "Fail to delete image"
>           }
>   - case 107 : Current user's id doesn't match with image's userID.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 107,
>               msg : "ID doesn't match"
>           }
>   - case 108 : Fail to save preference of current user's.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 108,
>               msg : "Fail to save preference"
>           }
>   - case 109 : Fail to add preference of current user's.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 109,
>               msg : "Fail to add preference"
>           }
>   - case 110 : Fail to update user's password.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 110,
>               msg : "Fail to update password"
>           }
>   ```
>
>