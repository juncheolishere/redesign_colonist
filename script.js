const mainMenu = document.getElementById("mainMenu");
const openMenu = () => {
    mainMenu.style.height = "calc(80%)";
    document.body.style.overflowY = "hidden";
    mainMenu.style.overflowY = "auto";
    mainMenu.addEventListener("click",closeMenu,{once:true});
}
const closeMenu = () => {
    mainMenu.style.height = "calc(10px)";
    document.body.style.overflowY = "visible";
    mainMenu.style.overflowY = "hidden";
    mainMenu.addEventListener("click", openMenu, {once:true});
}

mainMenu.addEventListener("click", openMenu, {once:true});

const prevBtn = (obj) => {
    
    const frame =  obj.parentNode.parentNode.parentNode.children[2];
    const fStyle = getComputedStyle(frame);

    const moving = frame.children[0];
    const mStyle = getComputedStyle(moving);

    const unit = moving.children[0];
    const uStyle = getComputedStyle(unit);

    const frameWidth = fStyle.width.split("p")[0];
    const sumWidth = parseInt(mStyle.width.split("p")[0]);
    const unitWidth = parseInt(uStyle.width.split("p")[0]) + parseInt(uStyle.marginRight.split("p")[0]);
    const posX = parseInt(mStyle.transform.split(",")[4]);
    const childrenCnt = moving.children.length;
    
    const depth = unitWidth * (-(posX/unitWidth)+1);
    if (posX+unitWidth >= 0)
    {
        moving.style.transform = "translateX(0px)";
    }
    else
    {
        moving.style.transform = "translateX("+(posX+unitWidth)+"px)";
    }
}
const nextBtn = (obj) => {
    
    const frame =  obj.parentNode.parentNode.parentNode.children[2];
    const fStyle = getComputedStyle(frame);

    const moving = frame.children[0];
    const mStyle = getComputedStyle(moving);

    const unit = moving.children[0];
    const uStyle = getComputedStyle(unit);

    const frameWidth = parseFloat(fStyle.width.split("p")[0]);
    const sumWidth = parseInt(mStyle.width.split("p")[0]);
    const unitWidth = parseInt(uStyle.width.split("p")[0]) + parseInt(uStyle.marginRight.split("p")[0]);
    const posX = parseInt(mStyle.transform.split(",")[4]);
    const childrenCnt = moving.children.length;
    
    const depth = unitWidth * (-(posX/unitWidth)+1);
    if (sumWidth - depth < frameWidth)
    {
        const depth2 = sumWidth - frameWidth;
        moving.style.transform = "translateX("+(-depth2)+"px)";
        if (frameWidth >= sumWidth)
        {
            moving.style.transform = "translateX(0px)";
        }
    }
    else
    {
        moving.style.transform = "translateX("+(posX-unitWidth)+"px)";
    }
    
}



// init controller
let controller = new ScrollMagic.Controller();
const trigger1 = document.getElementById("trigger1");

const tHeight = parseInt(getComputedStyle(trigger1).height.split("p")[0]);
console.log(tHeight)


// build scene
let scene = new ScrollMagic.Scene({triggerElement: trigger1, duration: tHeight+"px"})
                .addTo(controller)
                .addIndicators() // add indicators (requires plugin)
                .on("progress", function (e) {
                    const main1 = document.getElementById("main1");
                    const main2 = document.getElementById("main2");
                    main1.style.left = "calc("+(100-e.progress.toFixed(3)*100)+"%)";
                    main2.style.right = "calc("+(100-e.progress.toFixed(3)*100)+"%)";
                });