function data(){
    this.balance =0;
    this.money =3000;
}
var d1 = new data();
d1.balance = JSON.parse(localStorage.getItem('balance'));
if(d1.balance==null){
    localStorage.setItem('balance',JSON.stringify(20000));
    d1.balance = JSON.parse(localStorage.getItem(balance))
}
// get_money();
function obj() {
    this.pc = 0;
    this.dc = 0;
    this.i = 0;
    this.dt = true;
    this.played = 0;
    this.game = false;
    this.cn = 0;
}
function clrtime(){
     
}

let t = new clrtime();

let s = new obj();

function restart() {
    clearTimeout(t.set);
    clearTimeout(t.set2);
    s.pc = 0;
    s.dc = 0;
    s.i = 0;
    s.dt = true;
    s.cn = 0;
    s.played = 0;
    
    err= document.querySelector('.error');
    err.innerHTML = '';
    err.style.display='none';
    result = document.querySelector('.result');
    result.innerHTML='';
    result.style.display='none';    // if (result.style.display = 'block') {
    //     result.style.display = 'none';
    // }
    if (document.getElementById('hit').style.display != 'none') {
        document.getElementById('hit').style.display = 'none';
    }
    if (document.getElementById('stand').style.display = 'none') {
        document.getElementById('stand').style.display = 'none';
    }
    let x = document.getElementsByClassName("game");
    x[0].style.display = "none";

    let dealer = document.getElementById('dealer');

    dealer.innerHTML = `<p class="data1"></p> `;


    let player = document.getElementById('player');
    player.innerHTML = `<p class="data2"></p> `;


    let st = document.querySelector('.start');
    st.style.display = 'block';

    if(document.getElementById('restart').style.display!='none'){
    document.getElementById('restart').style.display='none';
    }



}
 

function error(text,who) {
    te = document.getElementsByClassName('error');
    te = te[0];
    te.style.display = 'block';
    te.innerHTML = text;
    if(who=="won"){
        te.style.backgroundColor = '#61e141';
    }
    else if(who=="lost"){
        te.style.backgroundColor = '#f73461';
    }
    
}




/// getting bait from users
// console.log(balance);


// function get_money() {
//   var money = prompt('please enter your bait', 1000);
//     console.log(money);
//     if(money>balance){
//         alert('you dont have enough money');
//         get_money(); 
//     }
// }



cards = [" ", "ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "jack", "queen", "king"];
// console.log(cards);

function show_result() {
     
    te = document.getElementsByClassName('error');
    te = te[0];
    te.innerHTML = '';
    if (te.style.display = 'block') {
        te.style.display = 'none';
    }

    result = document.getElementsByClassName('result');
    result = result[0];
    result.style.display = 'block';
    let text = "";
    if (s.dc > 21 || (s.dc < s.pc && s.pc <= 21)) {
        d1.balance += d1.money  ;
        text += `Congo , You won <br>
                + ${d1.money} <br>
                your balance is ${d1.balance}`;
    }
    else if (s.pc > 21 || s.dc > s.pc) {
        d1.balance -= d1.money;
        text += `You Lost <br>
        - ${d1.money} <br>
        your balance is ${d1.balance}<br>
        better luck next time`;
    }
    else {
        text += `Match Drawn <br>
        your balance is ${d1.balance}`;
    }
    result.innerHTML = text;
    localStorage.setItem('balance',JSON.stringify(d1.balance));

    // clrtime.set2 = setTimeout(restart,3000);
    document.getElementById('restart').style.display='block';

}

// function check_game(x) {
//     if (game == false) {
//         document.getElementById('hit').style.display = 'none';
//         document.getElementById('stand').style.display = 'none';
//         show_result();
//         clearInterval(x);
//     }

// }

function get_score(x, ran) {
    if (ran > 1 && ran < 11) {
        x += ran;
        return x;
    }
    else if (ran == 1 && x < 11) {
        x += 11;
        return x;
    }
    else if (ran == 1 && x >= 11) {
        x += 1;
        return x;
    }
    x += 10;
    return x;
}


function insert(text, man, ran, c, name) {
    text[0].innerHTML = ` ${name} card is ${cards[ran]} <br> 
        ${name} score is ${c}`;
    x = document.createElement('img');
    x.src = `img/${cards[ran]}.png`;
    man.appendChild(x);

}


function play(a) {

    if (document.getElementById('nxt').style.display == 'none') {

        document.getElementById('nxt').style.display = 'inline-block'
    }
    s.game = true;
    s.played++;
    s.i++;
    if (s.i == 1) {
        a.style.display = 'none';
    }
    if (s.played == 3) {
        document.getElementById('nxt').style.display = 'none';
        document.getElementById('hit').style.display = 'inline-block';
        document.getElementById('stand').style.display = 'inline-block';
    }
    if (true) {

        if (s.dt == true) {

            let x = document.getElementsByClassName("game");
            x[0].style.display = "inline-block";

            // for  dealer's turn 1st time

            let ran = Math.floor(Math.random() * 13) + 1;
            let te = cards[ran];
            // console.log(te);

            s.dc = get_score(s.dc, ran);
            let text = document.getElementsByClassName('data1');
            let dealer = document.getElementById('dealer');
            insert(text, dealer, ran, s.dc, "dealer");

            s.dt = false;

        }
        else {

            // for players turn
            player = document.getElementById('player');
            text = document.getElementsByClassName('data2');
            ran = Math.floor(Math.random() * 13) + 1;
            te = cards[ran];

            s.pc = get_score(s.pc, ran);

            insert(text, player, ran, s.pc, "player");
            if (s.pc == 21) {
                error("you got blackjag, you won","won");
                s.game = false;
                if (s.game == false) {
                    document.getElementById('hit').style.display = 'none';
                    document.getElementById('stand').style.display = 'none';
                    t.set = setTimeout(show_result, 2500);
                }
                return;
            }
            // dt = true;
        }
    }
}

document.getElementById('nxt').addEventListener('click', play);

let b_hit = document.getElementById('hit');
let b_stand = document.getElementById('stand');

b_stand.addEventListener('click', function stand() {
    s.cn++;
    if (s.dc == 21 && s.cn == 1) {
        error("dealer got blackjag, you lost","lost");
        s.game = false;
        if (s.game == false) {
            document.getElementById('hit').style.display = 'none';
            document.getElementById('stand').style.display = 'none';
            t.set = setTimeout(show_result, 2500);
        }
        return;
    }
    b_hit.style.display = 'none';
    b_stand.style.display = 'none';
    let ran = Math.floor(Math.random() * 13) + 1;
    let te = cards[ran];

    s.dc = get_score(s.dc, ran);

    dealer = document.getElementById('dealer');
    text = document.getElementsByClassName('data1');
    insert(text, dealer, ran, s.dc, "dealer");
    if (s.dc > 21) {
        error("dealer got bursed, you Won","won");
        s.game = false;
        if (s.game == false) {
            document.getElementById('hit').style.display = 'none';
            document.getElementById('stand').style.display = 'none';
            t.set = setTimeout(show_result, 2500);
        }

        return;
    }
    if (s.dc > 17 || s.dc > s.pc) {
        if (s.dc > s.pc) {
            error("dealer,s score is higher than yours, you Lost","lost");

        }
        else if (s.dc < s.pc) {
            error("your score is higher than dealer, you won","won");
        }
        else if (s.dc == s.pc) {
            error("scores are same, drawn","drawn");
        }
        s.game = false;
        if (s.game == false) {
            document.getElementById('hit').style.display = 'none';
            document.getElementById('stand').style.display = 'none';
            t.set = setTimeout(show_result, 2500);
        }

        return;
    }
    setTimeout(stand, 1300);

})
b_hit.addEventListener('click', function hit() {
    let ran = Math.floor(Math.random() * 13) + 1;
    let te = cards[ran];

    s.pc = get_score(s.pc, ran);

    player = document.getElementById('player');
    text = document.getElementsByClassName('data2');
    insert(text, player, ran, s.pc, "player");
    if (s.pc > 21) {
        error(`you bursted`,"lost");
        s.game = false;
        if (s.game == false) {
            document.getElementById('hit').style.display = 'none';
            document.getElementById('stand').style.display = 'none';
            t.set = setTimeout(show_result, 2500);
        }
        return;
    }
});



 








