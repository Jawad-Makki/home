
arrowOne = document.getElementById("arrow-one");
arrowTwo = document.getElementById("arrow-two");
arrowThree = document.getElementById("arrow-three");
arrowFour = document.getElementById("arrow-four");

clawContainer = document.getElementById("claw-container");
eggContainer = document.getElementById("egg-container");
chairContainer = document.getElementById("chair-container");

isRightOne = true;
isRightTwo = true;

function switchProjectOne () {

    if (isRightOne) {
        setTimeout( () => {
            arrowOne.innerHTML = "<i class='fas fa-angle-left' aria-hidden='true'></i>";
        }, 350);
    
        arrowOne.style.left = "95%"
        arrowOne.style.animation = "arrow-move-left 1.25s ease 0.1s 1 normal forwards";
        clawContainer.style.left = "0"
        clawContainer.style.animation = "project-leave-left 1.25s ease 0.1s 1 normal forwards";
    
        setTimeout( () => {
            clawContainer.style.display = "none";
            chairContainer.style.left = "200%";
            chairContainer.style.display = "flex";
            chairContainer.style.animation = "project-enter-right 1.25s ease 0.1s 1 normal forwards";
            arrowTwo.style.animation = "arrow-enter-right 1.25s ease 0.1s 1 normal forwards";
        }, 400);

        isRightOne = false;
    }

    else {
        setTimeout( () => {
            arrowOne.innerHTML = "<i class='fas fa-angle-right' aria-hidden='true'></i>";
        }, 350);
    
        arrowTwo.style.left = "95%";
        arrowTwo.style.animation = "arrow-leave-right 1.25s ease 0.1s 1 normal forwards";
        chairContainer.style.left = "0";
        chairContainer.style.animation = "project-leave-right 1.25s ease 0.1s 1 normal forwards";
        
        arrowOne.style.left = "12%"
        arrowOne.style.animation = "arrow-move-right 1.25s ease 0.1s 1 normal forwards";
        
        setTimeout( () => {
            chairContainer.style.display = "none";
            clawContainer.style.display = "flex";
            clawContainer.style.left = "-100%"
            clawContainer.style.animation = "project-enter-left 1.25s ease 0.1s 1 normal forwards";
        }, 400);
    
        isRightOne = true;
    }
}

function switchProjectTwo () {

    if (isRightTwo) {
        setTimeout( () => {
            arrowTwo.innerHTML = "<i class='fas fa-angle-left' aria-hidden='true'></i>";
        }, 350);
    
        arrowOne.style.left = "12%"
        arrowOne.style.animation = "arrow-leave-left 1.25s ease 0.1s 1 normal forwards";
        arrowOne.style.left = "-100%"
    
        chairContainer.style.left = "0";
        chairContainer.style.animation = "project-leave-left 1.25s ease 0.1s 1 normal forwards";
        
        arrowTwo.style.left = "95%"
        arrowTwo.style.animation = "arrow-move-left 1.25s ease 0.1s 1 normal forwards";

        setTimeout( () => {
            chairContainer.style.display = "none";
            eggContainer.style.display = "flex";
            eggContainer.style.left = "200%"
            eggContainer.style.animation = "project-enter-right 1.25s ease 0.1s 1 normal forwards";
        }, 400);
    
        isRightTwo = false;
    }

    else {
        setTimeout( () => {
            arrowTwo.innerHTML = "<i class='fas fa-angle-right' aria-hidden='true'></i>";
        }, 350);
    
        eggContainer.style.animation = "project-leave-right 1.25s ease 0.1s 1 normal forwards";
        arrowTwo.style.left = "12%";
        arrowTwo.style.animation = "arrow-move-right 1.25s ease 0.1s 1 normal forwards";
        
        setTimeout( () => {
            eggContainer.style.display = "none";
            chairContainer.style.left = "-100%"
            chairContainer.style.display = "flex";
            chairContainer.style.animation = "project-enter-left 1.25s ease 0.1s 1 normal forwards";
            arrowOne.style.animation = "arrow-enter-left 1.25s ease 0.1s 1 normal forwards";
        }, 400);
    

        isRightTwo = true;
    }
}