Elm.Chat = Elm.Chat || {};
Elm.Chat.make = function (elm)
                {
                  elm.Chat = elm.Chat || {};
                  if (elm.Chat.values)
                  return elm.Chat.values;
                  var N = Elm.Native,
                      _N = N.Utils.make(elm),
                      _L = N.List.make(elm),
                      _E = N.Error.make(elm),
                      _J = N.JavaScript.make(elm),
                      $moduleName = "Chat";
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
                  var Util = Elm.Util.make(elm);
                  var Graphics = Graphics || {};
                  Graphics.Input = Elm.Graphics.Input.make(elm);
                  var JavaScript = Elm.JavaScript.make(elm);
                  var Http = Elm.Http.make(elm);
                  var Json = Elm.Json.make(elm);
                  var messageArrived = Signal.constant(JavaScript.fromString("Loading..."));
                  document.addEventListener("messageArrived_" + elm.id,
                                            function (e)
                                            {
                                              elm.notify(messageArrived.id,e.value);
                                            });
                  var _op = {};
                  var messageArrived = Signal.constant(JavaScript.fromString("Loading..."));
                  var firebaseRequest = F2(function (requestType,requestData)
                                           {
                                             return A4(Http.request,
                                                       requestType,
                                                       "https://samplechat.firebaseio-demo.com/message_list.json",
                                                       requestData,
                                                       _J.toList([]));
                                           });
                  var toRequest = function (message)
                                  {
                                    return function ()
                                           {
                                             switch (message)
                                             {case
                                              "" :
                                                return A2(firebaseRequest,"get",message);}
                                             return A2(firebaseRequest,
                                                       "post",
                                                       _L.append("\"",_L.append(message,"\"")));
                                           }();
                                  };
                  var addNewMessage = F2(function (newMessage,messages)
                                         {
                                           return _L.append(messages,
                                                            _J.toList([Text.asText(JavaScript.toString(newMessage))]));
                                         });
                  var incomingMessages = A3(Signal.foldp,
                                            addNewMessage,
                                            _J.toList([]),
                                            messageArrived);
                  var incoming = A2(Util._op["~>"],
                                    incomingMessages,
                                    Graphics.Element.flow(Graphics.Element.down));
                  var $ = Graphics.Input.field("Your message"),
                      field = $._0,
                      message = $._1;
                  var $ = Graphics.Input.button("Send"),button = $._0,send = $._1;
                  var messageToSend = Signal.sampleOn(send)(message);
                  var requests = A2(Util._op["~>"],messageToSend,toRequest);
                  var sendRequests = Http.send(requests);
                  var outgoing = A2(Util._op["<~~"],
                                    A2(Util._op["~~>"],field,Graphics.Element.beside),
                                    Signal.constant(button));
                  var main = A2(Util._op["<~~"],
                                A2(Util._op["~~>"],incoming,Graphics.Element.above),
                                outgoing);
                  elm.Chat.values = {_op: _op, firebaseRequest: firebaseRequest, addNewMessage: addNewMessage, incomingMessages: incomingMessages, incoming: incoming, field: field, message: message, button: button, send: send, messageToSend: messageToSend, toRequest: toRequest, requests: requests, sendRequests: sendRequests, outgoing: outgoing, main: main};
                  return elm.Chat.values;
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