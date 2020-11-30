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
>> ### POST "/user/log_in_status"
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
>> ### POST "/user/log_out"
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
>           imgFile : {imageFile},
>           lightColor : {lightColor}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 104
>   ```
>> ### POST "/user/show_all_image"
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
>> ### POST "/user/show_one_image"
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
>> ### GET "/user/download/:image"
>   ```
>   - USAGE : Download image data in DB with GET method.
>   - REQUEST : It needs imageNum in URL.    
>   - RESPONSE
>       - SUCCESS
>           - Show IMAGE
>       - POSSIBLE ERROR : 105
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
>       - NOT EXIST
>           - BODY(JSON)
>           {
>               result : false
>           }
>       - POSSIBLE ERROR :
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
>> ### POST "/user/edit_preference"
>   ```
>   - USAGE : Edit preference selection data of user's in DB.
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
>       - POSSIBLE ERROR : 111
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
>> ### POST "/free_board/show_all"
>   ```
>   - USAGE : Get all free board data.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {postData}
>           }
>       - POSSIBLE ERROR : 201
>   ```
>> ### POST "/free_board/show_all_user_board"
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
>       - POSSIBLE ERROR : 201
>   ```
>> ### POST "/free_board/show_one"
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
>               comment : {count, rows}
>           }
>       - POSSIBLE ERROR : 201
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
>           imgFile : {imageFile} (여러장 가능, 생략 가능)
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 601
>   ```
>> ### POST "/free_board/edit_text"
>   ```
>   - USAGE : Edit free board contentText in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
>           contentText : {contentText},
>           id : {userID}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 107, 203
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
>       - POSSIBLE ERROR : 105, 107, 202, 402, 504, 602
>   ```
>
> ## vote_board
>> ### POST "/vote_board/show_all"
>   ```
>   - USAGE : Get all vote board data.
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {postData}
>           }
>       - POSSIBLE ERROR : 301
>   ```
>> ### POST "/vote_board/show_all_user_board"
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
>       - POSSIBLE ERROR : 301
>   ```
>> ### POST "/vote_board/show_one"
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
>               count : {voteResult},
>               comment : {commentCount, rows}
>           }
>       - POSSIBLE ERROR : 301, 306
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
>       - POSSIBLE ERROR : 307, 601
>   ```
>> ### POST "/vote_board/edit_text"
>   ```
>   - USAGE : Edit vote board contentText in DB.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
>           contentText : {contentText},
>           id : {userID}
>       }
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - POSSIBLE ERROR : 107, 310
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
>       - POSSIBLE ERROR : 105, 107, 301, 302, 402, 504, 602
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
>       - POSSIBLE ERROR : 303, 308
>   ```
>> ### POST "/vote_board/show_vote"
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
>       - POSSIBLE ERROR : 304
>   ```
>> ### POST "/vote_board/cancel_vote"
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
>       - POSSIBLE ERROR : 305, 309
>   ```
>
> ## hot_board
>> ### POST "/hot_board/show"
>   ```
>   - USAGE : Show all free_board in recommend DESC Order. (if same recommend count, date desc order)
>   - REQUEST : Nothing.
>   - RESPONSE
>       - SUCCESS
>           - BODY(JSON)
>           {
>               result : {result}
>           }
>       - POSSIBLE ERROR : 502
>   ```
>
> ## comment
>> ### POST "/comment/show"
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
>       - POSSIBLE ERROR : 107, 401
>   ```
>
> ## recommend
>> ### POST "/recommend/make_free"
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
>       - POSSIBLE ERROR : 501, 503, 505
>   ```
>> ### POST "/recommend/make_vote"
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
>       - POSSIBLE ERROR : 501, 503, 505
>   ```
>> ### POST "/recommend/cancel_free"
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
>       - POSSIBLE ERROR : 501, 504, 506
>   ```
>> ### POST "/recommend/cancel_vote"
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
>       - POSSIBLE ERROR : 501, 504, 506
>   ```
>> ### POST "/recommend/exist_free"
>   ```
>   - USAGE : Check whether user's recommend data exists in free board.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
>           id : {userID}
>       }
>   - RESPONSE
>       - EXIST
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - NOT EXIST
>           - BODY(JSON)
>           {
>               result : false
>           }
>       - POSSIBLE ERROR : 501
>   ```
>> ### POST "/recommend/exist_vote"
>   ```
>   - USAGE : Check whether user's recommend data exists in vote board.
>   - REQUEST
>       - BODY(JSON)
>       {
>           postNum : {postNum},
>           id : {userID}
>       }
>   - RESPONSE
>       - EXIST
>           - BODY(JSON)
>           {
>               result : true
>           }
>       - NOT EXIST
>           - BODY(JSON)
>           {
>               result : false
>           }
>       - POSSIBLE ERROR : 501
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
>   - case 111 : Fail to update user's preference.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 111,
>               msg : "Fail to update preference"
>           }
>   - case 201 : No Free Board Post exists in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 201,
>               msg : "No Free Board Post exists"
>           }
>   - case 202 : Fail to delete Free Board Post.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 202,
>               msg : "Fail to delete Free Board Post"
>           }
>   - case 203 : Fail to update contentText in Free Board Post.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 203,
>               msg : "Fail to update contentText in DB"
>           }
>   - case 301 : No Vote Board Post exists in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 301,
>               msg : "No Vote Board Post exists"
>           }
>   - case 302 : Fail to delete Vote Board Post.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 302,
>               msg : "Fail to delete Vote Board Post"
>           }
>   - case 303 : Fail to make vote data in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 303,
>               msg : "Fail to make vote data in DB"
>           }
>   - case 304 : Fail to show vote data in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 304,
>               msg : "Fail to show vote data in DB"
>           }
>   - case 305 : Fail to delete vote data in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 305,
>               msg : "Fail to delete vote data in DB"
>           }
>   - case 306 : Fail to count vote data in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 306,
>               msg : "Fail to count vote data in DB"
>           }
>   - case 307 : No image received.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 307,
>               msg : "No image received"
>           }
>   - case 308 : Vote data already exists in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 308,
>               msg : "Already voted"
>           }
>   - case 309 : Post Num doesn't match.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 309,
>               msg : "Post Num doesn't match"
>           }
>   - case 310 : Fail to update contentText in Vote Board Post.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 310,
>               msg : "Fail to update contentText in DB"
>           }
>   - case 401 : Fail to show comment.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 401,
>               msg : "Fail to show comment"
>           }
>   - case 402 : Fail to delete comment.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 402,
>               msg : "Fail to delete comment"
>           }
>   - case 501 : Fail to find recommend.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 501,
>               msg : "Fail to find recommend"
>           }
>   - case 502 : Fail to order recommend.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 502,
>               msg : "Fail to order recommend"
>           }
>   - case 503 : Fail to make recommend.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 503,
>               msg : "Fail to make recommend"
>           }
>   - case 504 : Fail to delete recommend.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 504,
>               msg : "Fail to delete recommend"
>           }
>   - case 505 : Recommend Data already exists in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 505,
>               msg : "Already recommended"
>           }
>   - case 506 : No recommend Data exists in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 506,
>               msg : "No recommend Data exists"
>           }
>   - case 601 : Fail to save image in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 601,
>               msg : "Fail to save image"
>           }
>   - case 602 : Fail to delete image in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 602,
>               msg : "Fail to delete image"
>           }
>   - case 603 : Fail to show image in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 603,
>               msg : "Fail to show image"
>           }
>   - case 604 : Fail to edit image in DB.
>       - RESPONSE
>           - BODY(JSON)
>           {
>               result : false,
>               errType : 604,
>               msg : "Fail to edit image"
>           }
>   ```
>
>