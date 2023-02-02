
if (window.innerWidth >= 990) {
    higherThan990px();
} else if(window.innerWidth <= 350) {
    lowerThan350px();
};


window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 990px)").matches) {
        higherThan990px();
        higherThan350px();
    } else if (window.matchMedia("(max-width: 350px)").matches) {
        lowerThan350px();
        lowerThan990px();
    } else {
        lowerThan990px();
        higherThan350px();
    }
});



function higherThan990px() {
    //to move div for 990px or higher
    var divToMove = document.querySelectorAll(".main-info");
    var targetDiv = document.querySelectorAll(".main-heading");
    
    for (let i = 0; i < divToMove.length; i++) {
        targetDiv[i].appendChild(divToMove[i]);    
    };

    //increase fa-icons to 3x
    var featuresImg = document.querySelectorAll(".features-img i");

    for (let i = 0; i < featuresImg.length; i++) {
        const element = featuresImg[i];

        element.classList.replace("fa-2x", "fa-3x");
    };
};



function lowerThan990px() {
    //to move div for lower than 990px
    var divToMove = document.querySelectorAll(".main-info");
    var targetDiv = document.querySelectorAll(".main-item");

    for (let i = 0; i < divToMove.length; i++) {
        targetDiv[i].appendChild(divToMove[i]);    
    };

    
    //increase fa-icons to 3x
    var featuresImg = document.querySelectorAll(".features-img i");

    for (let i = 0; i < featuresImg.length; i++) {
        const element = featuresImg[i];

        element.classList.replace("fa-3x", "fa-2x");
    };


};

function lowerThan350px() {
    var mainImg = document.querySelectorAll(".main-img-div");
    var mainHeading = document.querySelectorAll(".main-heading");

    for (let i = 0; i < mainImg.length; i++) {
        mainImg[i].classList.remove("col-8", "col-lg-7");
        mainHeading[i].classList.remove("col-4", "col-lg-5");            
    }

}

function higherThan350px() {
    var mainImg = document.querySelectorAll(".main-img-div");
    var mainHeading = document.querySelectorAll(".main-heading");

    for (let i = 0; i < mainImg.length; i++) {
        mainImg[i].classList.add("col-8", "col-lg-7");
        mainHeading[i].classList.add("col-4", "col-lg-5");            
    }
}



