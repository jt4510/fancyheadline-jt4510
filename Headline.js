/*
 * File: Headline.js
 * -----------------
 * This program displays the text of the string MESSAGE on the screen in an animated way that moves it across
 * the display from left-to-right.  When the message scrolls off the screen, it will automatically re-start.
 * The animation is started and stopped by a mouse click.  The font color will start with a random color and change
 * to a different color on each restart of the animation
 */

"use strict";

/* Constants */

const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 100;
const TIME_STEP = 20;
const DELTA_X = -2;
const MESSAGE = "Coding with Javascript is cool";
const HEADLINE_FONT_FAMILY = "'Arial'";
const HEADLINE_FONT_SIZE = "90";
const ERROR_FONT_FAMILY = "'Arial'";
const ERROR_FONT_SIZE = "15";


/*
 * Defines the entire program.  Variables declared inside Headline
 * function are accessible to every function defined within it.
 */

function Headline() {
    let gw = GWindow(GWINDOW_WIDTH, GWINDOW_HEIGHT);
    let timer = undefined;
    let headlineMessage = GLabel();

    if (validateInput()) {
        headlineMessage = GLabel(MESSAGE.toUpperCase());
        headlineMessage.setFont(HEADLINE_FONT_SIZE + "px " + HEADLINE_FONT_FAMILY);
        gw.add(headlineMessage, gw.getWidth(), (gw.getHeight() + headlineMessage.getAscent()) / 2);
        gw.addEventListener("click", startStopAnimation);
    }

    /* This function is called each time the interval timer ticks to update the animation */
    function timerTicked() {
        headlineMessage.move(DELTA_X, 0);
        if (headlineMessage.getX() <= -headlineMessage.getWidth()) {
            headlineMessage.move(headlineMessage.getWidth() + gw.getWidth(), 0);
        }
    }

    /*
     * This function is called when the user clicks on the window.  It starts or stops the animation and changes
     * the font color
     */
    function startStopAnimation() {
        if (!timer) {
            headlineMessage.setColor(randomColor());
            timer = setInterval(timerTicked, TIME_STEP);
        } else {
            clearInterval(timer);
            timer = undefined;
        }
    }

    /*
     * This function checks that the message to be displayed is between 20 and 30 characters long
     * If not, it displays an appropriate message in the graphics window
     */
    function validateInput() {
        if (MESSAGE.length >= 20 && MESSAGE.length <= 30) {
            return true;
        } else if (MESSAGE.length < 20) {
            reportError("short");
            return false;
        } else if (MESSAGE.length > 30) {
            reportError("long");
            return false;
        }
    }

    /*
     * This function is called by validateInput() and will display the error that is detected.
     */
    function reportError(type) {
        let error = "Message is too " + type + ".";
        let errorMessage = GLabel(error.toUpperCase());
        errorMessage.setFont(ERROR_FONT_SIZE + "px " + ERROR_FONT_FAMILY);
        gw.add(errorMessage, (gw.getWidth() - errorMessage.getWidth()) / 2, (gw.getHeight() + errorMessage.getAscent()) / 2);
    }
}
