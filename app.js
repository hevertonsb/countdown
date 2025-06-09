// countdown

const blockCountdown = document.querySelector('.block-countdown');

if (typeof (blockCountdown) != 'undefined' && blockCountdown != null) {
    const $ = elem => document.querySelector(elem);
    const introEvent = document.querySelector('.intro-event');

    const countdown = function (_config) {
        const tarDate = $(_config.target).getAttribute('data-date').split('-');
        const day = parseInt(tarDate[0]);
        const month = parseInt(tarDate[1]);
        const year = parseInt(tarDate[2]);
        let tarTime = $(_config.target).getAttribute('data-time');
        let tarhour, tarmin;

        if (tarTime != null) {
            tarTime = tarTime.split(':');
            tarhour = parseInt(tarTime[0]);
            tarmin = parseInt(tarTime[1]);
        }

        let months = [31, new Date().getFullYear() % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let dateNow = new Date();
        let dayNow = dateNow.getDate();
        let monthNow = dateNow.getMonth() + 1;
        let yearNow = dateNow.getFullYear();
        let hourNow = dateNow.getHours();
        let minNow = dateNow.getMinutes();
        let count_day = 0, count_hour = 0, count_min = 0;
        let count_day_isSet = false;
        let isOver = false;

        // Set the date we're counting down to
        const countDownDate = new Date(year, month - 1, day, tarhour, tarmin, 0, 0).getTime();

        // $(_config.target + ' .day .word').innerHTML = _config.dayWord;
        // $(_config.target + ' .hour .word').innerHTML = _config.hourWord;
        // $(_config.target + ' .min .word').innerHTML = _config.minWord;
        // $(_config.target + ' .sec .word').innerHTML = _config.secWord;

        const updateTime = () => {
            // Get todays date and time
            const now = new Date().getTime();

            // Find the distance between now an the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            requestAnimationFrame(updateTime);

            $(_config.target + ' .day .num').innerHTML = addZero(days);
            $(_config.target + ' .hour .num').innerHTML = addZero(hours);
            $(_config.target + ' .min .num').innerHTML = addZero(minutes);
            $(_config.target + ' .sec .num').innerHTML = addZero(seconds);

            // If the count down is over, write some text
            if (distance < 0) {
                //$(".countdown").innerHTML = "EXPIRED";
                blockCountdown.classList.add('hide');
                introEvent.classList.add('no-countdown')
            }
        }

        updateTime();
    }

    const addZero = (x) => (x < 10 && x >= 0) ? "0" + x : x;

    // init countdown

    const efcc_countdown = new countdown({ target: '.countdown', });
}

// document.addEventListener("click", () => {
//     const audio = document.getElementById("musica");
//     audio.muted = false;
//     audio.play();
// });

const audio = document.getElementById('musica');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volume');

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/></svg>';
    }
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});