

# MASTERMIND!

_**Mastermind**_ is traditionally a  two-player game from the 1970's that is an off-shoot of the original pencil and paper based game called **"Cows and Bulls"** The modern version uses a playing board and colored pegs for the player to attempt a code with grayscale pegs for the code setter to respond with feedback.

My html based design allows the user to choose the color of their choice, place it in the code slot of their choice and then submit their code when ready. The computer will then respond accordingly with feedback pegs and/or a win/lose scenario.

## WIREFRAME

    Rough draft of html / css layout for game:

<img src="https://i.imgur.com/ElYKPFU.jpg" />


## _**Mastermind**_ Game Play:

#### **USER EXPERIENCE**:
1. Define / generate the 4 digit color code to be guessed
2. Player assigns 4 colored guesses and submits input by clicking “guess” button
3. Computer responds with black / grey pegs to represent correct colors / positions
4. Player takes another guess until
5. Player guesses correctly
6. Guesses will count down to "nuclear destruction"!
7. Number of saves update accordingly:
8. After win: play again? (Button appears) reset scores? (Button appears)


```
PSEUDOCODE:

1) Define CONSTANTS:
    - Color object for all colors (key:value)

2) Define STATE VARIABLES:
    - guess count / code attempts
    - feedback
    - hidden computer code
    - SAVES … added up with every win
    - loses

3) CACHE ELEMENTS:
    - SUBMIT BUTTON
    - PLAY AGAIN BUTTON
    - RESET BUTTON.    
    
4) INITIALIZE STATE VARIABLES:
    - GUESSES to 10 (countdown to a loss)
    - COLOR GUESS array to empty
    - COMP CODE to be guessed (random number generator)
    - SAVES to 0 (no wins yet)

5) RENDER state variables:
    - COLOR GUESSES to empty / white

6) GAMETIME:

6.1 obtain index of clicked slot by evt.target.id

 - each click will have to register a new color value.. once the set of colors is assigned, they can render that board and the board can be reset for the next set of colors.
    
6.2 user submits guess by clicking button.
    - color array submitted for comparison

6.3 computer checks guess

    a) iterate through same indices for comp / user to check accuracy of code
    b) add a point to feedback for each accurate code
    c) delete exact codes (splice)
    d) extract only unique codes left (no duplicates)
    e) array.includes comparison for correct colors
    f) add feedback for correct color / wrong position

- 6.4 feedback / response:
    - check for win ? checkWin() : reset();

- 6.5 ensure user cannot change color / re-click previous buttons once that turn is submitted.

- 6.6 reset: update the turn count / guess count, reset color array to empty, reset cmomputer code to be mutable (exact copy)

- 6.8 repeat

- 6.9 in event of win “congrats you averted nuclear disaster!”

7) PLAY AGAIN / RESET
- buttons to reset guesses and init() again, but save the “saves” score until they decide to leave or reset. Back to render() function.
```	



