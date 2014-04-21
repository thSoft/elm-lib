Elm.StampTogether = Elm.StampTogether || {};
Elm.StampTogether.make = function (_elm)
                         {
                           "use strict";
                           _elm.StampTogether = _elm.StampTogether || {};
                           if (_elm.StampTogether.values)
                           return _elm.StampTogether.values;
                           var _N = Elm.Native,
                               _U = _N.Utils.make(_elm),
                               _L = _N.List.make(_elm),
                               _E = _N.Error.make(_elm),
                               _J = _N.JavaScript.make(_elm),
                               $moduleName = "StampTogether";
                           var Basics = Elm.Basics.make(_elm);
                           var Color = Elm.Color.make(_elm);
                           var Dict = Elm.Dict.make(_elm);
                           var Graphics = Graphics || {};
                           Graphics.Collage = Elm.Graphics.Collage.make(_elm);
                           var Graphics = Graphics || {};
                           Graphics.Element = Elm.Graphics.Element.make(_elm);
                           var Graphics = Graphics || {};
                           Graphics.Input = Elm.Graphics.Input.make(_elm);
                           var Http = Elm.Http.make(_elm);
                           var JavaScript = Elm.JavaScript.make(_elm);
                           var JavaScript = JavaScript || {};
                           JavaScript.Experimental = Elm.JavaScript.Experimental.make(_elm);
                           var Json = Elm.Json.make(_elm);
                           var List = Elm.List.make(_elm);
                           var Maybe = Elm.Maybe.make(_elm);
                           var Mouse = Elm.Mouse.make(_elm);
                           var Native = Native || {};
                           Native.Ports = Elm.Native.Ports.make(_elm);
                           var Signal = Elm.Signal.make(_elm);
                           var String = Elm.String.make(_elm);
                           var Text = Elm.Text.make(_elm);
                           var Time = Elm.Time.make(_elm);
                           var Util = Elm.Util.make(_elm);
                           var Window = Elm.Window.make(_elm);
                           var _op = {};
                           var clicks = Signal.sampleOn(Mouse.clicks)(Mouse.position);
                           var serialize = function (r)
                                           {
                                             return JavaScript.toString(Json.toJSString(" ")(Json.fromJSObject(JavaScript.Experimental.fromRecord(r))));
                                           };
                           var toRequestData = function (_v0)
                                               {
                                                 return function ()
                                                        {
                                                          switch (_v0.ctor)
                                                          {case
                                                           "_Tuple2" :
                                                             return serialize({_: {}, x: _v0._0, y: _v0._1});}
                                                          _E.Case($moduleName,
                                                                  "on line 37, column 26 to 53");
                                                        }();
                                               };
                           var firebaseRequest = F2(function (requestType,requestData)
                                                    {
                                                      return A4(Http.request,
                                                                requestType,
                                                                "https://thsoft.firebaseio-demo.com/thisiselmstamps.json",
                                                                requestData,
                                                                _J.toList([]));
                                                    });
                           var toRequest = function (click)
                                           {
                                             return function ()
                                                    {
                                                      switch (click.ctor)
                                                      {case
                                                       "_Tuple2" :
                                                         switch (click._0)
                                                         {case
                                                          0 :
                                                            switch (click._1)
                                                            {case
                                                             0 :
                                                               return A2(firebaseRequest,"get","");}
                                                            break;}
                                                         break;}
                                                      return A2(firebaseRequest,
                                                                "post",
                                                                toRequestData(click));
                                                    }();
                                           };
                           var requests = A2(Util._op["~>"],clicks,toRequest);
                           var sendRequests = Http.send(requests);
                           var scene = F2(function (_v7,locs)
                                          {
                                            return function ()
                                                   {
                                                     switch (_v7.ctor)
                                                     {case
                                                      "_Tuple2" :
                                                        return function ()
                                                               {
                                                                 var drawPentagon = function (_v11)
                                                                                    {
                                                                                      return function ()
                                                                                             {
                                                                                               return Graphics.Collage.rotate(_v11.x)(Graphics.Collage.move({ctor: "_Tuple2", _0: _v11.x - Basics.toFloat(_v7._0) / 2, _1: Basics.toFloat(_v7._1) / 2 - _v11.y})(Graphics.Collage.filled(A4(Color.hsva,
                                                                                                                                                                                                                                                                                            _v11.y,
                                                                                                                                                                                                                                                                                            1,
                                                                                                                                                                                                                                                                                            1,
                                                                                                                                                                                                                                                                                            0.7))(A2(Graphics.Collage.ngon,
                                                                                                                                                                                                                                                                                                     5,
                                                                                                                                                                                                                                                                                                     20))));
                                                                                             }();
                                                                                    };
                                                                 return A3(Graphics.Collage.collage,
                                                                           _v7._0,
                                                                           _v7._1,
                                                                           A2(List.map,
                                                                              drawPentagon,
                                                                              locs));
                                                               }();}
                                                     _E.Case($moduleName,"between lines 23 and 27");
                                                   }();
                                          });
                           var stamped = Native.Ports.portIn("stamped",
                                                             Native.Ports.incomingSignal(function (v)
                                                                                         {
                                                                                           return typeof v === "object" && "x" in v && "y" in v ? {_: {}, x: typeof v.x === "number" ? _J.toFloat(v.x) : _E.raise("invalid input, expecting JSNumber but got " + v.x), y: typeof v.y === "number" ? _J.toFloat(v.y) : _E.raise("invalid input, expecting JSNumber but got " + v.y)} : _E.raise("invalid input, expecting JSObject [\"x\",\"y\"] but got " + v);
                                                                                         }));
                           var stamps = A3(Signal.foldp,
                                           F2(function (x,y)
                                              {
                                                return {ctor: "::", _0: x, _1: y};
                                              }),
                                           _J.toList([]),
                                           stamped);
                           var main = A3(Signal.lift2,scene,Window.dimensions,stamps);
                           var Stamp = F2(function (a,b)
                                          {
                                            return {_: {}, x: a, y: b};
                                          });
                           _elm.StampTogether.values = {_op: _op, stamps: stamps, scene: scene, main: main, firebaseRequest: firebaseRequest, serialize: serialize, toRequestData: toRequestData, clicks: clicks, toRequest: toRequest, requests: requests, sendRequests: sendRequests, Stamp: Stamp};
                           return _elm.StampTogether.values;
                         };Elm.Util = Elm.Util || {};
Elm.Util.make = function (_elm)
                {
                  "use strict";
                  _elm.Util = _elm.Util || {};
                  if (_elm.Util.values)
                  return _elm.Util.values;
                  var _N = Elm.Native,
                      _U = _N.Utils.make(_elm),
                      _L = _N.List.make(_elm),
                      _E = _N.Error.make(_elm),
                      _J = _N.JavaScript.make(_elm),
                      $moduleName = "Util";
                  var Basics = Elm.Basics.make(_elm);
                  var Color = Elm.Color.make(_elm);
                  var Graphics = Graphics || {};
                  Graphics.Collage = Elm.Graphics.Collage.make(_elm);
                  var Graphics = Graphics || {};
                  Graphics.Element = Elm.Graphics.Element.make(_elm);
                  var List = Elm.List.make(_elm);
                  var Maybe = Elm.Maybe.make(_elm);
                  var Native = Native || {};
                  Native.Ports = Elm.Native.Ports.make(_elm);
                  var Signal = Elm.Signal.make(_elm);
                  var String = Elm.String.make(_elm);
                  var Text = Elm.Text.make(_elm);
                  var Time = Elm.Time.make(_elm);
                  var _op = {};
                  _op["<~~"] = F2(function (x,y)
                                  {
                                    return x(y);
                                  });
                  _op["~~>"] = Basics.flip(Signal.lift2);
                  _op["~>"] = Basics.flip(Signal.lift);
                  _elm.Util.values = {_op: _op};
                  return _elm.Util.values;
                };