$(document).ready(function () {
    initGame();
    resize();
})

var data = {
    playable: true,
    answerArr: [],
    score: 0,

}

function sortCard() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(function (a, b) {
        return 0.5 - Math.random()
    });
    $('.gamePage .container .card').each(function () {
        var t = $(this);
        ChungTool.removeClassWithFilter(t, 'cd');
        t.addClass('cd' + arr.pop());
    })
}

function initGame() {
    answerArr = [];
    $('.gamePage .container .card').on('click', function () {
        var t = $(this);

        if (data.playable && !t.hasClass('open')) {
            var id = ChungTool.returnClassNameWithFilter(t, 'cd')[0];
            t.addClass('open');
            cardAnimation(t);
            if (data.answerArr.indexOf(id) != -1) {
                data.score += 1;
            } else {
                data.answerArr.push(id);
            }
            console.log(data.answerArr, data.score)
        }
    });

    $('.startBtn').on('click', function () {
        $('.page').addClass('hide');
        $('.gamePage').removeClass('hide');
        startRemenber();
    });

    $('.homeBtn').on('click', function () {
        $('.page').addClass('hide');
        $('.page1').removeClass('hide');
    });
}

function startRemenber() {
    data.playable = false;
    allOpen();
    sortCard();
    countTen(startPlay);
}

function startPlay() {
    allCloz();
    data.score = 0;
    data.answerArr = [];
    data.playable = true;
    countTen(goResult)
}

function goResult() {
    console.log(data.score);
    var rp = $('.resultPage');
    data.playable = false;
    data.score = (data.score >= 2) ? 2 : data.score;
    ChungTool.removeClassWithFilter(rp,'r_');
    rp.addClass('r_'+ data.score);

    setTimeout(function () {
        $('.page').addClass('hide')
        rp.removeClass('hide');
    }, 1000)
}

function countTen(func) {
    var timeLeft = 10;
    var t = $('.gamePage .count');
    disTime();
    var rememberTimer = setInterval(disTime, 1000);

    function disTime() {

        ChungTool.removeClassWithFilter(t, 'count_');
        t.addClass('count_' + timeLeft);
        cardAnimation(t);
        timeLeft -= 1;

        if (timeLeft < 0) {
            clearInterval(rememberTimer);
            func();
        }
    }
}
var gameCard = $('.gamePage .card');

function allOpen() {
    gameCard.addClass('open');
    cardAnimation(gameCard);
}

function allCloz() {
    gameCard.removeClass('open');
    cardAnimation(gameCard);
}

function cardAnimation(el) {
    TweenMax.set(el, {
        scale: 1.1
    });
    TweenMax.to(el, 0.3, {
        scale: 1,
        ease: Back.easeOut
    });
}


function resize(){
  
    $( window ).resize(function() {
        // console.log($(window).height()/1920);
        TweenMax.set($('.mainContainer'),{scale:$(window).height()/1920,transformOrigin:'center top'})
      }).resize();
}