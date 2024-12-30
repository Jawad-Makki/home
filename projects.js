
const arrows = document.getElementsByClassName("arrow");
const projectContainers = document.getElementsByClassName("project-container");
const progressCircles = document.getElementsByClassName("progress-circle");

const ARROW_LEFT = "10%";
const ARROW_RIGHT = "88%";
const CONTAINER_POSITION = "0";
const OFF_SCREEN_RIGHT = "200%";
const OFF_SCREEN_LEFT = "-200%";

const LEFT_ARROW = "<i class='fas fa-angle-left' aria-hidden='true'></i>";
const RIGHT_ARROW = "<i class='fas fa-angle-right' aria-hidden='true'></i>";

const SELECTED_CIRCLE_COLOR = "var(--selected-progress-circle)";
const UNSELECTED_CIRCLE_COLOR = "var(--progress-circles)";

const MOVE_ARROW_LEFT = "arrow-move-left 0.5s ease 0.1s 1 normal forwards";
const MOVE_ARROW_RIGHT = "arrow-move-right 0.5s ease 0.1s 1 normal forwards";
const ARROW_ENTER_LEFT = "arrow-enter-left 0.5s ease 0.1s 1 normal forwards";
const ARROW_ENTER_RIGHT = "arrow-enter-right 0.5s ease 0.1s 1 normal forwards";
const ARROW_LEAVE_LEFT = "arrow-leave-left 0.5s ease 0.1s 1 normal forwards";
const ARROW_LEAVE_RIGHT = "arrow-leave-right 0.5s ease 0.1s 1 normal forwards";

const PROJECT_ENTER_LEFT = "project-enter-left 0.5s ease 0.1s 1 normal forwards";
const PROJECT_ENTER_RIGHT = "project-enter-right 0.5s ease 0.1s 1 normal forwards";
const PROJECT_LEAVE_LEFT = "project-leave-left 0.5s ease 0.1s 1 normal forwards";
const PROJECT_LEAVE_RIGHT = "project-leave-right 0.5s ease 0.1s 1 normal forwards";

var movingRight = true;
var counter = 0;

function switchProject (event) {

    movingRight = event.target.outerHTML.includes("right");

    if (movingRight) {

        progressCircles[counter].style.background = UNSELECTED_CIRCLE_COLOR;
        progressCircles[counter + 1].style.background = SELECTED_CIRCLE_COLOR;

        setTimeout( () => {
            arrows[counter].innerHTML = LEFT_ARROW;
            projectContainers[counter].style.display = "none";
        }, 225);
        
        if (counter - 1 >= 0) {
            arrows[counter - 1].style.left = ARROW_LEFT;
            arrows[counter - 1].style.animation = ARROW_LEAVE_LEFT;
        }

        arrows[counter].style.left = ARROW_RIGHT;
        arrows[counter].style.animation = MOVE_ARROW_LEFT;

        projectContainers[counter].style.left = CONTAINER_POSITION;
        projectContainers[counter].style.animation = PROJECT_LEAVE_LEFT;
    
        setTimeout( () => {
            projectContainers[counter + 1].style.display = "flex";
            projectContainers[counter + 1].style.left = OFF_SCREEN_RIGHT;
            projectContainers[counter + 1].style.animation = PROJECT_ENTER_RIGHT;

            if (counter + 1 < arrows.length) {
                arrows[counter + 1].style.left = OFF_SCREEN_RIGHT;
                arrows[counter + 1].style.animation = ARROW_ENTER_RIGHT;
            }

            counter++;
        }, 230);

    }

    else {

        progressCircles[counter].style.background = UNSELECTED_CIRCLE_COLOR;
        progressCircles[counter - 1].style.background = SELECTED_CIRCLE_COLOR;

        setTimeout( () => {
            arrows[counter - 1].innerHTML = RIGHT_ARROW;
            projectContainers[counter].style.display = "none";
        }, 225);
    
        if (counter < arrows.length) {
            arrows[counter].style.left = ARROW_RIGHT;
            arrows[counter].style.animation = ARROW_LEAVE_RIGHT;
        }
        
        arrows[counter - 1].style.left = ARROW_LEFT;
        arrows[counter - 1].style.animation = MOVE_ARROW_RIGHT;

        projectContainers[counter].style.left =  CONTAINER_POSITION;
        projectContainers[counter].style.animation = PROJECT_LEAVE_RIGHT;
        
        setTimeout( () => {            
            projectContainers[counter - 1].style.display = "flex";
            projectContainers[counter - 1].style.left = OFF_SCREEN_LEFT;
            projectContainers[counter - 1].style.animation = PROJECT_ENTER_LEFT;
            
            if (counter - 2 >= 0) {
                arrows[counter - 2].style.left = OFF_SCREEN_LEFT;
                arrows[counter - 2].style.animation = ARROW_ENTER_LEFT;
            }

            counter--;
        }, 230);
    }

}