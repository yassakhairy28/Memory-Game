document.querySelector(".splash-screen button").onclick = function () {
    let name = prompt("Whats Your Name?")
    if (name === ""|| name === null) {
        document.querySelector(".container-info .name span").innerHTML = "Unknown"
    } else {
        document.querySelector(".container-info .name span").innerHTML = name
    }

    document.querySelector(".splash-screen").remove()
    time ()
}
let Blocks = document.querySelector(".game")
let duration = 1000;

let blocks = Array.from(document.querySelector(".game").children);

let orderRange = [...Array(blocks.length).keys()]

shuffel (orderRange)

blocks.forEach((block,index) => {
    block.style.order = orderRange[index]

    block.addEventListener("click", function () {
        rotateBlock (block)
    })
})

function shuffel (array) {
    let current = array.length,
    temp,
    random;

    while (current > 0) {

        random = Math.floor(Math.random() * current)

        current--

        temp = array[current];

        array[current] = array[random]

        array[random] = temp;
    }
    return array

}

function rotateBlock (block) {

    block.classList.add("rotate")

    let allRotateBlocks = blocks.filter(rotateBlock => rotateBlock.classList.contains("rotate"))

    checkBlock(allRotateBlocks[0],allRotateBlocks[1])

    if (allRotateBlocks.length == 2) {

        stopClick()
    }
}

function stopClick () {
    // add class no-clicking
    Blocks.classList.add("no-clicking")

    //remove class no-clicking
    setTimeout (() => {
        Blocks.classList.remove("no-clicking")
    }, duration)
}

function checkBlock(frist,second) {
    let tries = document.querySelector(".tries span");
    let correct = document.querySelector(".correct span");

    if (frist.dataset.tecnology == second.dataset.tecnology) {

        frist.classList.remove("rotate")
        second.classList.remove("rotate")

        frist.classList.add("rotation")
        second.classList.add("rotation")
        correct.innerHTML = parseInt(correct.innerHTML) +1
        document.getElementById("correct").play()
        if (correct.innerHTML == 8) {
            setTimeout(() => {
                document.querySelector(".end").style.display = "flex"
            },duration)
            setInterval(() => {
                document.querySelector(".end span").innerHTML += "."
            },duration)
            setTimeout(() => {
                location.reload()
            },4000)
        }
    } else {
        document.getElementById("error").play()
        setTimeout (() => {
            frist.classList.remove("rotate")
            second.classList.remove("rotate")
        },duration)

        tries.innerHTML = parseInt(tries.innerHTML) +1
        if (tries.innerHTML == 12) {
            tryAgain ()
        }
    }
}

function tryAgain () {
    setTimeout (() => {
        document.querySelector(".try-again").style.display = "flex"
    document.querySelector(".try-again button").onclick = function () {location.reload()}
    },duration)
    
}

let minute = document.querySelector(".minute")
let second = document.querySelector(".second");
+minute.innerHTML
+second.innerHTML

function time () {
    setTimeout (() => {
        minute.innerHTML--
        second.innerHTML = 59
        setInterval (() => {
            second.innerHTML--
        },1000)
        setInterval (() => {
            second.innerHTML = 59
            minute.innerHTML--
        },60000)
        setInterval (() => {
            timeEnd ()
            timeClear ()
        },1000)
    },1000)
}

    function timeClear () {
        if (minute.innerHTML == 0 && second.innerHTML == 1) {
            tryAgain ()
            clearInterval (time ())
        }
    }

function timeEnd () {
    let time = document.querySelector(".time")
    if (minute.innerHTML == 0 && second.innerHTML == 5) {
        time.style.backgroundColor = "red";
        time.style.color = "white";
        time.style.transformScale = "(1.2)";
    }
}