    
    if (window.innerWidth >= 990) {
        higherThan990px();
    };
    
    
    window.addEventListener("resize", function () {
        if (window.matchMedia("(min-width: 990px)").matches) {
            higherThan990px();
        } else {
            lowerThan990px();
        }
    });

    
    function higherThan990px() {
        //FEatures page intro
        var divToMove2 = document.querySelector(".intro-img");
        var targetDiv2 = document.querySelector(".features-intro");
        targetDiv2.appendChild(divToMove2); 
    }

    function lowerThan990px() {
        var divToMove2 = document.querySelector(".intro-img");
        var targetDiv2 = document.querySelector(".features-intro");
        var firstChild = targetDiv2.firstChild
        targetDiv2.insertBefore(divToMove2, firstChild); 
    }
    
