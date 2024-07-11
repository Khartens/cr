// popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 300;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// burger
const burger = document.querySelector(".header__wrapper-burger");
const menu = document.querySelector(".header__wrapper-menu");
const list = document.querySelectorAll('.header__nav-list-item');
// const body = document.body;

if(burger) {
    burger.addEventListener('click', () => {
        if(menu.classList.contains('active')) {
            burger.isClick = true
            menu.classList.remove('active');
            burger.classList.remove('active_menu');
            body.classList.remove("noscroll");
        } else {
            menu.classList.add("active");
            burger.classList.add("active_menu");
            body.classList.add("noscroll");
        }
    })
    list.forEach((link) => {
        link.addEventListener("click", closeOnClick);
    });
}
window.onclick = function (event) {

    if (event.target.contains(menu) && event.target !== menu) {
        menu.classList.remove('active');
        burger.classList.remove('active_menu');
        body.classList.remove("noscroll");
    }

}

function closeOnClick() {
    menu.classList.remove('active');
    burger.classList.remove('active_menu');
    body.classList.remove("noscroll");
}


// cursor
const cursor = document.querySelector(".cursor");
const cursorTwo = document.querySelector(".cursor__two");
const color = document.querySelectorAll('.color');

document.addEventListener('mousemove', (e) => {
    cursor.style.cssText = cursorTwo.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;"
})


color.forEach((colors) => {
    colors.addEventListener('mouseover',() => {
        cursor.classList.add('cursor-active');
        cursorTwo.classList.add('cursor__two-active');
        body.classList.add('cursor_none')
    });
    colors.addEventListener('mouseleave',() => {
        cursor.classList.remove('cursor-active')
        cursorTwo.classList.remove('cursor__two-active');
        body.classList.remove('cursor_none')
    });
});


//accrodion
const accordions = document.querySelectorAll(".accordion");

if(accordions) {
    const openAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion__content");
        accordion.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
    };
    
    const closeAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion__content");
        accordion.classList.remove("open");
        content.style.maxHeight = null;
    };
    
    accordions.forEach((accordion) => {
        const intro = accordion.querySelector(".accordion__control");
        const content = accordion.querySelector(".accordion__content");
    
        intro.onclick = () => {
            if (content.style.maxHeight) {
                closeAccordion(accordion);
            } else {
                accordions.forEach((accordion) => closeAccordion(accordion));
                openAccordion(accordion);
            }
        };
    });
}
//Вызов табов
const tab = new GraphTabs('tab', {});

//Маска для телефона
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.slice(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
  
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  
  });
  
});

//анимация 
let samt = 0;
window.addEventListener('scroll', function() {
samt <= 10 ? samt++ : AOS.refresh();
});
AOS.init({
    duration: 1300,
    once: true,
});