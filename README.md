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
9 2nd player√
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
Sprite sheet
https://opengameart.org/content/bomb-party-the-second-expansion

Bomb sound effect
https://audiosoundclips.com/8-bit-explosion-blast-sound-effects-sfx/



TO DO when back.

Need to make a game state tracker. swaps from start menu to level select to game mode. just use canvas to do a simple mock up. if in map select and hit enter disable controls kill select and start game tick. 

also add in a pop up for player death.

find game music
add in match timer for force combat

use string interpolation for game timer and for menu option toggles.


initial canvas shows start screen. canvas with 3 options
-start
-help
-maybe option- only option currently is sound

help clears canvas and does a function to draw basic instructions

start
pops to the game screen. map is drawn but not players.
press right and left to cycle through layouts. press enter to start game tick and spawn players.

on death pop up a box that says x player died. press enter to restart or something to choose a new map Maybe on choose new map.
