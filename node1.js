const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("bioModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.querySelector(".modal .close");

    openBtn.addEventListener("click", function(e){
        e.preventDefault();
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function(){
        modal.style.display = "none";
    });

    window.addEventListener("click", function(e){
        if(e.target == modal){
            modal.style.display = "none";
        }
    });
});

window.addEventListener("load", function() {
    setTimeout(function() {
        document.body.classList.add("loaded");
    }, 400);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        window.location.href = this.href;
    });
});

// جلوگیری از لمس طولانی (موبایل)
document.addEventListener('touchstart', function preventLongPress(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, {passive: false});
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && ['c','x','s','u'].includes(e.key.toLowerCase())) || e.key === 'F12') {
        e.preventDefault();
    }
}, false);




(function(){
  // برای نمایش فارسی اعداد
  function toPersianDigits(n) {
    const map = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return String(n).split('').map(ch => (/\d/.test(ch) ? map[ch] : ch)).join('');
  }

  function pad(num) {
    return num < 10 ? '0' + num : String(num);
  }

  // تابع شمارش معکوس عمومی
  function createCountdown(targetDate, ids) {
    function update() {
      const now = new Date();
      let diff = targetDate.getTime() - now.getTime();

      const daysEl = document.getElementById(ids.days);
      const hoursEl = document.getElementById(ids.hours);
      const minutesEl = document.getElementById(ids.minutes);
      const secondsEl = document.getElementById(ids.seconds);
      const noteEl = document.getElementById(ids.note);

      if (diff <= 0) {
        daysEl.textContent = '۰';
        hoursEl.textContent = '۰۰';
        minutesEl.textContent = '۰۰';
        secondsEl.textContent = '۰۰';
        noteEl.textContent = 'رویداد فرارسیده یا گذشته است.';
        return;
      }

      const sec = Math.floor(diff / 1000);
      const days = Math.floor(sec / (3600 * 24));
      const hours = Math.floor((sec % (3600 * 24)) / 3600);
      const minutes = Math.floor((sec % 3600) / 60);
      const seconds = Math.floor(sec % 60);

      daysEl.textContent = toPersianDigits(days);
      hoursEl.textContent = toPersianDigits(pad(hours));
      minutesEl.textContent = toPersianDigits(pad(minutes));
      secondsEl.textContent = toPersianDigits(pad(seconds));

      noteEl.textContent = 'به ‌روزشده در زمان واقعی';
    }

    update();
    setInterval(update, 1000);
  }

  // --------------------------
  // اینجا رویدادها رو تعریف کن
  // فرمت: new Date(YYYY, MM-1, DD, hh, mm, ss)

  // رویداد ۱: ولادت پیامبر (۴ سپتامبر ۲۰۲۵)
  createCountdown(
    new Date(2025, 8, 4, 0, 0, 0),
    {days:'days1', hours:'hours1', minutes:'minutes1', seconds:'seconds1', note:'countdown-note1'}
  );

  // رویداد ۲: آغاز ماه رجب (۲۱ دسامبر ۲۰۲۵)
  createCountdown(
    new Date(2026, 0, 2, 0, 0, 0),
    {days:'days2', hours:'hours2', minutes:'minutes2', seconds:'seconds2', note:'countdown-note2'}
  );

})();