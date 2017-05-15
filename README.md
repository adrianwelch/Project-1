# Project-1

# Penalty Clickout

###GA WDI London - Project 1

[Play it here!](https://safe-harbor-23330.herokuapp.com/)


![alt text][logo]

[logo]: http://i.imgur.com/FmwEhGQ.png "Logo Title Text 2"

###Rules

1. Click on as many of the correct targets as you can before the next target is generated.
2. If the colourful circular target is clicked you score one point. 
3. If the red cross or anything else is clicked, this counts as a miss and you will lose 1 life.
4. After 5 points scored the targets appear faster. After 10 even faster and after 15 will be at a maximum speed. 
5. You have 5 lives and 30 seconds until gameover!

### Approach / How it works

When the option of 2 targets appear, if the user clicks on a target, a function will check whether the target that has been clicked has the class 'active' (colourful circular target)  or 'Wrong Target' (red cross. If the target clicked on has 'active', the score goes up by one and is updated immediately. if anywhere else on the goal is clicked and does not have the class 'active', a life will go down. 

Targets are appeared based on the function that generates a two random numbers from 0-14, storing it in two variables and adding the class 'active' or 'wrongTarget'. There is then a delay which allows the user to react and click on the targets before removing the classes from the game and restarting the function to generate the next targets. After every 5 correct targets hit, the delay is shorter making it more difficult to react to the targets.

There are sounds that are triggered upon:

1. Start of Game
2. Starting the gameplay
3. Game Over


### The build

* HTML 5, CSS and jQuery were used to create this game. 
* Animation was created using the Animate.css stylesheet. 
* The Google Web Font 'Copperplate' has been used to style the game.


### Problems & Challenges

The main challenge I faced building this game, was making the targets appear correctly and not reappear after clicking multple times. During gameplay, If i clicked more than once after i clicked the target and before the delay was over for the next target to appear, more random targets would appear generating multiples of that function. Fortunately a solution was found. 


I also had a problem with my animation of the ball to animate to the poisition of the target clicked on. This is because my css was effecting it. I had to change the whole approach of my css using %'s rather than specific pixels and create a div around the goal, image and ball for the animation to work.






