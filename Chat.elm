module Chat where

import open Util
import Graphics.Input as Input
import JavaScript
import JavaScript.Experimental as JS
import Http
import Json

-- Firebase

foreign import jsevent "dataChanged"
  (JavaScript.fromString "Loading...")
  dataChanges : Signal JavaScript.JSString

firebaseRequest requestType requestData = Http.request requestType "https://samplechat.firebaseio-demo.com/message_list.json" requestData []

-- Chat

addNewMessage newMessage messages = messages ++ [newMessage |> JavaScript.toString |> asText]
incomingMessages = foldp addNewMessage [] dataChanges
incoming = incomingMessages ~> flow down
 
(field, message) = Input.field "Your message"
(button, send) = Input.button "Send"

messageToSend = message |> sampleOn send 
toRequestData message = { text=message } |> JS.fromRecord |> Json.fromJSObject |> Json.toString " "
toRequest message = case message of 
 "" -> firebaseRequest "get" message
 _ -> firebaseRequest "post" ("\"" ++ message ++ "\"")
requests = messageToSend ~> toRequest
sendRequests = Http.send requests

outgoing = field ~~> beside <~~ constant button

main = incoming ~~> above <~~ outgoing