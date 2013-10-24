module Util where

(~>) = flip lift
infixl 4 ~>

(~~>) = flip lift2

(<~~) = (<|)