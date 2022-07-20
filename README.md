# Project-1-
Project 1 - 1 V 1 bomberman style game Design plan rough

Goals Requirements
2 player inputs
player class with methods for movement, bomb dropping, 

game object for controlling menus, timers, score and the like.

map made using tilemap in canvas from array layouts.


Requirements

Plan
0.Grabbed basic starter assets. √
1. learn about canvas and tilemap making√
2. set up html css basics with canvas on screen√
3. set up layout of a basic map and have it be drawn by canvas√
4. set up player character drawn and move around grid√
5.  spawn bomb√
6. timer for one space explosion√
7. direction blasts like bomberman√
8. player death on bomb√
9 2nd player
10. start screen. followed by the other screens if possible(worst case have the game rock a splash screen with everything)
11. set up collision detection and actual sprite movement rather than grip space moving.
12.

Observations
canvas appears to layer from first declared on bottom and later declared on top.
drawing images onto canvas needs delay so images load before drawing. won't work if it tries to run before the image loads. PRELOAD using link keyword






for movment initial
2nd canvas over top of the first. player sprite on that. map canvas stays untouched currently



accomplished
grid map from tileset
player 1 movement






//resources
https://opengameart.org/content/bomb-party-the-second-expansion
game sprite sheet 16x16 7 high 15 wide


TO DO when back.

note will need player to set current position to be a 0 so other players cant enter there. also bombs whihc will reset to 2 on explosion.

drawing is done by one function. logic by another.

bomb is a class player makes a new instance of that class. so each bomb can count it stuff like x,y and timers.DONE

bombs get placed to array. then loop through the array. DONE


OKAY bombs draw now. need to put in update to map so it can't make more bombs there. DONE

also put in timer for count down. just a - every frame until doomsday