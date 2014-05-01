module StampTogether where

import Util (..)
import Http
import JavaScript as JS
import JavaScript.Experimental as JEXP
import Mouse
import Dict
import Window

type Stamp = { x: Float, y: Float }

-- Incoming

port stamped : Signal { x: Float, y: Float }

stamps : Signal [Stamp]
stamps = foldp (::) [] stamped

scene (w,h) locs =
  let drawPentagon {x,y} =
          ngon 5 20 |> filled (hsva y 1 1 0.7)
                    |> move (x - toFloat w / 2, toFloat h / 2 - y)
                    |> rotate x
  in  collage w h (map drawPentagon locs)

main = lift2 scene Window.dimensions stamps

-- Outgoing

firebaseUrl = "https://thsoft.firebaseio-demo.com/thisiselmstamps"

clock = foldp (+) 0 (fps 30)
trigger = ((==) 0) <~ clock |> dropRepeats
hack = sampleOn trigger (constant firebaseUrl)

port url : Signal String
port url = hack

firebaseRequest requestType requestData = Http.request requestType (firebaseUrl ++ ".json") requestData []

serialize r = r |> JEXP.fromRecord |> Json.fromJSObject |> Json.toJSString " " |> JS.toString

toRequestData (x, y) = { x = x, y = y } |> serialize

clicks = Mouse.position |> sampleOn Mouse.clicks

toRequest click = case click of
  (0, 0) -> firebaseRequest "get" ""
  _ -> firebaseRequest "post" (click |> toRequestData)

requests = clicks ~> toRequest

sendRequests = Http.send requests
