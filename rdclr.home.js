function myFunction(x) {
    x.classList.toggle("change");
}
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("slider-wapper");

//     if (n > slides.length) {
//         slideIndex = 1
//     }
//     if (n < 1) {
//         slideIndex = slides.length
//     }
//     for (i = 0; i < slides.length; i++){
//         slides[i].style.display = "none";
//     }
//     slides[slideIndex-1].style.display = "block";
// }
document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');

    for(let i = 0;  i < sliders.length; i++) {
        createSlider(sliders[i]);
    }
    console.log(sliders);
});

function createSlider(slider) {
    const slides = slider.querySelectorAll('.slide');
    if(slides.length < 2) return;

    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    if (!prevButton && nextButton) return;

    const sliderWrapper = slider.querySelector('.slider-wrapper');

    let shift = 0;
    let active = 0;
    if(nextButton) {
        nextButton.addEventListener('click', function (){
            active++;

            if (active > slides.length - 1) {
                active = 0;
                shift = 0;
            }
            else 
                shift -= slides[active-1].clientWidth;
            sliderWrapper.style.left = shift + 'px';
        });
    }
    if(prevButton) {
        prevButton.addEventListener('click', function (){
            active--;

            if (active < 0) {
                active = slides.length - 1;
                shift = 0;
                for(let i = 0; i < slides.length -1; i++){
                    shift -= slides[i].clientWidth;
                    console.log(shift);
                }
            }
            else 
                shift += slides[active].clientWidth;
            sliderWrapper.style.left = shift + 'px';
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
  
    if (!header) return;
  
    let hidden = false;

    let prevScroll = 0;
    let prevDelta = 0;
    let lastScroll = window.scrollY;

    function handleScroll() {

        let delta = window.scrollY - prevScroll;

        if(delta < 0 && prevDelta > 0 || delta > 0 && prevDelta < 0){
            lastScroll = window.scrollY;
        }
        prevScroll = window.scrollY;
        prevDelta = delta;

        
        if (hidden && lastScroll - window.scrollY > 50) {
            header.classList.remove('hidden');
            hidden = false;
        }
        else if (!hidden && window.scrollY - lastScroll > 50) {
            header.classList.add('hidden');
            hidden = true;
        }
    }
    handleScroll();
  
    window.addEventListener('scroll', handleScroll);
});

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    const messageFieldSent = document.querySelector('.messageFieldSent');
    const messageFieldError = document.querySelector('.messageFieldError');

    const overlay = document.querySelector('.overlay');
    if(!overlay) return;
    
    // Array.form(forms).forEach(form => createForm(form, messageField));

    for(let i =0; forms.length > i; i++){
        createForm(forms[i], messageFieldSent, messageFieldError);
    }
});

function createForm(form, messageFieldSent, messageFieldError) {
    const action = form.action;
    const elements = form.elements;

    if (!action || !elements) return;

    function validate() {
        let result = true;

        for(let i = 0; elements.length > i; i++) {
            const el = elements[i];
            console.log('el', el )

            if (el.dataset['required']) continue;
 
            if (el.tagName.toLocaleLowerCase() === 'select' && !el.getAttribute('multiple') && el.selectedIndex === 0) {
                el.classList.add('error');
                el.addEventListener('change', removeClass);
                result = false;
            }
            else if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
                let check = el.parentNode.querySelector('.checkmark');
                check.classList.add('error');
                el.addEventListener('change', removeClass);
                result = false;
            }
            else if (el.type !== 'submit' && !el.value) {
                el.classList.add('error');
                el.addEventListener('input', removeClass);
                result = false;
            }
        }
        function removeClass() {
            this.classList.remove('error');
            if((this.type === 'checkbox' || this.type === 'radio') && this.checked){
                let check = this.parentNode.querySelector('.checkmark.error');
                if(check)
                check.classList.remove('error');
            }
        }
        return result;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!validate()) {
            document.documentElement.classList.add('popupActive');
            messageFieldSent.style.display = 'none';
            messageFieldError.style.display = '';

            document.addEventListener('click', function () {
                document.documentElement.classList.remove('popupActive');
            });
            return;
        }


        document.documentElement.classList.add('popupActive');
        messageFieldSent.style.display = '';
        messageFieldError.style.display = 'none';

        document.addEventListener('click', qwe);
    });
    function qwe () {
        document.documentElement.classList.remove('popupActive');
        document.removeEventListener('click', qwe);
    }
}
