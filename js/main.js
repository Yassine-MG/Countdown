// get elements and eventListener
$(document).ready(() => {
  let countdown = $(".countdown");
  //   limit the date to the actuall date
  let today = new Date().toISOString().split("T")[0];
  $("input").last().attr("min", today);

  // functions
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (localStorage.getItem("countdown")) {
    let { title, date } = JSON.parse(localStorage.getItem("countdown"));
    $("form").hide();
    countdown.fadeIn(1000);
    updateCountdown(title, date);
  }

  function updateCountdown(title, date) {
    setInterval(() => {
      let countdownDate = new Date(date).getTime();
      let now = new Date().getTime();
      let distance = countdownDate - now;
      let days = Math.floor(distance / day);
      let hours = Math.floor((distance % day) / hour);
      let minutes = Math.floor((distance % hour) / minute);
      let seconds = Math.floor((distance % minute) / second);
      $(".countdown-title").text(title);
      $(".days > span").text(days);
      $(".hours > span").text(hours);
      $(".minutes > span").text(minutes);
      $(".seconds > span").text(seconds);
    }, 1000);
  }

  $("form").on("submit", function (event) {
    event.preventDefault();
    let title = $("input").first().val();
    let date = $("[type='date']").val();
    localStorage.setItem("countdown", JSON.stringify({ title, date }));
    if (title !== "" && date !== "") {
      console.log(title, date);
      $("form")[0].reset();
      $("form").fadeOut(() => {
        countdown.fadeIn(1000);
        updateCountdown(title, date);
      });
    }
  });

  $("#reset").click(function () {
    localStorage.removeItem("countdown");
    countdown.fadeOut(() => {
      $("form").fadeIn(1000);
    });
  });
});
