let header = document.querySelector('.header');
let tel = document.querySelector('.phone_inp')
let fio = document.querySelector('.fio_inp');
let card = document.querySelectorAll('.program__box');
let modal = document.querySelectorAll('.program__modal');
let close = document.querySelectorAll('.program__close');
let btnExpert = document.querySelector('.expert__btn');
let panel = document.querySelector('.panel');
let body = document.querySelector('body');
const burger = document.querySelector(".burger");

let accordeon = document.querySelectorAll('.info__accordeon');

let banner = document.querySelector('.banner');
let headerHr = document.querySelector('.header hr');
let headerInfo = document.querySelector('.header__info');
let headerNav = document.querySelector('.header__nav');


burger.addEventListener("click", function() {
	burger.classList.toggle("burger_active");
});

$(function () {
	$('.menu-open').click(function () {
		$('.menu-burger').toggleClass('show-menu')
	})
});




if(banner) {
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 1399) {
            if (window.scrollY > 118) {
                if(banner){banner.style.paddingTop = '258px';}
                headerHr.style.display = 'none';
                headerInfo.style.display = 'none';
                headerNav.style.padding = '25px 0';
            } else {
                if(banner){banner.style.paddingTop = '140px';}
                headerHr.style.display = 'block';
                headerInfo.style.display = 'flex';
                headerNav.style.padding = '16px 0';
            }
        }
    });
}


for(let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', function() {
        modal[i].classList.add('modal_flex');
        modal[i].classList.remove('modal_none');
        body.classList.add('body_scroll');
    });

    close[i].addEventListener('click', function() {
        modal[i].classList.remove('modal_flex');
        modal[i].classList.add('modal_none');
        body.classList.remove('body_scroll');
    });

    window.addEventListener("click", function(item) {
        if(item.target == modal[i]) {
            modal[i].classList.remove('modal_flex');
            modal[i].classList.add('modal_none');
            body.classList.remove('body_scroll');
        }
    });  
}


if (btnExpert) {
    const elementCoordinates = document.querySelector('.expert__4').getBoundingClientRect();
	const windowScroll = window.pageYOffset || document.documentElement.scrollTop;
    btnExpert.addEventListener("click", function() {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        btnExpert.innerHTML = "Показать <br> всех";
        window.scrollTo(0,elementCoordinates.top + windowScroll);
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        btnExpert.innerHTML = "Скрыть";
      }
    });
}


let form = document.querySelector(".connect__form");
if(form) {
    let fail = '';
    var maskOptions = {
        mask: '+7(000)000-00-00',
        lazy: false,
    } 
    var mask = new IMask(tel, maskOptions);
    form.addEventListener("submit", function(event) {
    event.preventDefault();

    if(tel.value[15] == '_' && fio.value == '') {
        fio.style.backgroundColor = '#FFDDDD';
        tel.style.backgroundColor = '#FFDDDD';
        fail = 'Заполните все поля!';
        alert(fail);
    } else if(tel.value[15] == '_') {
        tel.style.backgroundColor = '#FFDDDD';
        fail = 'Введите номер телефона';
        alert(fail);
    } else if(fio.value == '' || fio.value.length < 2 || fio.value.length > 50) {
        fio.style.backgroundColor = '#FFDDDD';
        fail = 'Введите имя';
        alert(fail);
    } 

    if (!fail) {
        fio.style.backgroundColor = '#E9F8FF';
        tel.style.backgroundColor = '#E9F8FF';
        botTg();
        fio.value = "";
        tel.value = "";
        alert('Заявка отправлена!');
    }
});
}

function botTg() {
    let message = tel.value + "%0A" + fio.value;
    const token = '6700486163:AAF8KfV7FfoOJVz4quEhkUgN7ZcYIFK2mKk';
    const url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=-1002137823316&text=';
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + message, true);
    xhttp.send();
}


for(let i = 0; i < accordeon.length; i++) {
    accordeon[i].addEventListener("click", function() {
        let content = this.nextElementSibling;
        if(content.style.maxHeight) {
            content.style.maxHeight = null;
            setTimeout(function() {
                if(i == accordeon.length - 1) {
                    content.style.borderBottom = '1px solid #fff';
                    accordeon[i == accordeon.length - 1 ? i : i + 1].style.borderBottom = 'none';
                } else {
                    content.style.borderBottom = 'none';
                    accordeon[i].style.borderBottom = 'none';
                    accordeon[i + 1].style.borderTop = '1px solid #fff';
                }
            },300);
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            if(i == accordeon.length - 1) {
                content.style.borderBottom = '1px solid #fff';
                accordeon[i == accordeon.length - 1 ? i : i + 1].style.borderBottom = 'none';
            } else {
                content.style.borderBottom = 'none';
                accordeon[i].style.borderBottom = 'none';
                accordeon[i + 1].style.borderTop = '1px solid #fff';
            }
        }
    });
}