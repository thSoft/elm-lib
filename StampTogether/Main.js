Elm.StampTogether = Elm.StampTogether || {};
Elm.StampTogether.Main = Elm.StampTogether.Main || {};
Elm.StampTogether.Main.make = function (elm)
                              {
                                elm.StampTogether = elm.StampTogether || {};
                                elm.StampTogether.Main = elm.StampTogether.Main || {};
                                if (elm.StampTogether.Main.values)
                                return elm.StampTogether.Main.values;
                                var N = Elm.Native,
                                    _N = N.Utils.make(elm),
                                    _L = N.List.make(elm),
                                    _E = N.Error.make(elm),
                                    _J = N.JavaScript.make(elm),
                                    $moduleName = "StampTogether.Main";
                                var Text = Elm.Text.make(elm);
                                var Text = Elm.Text.make(elm);
                                var Basics = Elm.Basics.make(elm);
                                var Signal = Elm.Signal.make(elm);
                                var List = Elm.List.make(elm);
                                var Time = Elm.Time.make(elm);
                                var Prelude = Elm.Prelude.make(elm);
                                var Graphics = Graphics || {};
                                Graphics.Element = Elm.Graphics.Element.make(elm);
                                var Color = Elm.Color.make(elm);
                                var Graphics = Graphics || {};
                                Graphics.Collage = Elm.Graphics.Collage.make(elm);
                                var Util = Elm.Util.make(elm);
                                var Graphics = Graphics || {};
                                Graphics.Input = Elm.Graphics.Input.make(elm);
                                var JavaScript = Elm.JavaScript.make(elm);
                                var JavaScript = JavaScript || {};
                                JavaScript.Experimental = Elm.JavaScript.Experimental.make(elm);
                                var Http = Elm.Http.make(elm);
                                var Json = Elm.Json.make(elm);
                                var Mouse = Elm.Mouse.make(elm);
                                var Maybe = Elm.Maybe.make(elm);
                                var Dict = Elm.Dict.make(elm);
                                var Window = Elm.Window.make(elm);
                                var newStamps = Signal.constant(JavaScript.Experimental.fromRecord({_: {}, x: 0, y: 0}));
                                document.addEventListener("stamped_" + elm.id,
                                                          function (e)
                                                          {
                                                            elm.notify(newStamps.id,e.value);
                                                          });
                                var _op = {};
                                var serialize = function (r)
                                                {
                                                  return JavaScript.toString(Json.toJSString(" ")(Json.fromJSObject(JavaScript.Experimental.fromRecord(r))));
                                                };
                                var toRequestData = function (arg0)
                                                    {
                                                      return function ()
                                                             {
                                                               switch (arg0.ctor)
                                                               {case
                                                                "_Tuple2" :
                                                                  return serialize({_: {}, x: arg0._0, y: arg0._1});}
                                                               _E.Case($moduleName,
                                                                       "on line 22, column 26 to 53");
                                                             }();
                                                    };
                                var scene = F2(function (arg1,locs)
                                               {
                                                 return function ()
                                                        {
                                                          switch (arg1.ctor)
                                                          {case
                                                           "_Tuple2" :
                                                             return function ()
                                                                    {
                                                                      var drawPentagon = function (arg0)
                                                                                         {
                                                                                           return function ()
                                                                                                  {
                                                                                                    return Graphics.Collage.rotate(arg0.x)(Graphics.Collage.move({ctor: "_Tuple2", _0: arg0.x - Basics.toFloat(arg1._0) / 2, _1: Basics.toFloat(arg1._1) / 2 - arg0.y})(Graphics.Collage.filled(A4(Color.hsva,
                                                                                                                                                                                                                                                                                                   arg0.y,
                                                                                                                                                                                                                                                                                                   1,
                                                                                                                                                                                                                                                                                                   1,
                                                                                                                                                                                                                                                                                                   0.7))(A2(Graphics.Collage.ngon,
                                                                                                                                                                                                                                                                                                            5,
                                                                                                                                                                                                                                                                                                            20))));
                                                                                                  }();
                                                                                         };
                                                                      return A3(Graphics.Collage.collage,
                                                                                arg1._0,
                                                                                arg1._1,
                                                                                A2(List.map,
                                                                                   drawPentagon,
                                                                                   locs));
                                                                    }();}
                                                          _E.Case($moduleName,
                                                                  "between lines 52 and 56");
                                                        }();
                                               });
                                var process = function (object)
                                              {
                                                return function ()
                                                       {
                                                         var _case7 = Json.fromJSObject(object);
                                                         switch (_case7.ctor)
                                                         {case
                                                          "Object" :
                                                            return function ()
                                                                   {
                                                                     var _case9 = Dict.lookup("x")(_case7._0);
                                                                     switch (_case9.ctor)
                                                                     {case
                                                                      "Just" :
                                                                        switch (_case9._0.ctor)
                                                                        {case
                                                                         "Number" :
                                                                           return function ()
                                                                                  {
                                                                                    var _case12 = Dict.lookup("y")(_case7._0);
                                                                                    switch (_case12.ctor)
                                                                                    {case
                                                                                     "Just" :
                                                                                       switch (_case12._0.ctor)
                                                                                       {case
                                                                                        "Number" :
                                                                                          return Maybe.Just({_: {}, x: _case9._0._0, y: _case12._0._0});}
                                                                                       break;}
                                                                                    return Maybe.Nothing;
                                                                                  }();}
                                                                        break;}
                                                                     return Maybe.Nothing;
                                                                   }();}
                                                         return Maybe.Nothing;
                                                       }();
                                              };
                                var newStamps = Signal.constant(JavaScript.Experimental.fromRecord({_: {}, x: 0, y: 0}));
                                var stamps = A2(Util._op["~>"],
                                                A3(Signal.foldp,
                                                   F2(function (x,y)
                                                      {
                                                        return {ctor: "::", _0: x, _1: y};
                                                      }),
                                                   _J.toList([]),
                                                   A2(Util._op["~>"],newStamps,process)),
                                                Maybe.justs);
                                var main = A3(Signal.lift2,scene,Window.dimensions,stamps);
                                var firebaseRequest = F2(function (requestType,requestData)
                                                         {
                                                           return A4(Http.request,
                                                                     requestType,
                                                                     "https://thsoft.firebaseio-demo.com/stamps.json",
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
                                                                    return A2(firebaseRequest,
                                                                              "get",
                                                                              "");}
                                                                 break;}
                                                              break;}
                                                           return A2(firebaseRequest,
                                                                     "post",
                                                                     toRequestData(click));
                                                         }();
                                                };
                                var clicks = Signal.sampleOn(Mouse.clicks)(Mouse.position);
                                var requests = A2(Util._op["~>"],clicks,toRequest);
                                var sendRequests = Http.send(requests);
                                var Stamp = F2(function (a,b)
                                               {
                                                 return {_: {}, x: a, y: b};
                                               });
                                elm.StampTogether.Main.values = {_op: _op, firebaseRequest: firebaseRequest, serialize: serialize, toRequestData: toRequestData, clicks: clicks, toRequest: toRequest, requests: requests, sendRequests: sendRequests, process: process, stamps: stamps, scene: scene, main: main, Stamp: Stamp};
                                return elm.StampTogether.Main.values;
                              };Elm.Util = Elm.Util || {};
Elm.Util.make = function (elm)
                {
                  elm.Util = elm.Util || {};
                  if (elm.Util.values)
                  return elm.Util.values;
                  var N = Elm.Native,
                      _N = N.Utils.make(elm),
                      _L = N.List.make(elm),
                      _E = N.Error.make(elm),
                      _J = N.JavaScript.make(elm),
                      $moduleName = "Util";
                  var Text = Elm.Text.make(elm);
                  var Text = Elm.Text.make(elm);
                  var Basics = Elm.Basics.make(elm);
                  var Signal = Elm.Signal.make(elm);
                  var List = Elm.List.make(elm);
                  var Maybe = Elm.Maybe.make(elm);
                  var Time = Elm.Time.make(elm);
                  var Prelude = Elm.Prelude.make(elm);
                  var Graphics = Graphics || {};
                  Graphics.Element = Elm.Graphics.Element.make(elm);
                  var Color = Elm.Color.make(elm);
                  var Graphics = Graphics || {};
                  Graphics.Collage = Elm.Graphics.Collage.make(elm);
                  var _op = {};
                  _op["~~>"] = Basics.flip(Signal.lift2);
                  _op["~>"] = Basics.flip(Signal.lift);
                  _op["<~~"] = F2(function (x,y)
                                  {
                                    return x(y);
                                  });
                  elm.Util.values = {_op: _op};
                  return elm.Util.values;
                };