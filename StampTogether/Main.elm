module StampTogether.Main where

import open Util
import Graphics.Input as Input
import JavaScript
import JavaScript.Experimental as JS
import Http
import Json
import Mouse
import open Maybe
import Dict
import Window

type Stamp = { x: Float, y: Float }

-- Outgoing

firebaseRequest requestType requestData = Http.request requestType "https://thsoft.firebaseio-demo.com/stamps.json" requestData []

serialize r = r |> JS.fromRecord |> Json.fromJSObject |> Json.toJSString " " |> JavaScript.toString

toRequestData (x, y) = { x = x, y = y } |> serialize

clicks = Mouse.position |> sampleOn Mouse.clicks

toRequest click = case click of
  (0, 0) -> firebaseRequest "get" ""
  _ -> firebaseRequest "post" (click |> toRequestData)

requests = clicks ~> toRequest

sendRequests = Http.send requests

-- Incoming

foreign import jsevent "stamped"
  (JS.fromRecord { x = 0, y = 0 })
  newStamps : Signal JavaScript.JSObject

process : JavaScript.JSObject -> Maybe Stamp
process object = case object |> Json.fromJSObject of 
  Json.Object dict -> case dict |> Dict.lookup "x" of
    Just (Json.Number x) -> case dict |> Dict.lookup "y" of
      Just (Json.Number y) -> Just { x = x, y = y }
      _ -> Nothing
    _ -> Nothing
  _ -> Nothing

stamps = (foldp (::) [] (newStamps ~> process)) ~> justs

scene (w,h) locs =
  let drawPentagon {x,y} =
          ngon 5 20 |> filled (hsva y 1 1 0.7)
                    |> move (x - toFloat w / 2, toFloat h / 2 - y)
                    |> rotate x
  in  collage w h (map drawPentagon locs)

main = lift2 scene Window.dimensions stamps