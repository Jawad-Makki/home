const j = document.getElementById("j");
const a1 = document.getElementById("a1");
const w = document.getElementById("w");
const a2 = document.getElementById("a2");
const d = document.getElementById("d");
const m = document.getElementById("m");
const a3 = document.getElementById("a3");
const k1 = document.getElementById("k1");
const k2 = document.getElementById("k2");
const i = document.getElementById("i");

var letters1 = [];
var letters2 = [];
var letters3 = [];
var letters4 = [];
var letters5 = [];
var letters6 = [];

var wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loop1 = async () => {
    for (const x of letters1) {
        
        x.style.animation = "letter-up 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            x.style.animation = "";
        }, 500);
        
        await wait(100);
    }
}

const loop2 = async () => {

    await wait(100);

    for (const x of letters2) {
        x.style.animation = "letter-up 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            x.style.animation = "";
        }, 500);
        
        await wait(100);
    }
}

const loop3 = async () => {
    for (const x of letters3) {
        x.style.animation = "letter-up 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            x.style.animation = "";
        }, 500);
        
        await wait(150);
    }
}

const loop4 = async () => {

    await wait(150);

    for (const x of letters4) {
        x.style.animation = "letter-up 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            x.style.animation = "";
        }, 500);
        
        await wait(150);
    }
}

const loop5 = async () => {
    for (const x of letters5) {
        x.style.animation = "letter-down 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            x.style.animation = "";
        }, 500);
        
        await wait(150);
    }
}

const loop6 = async () => {

    await wait(150);

    for (const x of letters6) {
        x.style.animation = "letter-down 0.25s ease-out 0s 2 alternate forwards";
        
        setTimeout(() => {
            x.style.animation = "";
        }, 500);
        
        await wait(150);
    }
}

window.addEventListener("click", (e) => {

    if (e.target == j) {       
        letters1 = [j, a1, w, a2, d, m, a3, k1, k2, i];
        letters2 = [];

        letters3 = [j, a1, w, a2, d];
        letters4 = [];
        letters5 = [m, a3, k1, k2, i];
        letters6 = [];
    } else if (e.target == a1) {
        letters1 = [a1, w, a2, d, m, a3, k1, k2, i];
        letters2 = [j];

        letters3 = [a1, w, a2, d];
        letters4 = [j];
        letters5 = [a3, k1, k2, i];
        letters6 = [m];
    } else if (e.target == w) {
        letters1 = [w, a2, d, m, a3, k1, k2, i];
        letters2 = [a1, j];

        letters3 = [w, a2, d];
        letters4 = [a1, j];
        letters5 = [k1, k2, i];
        letters6 = [a3, m];
    } else if (e.target == a2) {
        letters1 = [a2, d, m, a3, k1, k2, i];
        letters2 = [w, a1, j];

        letters3 = [a2, d];
        letters4 = [w, a1, j];
        letters5 = [k2, i];
        letters6 = [k1, a3, m];
    } else if (e.target == d) {
        letters1 = [d, m, a3, k1, k2, i];
        letters2 = [a2, w, a1, j];

        letters3 = [d];
        letters4 = [a2, w, a1, j];
        letters5 = [i];
        letters6 = [k2, k1, a3, m];
    } else if (e.target == m) {
        letters1 = [m, a3, k1, k2, i];
        letters2 = [d, a2 ,w, a1, j];

        letters3 = [j, a1, w, a2, d];
        letters4 = [];
        letters5 = [m, a3, k1, k2, i];
        letters6 = [];
    } else if (e.target == a3) {
        letters1 = [a3, k1, k2 ,i];
        letters2 = [m, d, a2 ,w, a1, j];

        letters3 = [a1, w, a2, d];
        letters4 = [j];
        letters5 = [a3, k1, k2, i];
        letters6 = [m];
    } else if (e.target == k1) {
        letters1 = [k1, k2 ,i];
        letters2 = [a3, m, d, a2 ,w, a1, j];

        letters3 = [w, a2, d];
        letters4 = [a1, j];
        letters5 = [k1, k2, i];
        letters6 = [a3, m];
    } else if (e.target == k2) {
        letters1 = [k2 ,i];
        letters2 = [k1, a3, m, d, a2 ,w, a1, j];

        letters3 = [a2, d];
        letters4 = [w, a1, j];
        letters5 = [k2, i];
        letters6 = [k1, a3, m];
    } else if (e.target == i) {
        letters1 = [i];
        letters2 = [k2, k1, a3, m, d, a2 ,w, a1, j];

        letters3 = [d];
        letters4 = [a2, w, a1, j];
        letters5 = [i];
        letters6 = [k2, k1, a3, m];
    }

    if (e.target == j || e.target == a1 || e.target == w || e.target == a2 || e.target == d || e.target == m || e.target == a3 || e.target == k1 || e.target == k2 || e.target == i) {
        if (window,innerWidth > 1240) {
            loop1();
            loop2();
        } else {
            loop3();
            loop4();
            loop5();
            loop6();
        }
    }
})

window.addEventListener("load", () => {
    j.style.animation = "letter-drop 0.6s ease 2s 1 normal forwards";
    a1.style.animation = "letter-drop 0.6s ease 1.85s 1 normal forwards";
    w.style.animation = "letter-drop 0.6s ease 1.7s 1 normal forwards";
    a2.style.animation = "letter-drop 0.6s ease 1.55s 1 normal forwards";
    d.style.animation = "letter-drop 0.6s ease 1.4s 1 normal forwards";
    m.style.animation = "letter-drop 0.6s ease 1.25s 1 normal forwards";
    a3.style.animation = "letter-drop 0.6s ease 1.1s 1 normal forwards";
    k1.style.animation = "letter-drop 0.6s ease 0.95s 1 normal forwards";
    k2.style.animation = "letter-drop 0.6s ease 0.8s 1 normal forwards";
    i.style.animation = "letter-drop 0.6s ease 0.65s 1 normal forwards";

    setTimeout(() => {
        j.style.top = "0";
        a1.style.top = "0";
        w.style.top = "0";
        a2.style.top = "0";
        d.style.top = "0";
        m.style.top = "0";
        a3.style.top = "0";
        k1.style.top = "0";
        k2.style.top = "0";
        i.style.top = "0";
    }, 2600);
})