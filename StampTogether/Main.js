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
                               $moduleName = "StampTogether";
                           var Basics = Elm.Basics.make(_elm);
                           var Color = Elm.Color.make(_elm);
                           var Dict = Elm.Dict.make(_elm);
                           var Graphics = Graphics || {};
                           Graphics.Collage = Elm.Graphics.Collage.make(_elm);
                           var Graphics = Graphics || {};
                           Graphics.Element = Elm.Graphics.Element.make(_elm);
                           var Http = Elm.Http.make(_elm);
                           var Json = Elm.Json.make(_elm);
                           var List = Elm.List.make(_elm);
                           var Maybe = Elm.Maybe.make(_elm);
                           var Mouse = Elm.Mouse.make(_elm);
                           var Native = Native || {};
                           Native.Json = Elm.Native.Json.make(_elm);
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
                           var serialize = function (_v0)
                                           {
                                             return function ()
                                                    {
                                                      return Json.toString("")(Json.Object(A2(Dict.insert,
                                                                                              "y",
                                                                                              Json.Number(_v0.y))(A2(Dict.insert,
                                                                                                                     "x",
                                                                                                                     Json.Number(_v0.x))(Dict.empty))));
                                                    }();
                                           };
                           var toRequestData = function (_v2)
                                               {
                                                 return function ()
                                                        {
                                                          switch (_v2.ctor)
                                                          {case
                                                           "_Tuple2" :
                                                             return serialize({_: {}, x: _v2._0, y: _v2._1});}
                                                          _E.Case($moduleName,
                                                                  "on line 44, column 26 to 53");
                                                        }();
                                               };
                           var clock = A3(Signal.foldp,
                                          F2(function (x,y)
                                             {
                                               return x + y;
                                             }),
                                          0,
                                          Time.fps(30));
                           var trigger = Signal.dropRepeats(A2(Signal._op["<~"],
                                                               F2(function (x,y)
                                                                  {
                                                                    return _U.eq(x,y);
                                                                  })(0),
                                                               clock));
                           var firebaseUrl = "https://thsoft.firebaseio-demo.com/thisiselmstamps";
                           var hack = A2(Signal.sampleOn,
                                         trigger,
                                         Signal.constant(firebaseUrl));
                           var url = Native.Ports.portOut("url",
                                                          Native.Ports.outgoingSignal(function (v)
                                                                                      {
                                                                                        return v;
                                                                                      }),
                                                          hack);
                           var firebaseRequest = F2(function (requestType,requestData)
                                                    {
                                                      return A4(Http.request,
                                                                requestType,
                                                                _L.append(firebaseUrl,".json"),
                                                                requestData,
                                                                _L.fromArray([]));
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
                           var scene = F2(function (_v9,locs)
                                          {
                                            return function ()
                                                   {
                                                     switch (_v9.ctor)
                                                     {case
                                                      "_Tuple2" :
                                                        return function ()
                                                               {
                                                                 var drawPentagon = function (_v13)
                                                                                    {
                                                                                      return function ()
                                                                                             {
                                                                                               return Graphics.Collage.rotate(_v13.x)(Graphics.Collage.move({ctor: "_Tuple2", _0: _v13.x - Basics.toFloat(_v9._0) / 2, _1: Basics.toFloat(_v9._1) / 2 - _v13.y})(Graphics.Collage.filled(A4(Color.hsva,
                                                                                                                                                                                                                                                                                            _v13.y,
                                                                                                                                                                                                                                                                                            1,
                                                                                                                                                                                                                                                                                            1,
                                                                                                                                                                                                                                                                                            0.7))(A2(Graphics.Collage.ngon,
                                                                                                                                                                                                                                                                                                     5,
                                                                                                                                                                                                                                                                                                     20))));
                                                                                             }();
                                                                                    };
                                                                 return A3(Graphics.Collage.collage,
                                                                           _v9._0,
                                                                           _v9._1,
                                                                           A2(List.map,
                                                                              drawPentagon,
                                                                              locs));
                                                               }();}
                                                     _E.Case($moduleName,"between lines 20 and 24");
                                                   }();
                                          });
                           var stamped = Native.Ports.portIn("stamped",
                                                             Native.Ports.incomingSignal(function (v)
                                                                                         {
                                                                                           return typeof v === "object" && "x" in v && "y" in v ? {_: {}, x: typeof v.x === "number" ? v.x : _E.raise("invalid input, expecting JSNumber but got " + v.x), y: typeof v.y === "number" ? v.y : _E.raise("invalid input, expecting JSNumber but got " + v.y)} : _E.raise("invalid input, expecting JSObject [\"x\",\"y\"] but got " + v);
                                                                                         }));
                           var stamps = A3(Signal.foldp,
                                           F2(function (x,y)
                                              {
                                                return {ctor: "::", _0: x, _1: y};
                                              }),
                                           _L.fromArray([]),
                                           stamped);
                           var main = A3(Signal.lift2,scene,Window.dimensions,stamps);
                           var Stamp = F2(function (a,b)
                                          {
                                            return {_: {}, x: a, y: b};
                                          });
                           _elm.StampTogether.values = {_op: _op, stamps: stamps, scene: scene, main: main, firebaseUrl: firebaseUrl, clock: clock, trigger: trigger, hack: hack, firebaseRequest: firebaseRequest, serialize: serialize, toRequestData: toRequestData, clicks: clicks, toRequest: toRequest, requests: requests, sendRequests: sendRequests, Stamp: Stamp};
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
                  Native.Json = Elm.Native.Json.make(_elm);
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