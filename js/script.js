$("document").ready(function () {
  // code here
  //   Get today's date
  let now = new Date().toISOString();
  $("#date").attr("min", now.split("T")[0]);
  let countdown = $(".countdown");
  const second  =1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  let couldown;

  if(localStorage.getItem("items")==null){
    couldown = [];
  }else {
    let { title, date } = JSON.parse(localStorage.getItem("countdown"));
    $("form").hide();
    countdown.fadeIn(1000);
    updateCountdown(title, date);
  }

  function countDown(title,date){
    setInterval(()=>{
      let countdownDate = new Date(date).getTime();
      let now = new Date().getTime();
      let distance = countdownDate - now;
      let days = Math.floor(distance/day);
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

  $("form").submit((e) => {
    e.preventDefault();
    let title = $("#title").val();
    let date = $("#date").val();
    if (title !== "" && date !== "") {
      $("#form").hide(function () {
        $(".countdown").fadeIn(1000);
      });
      let task = {
        title : title,
        timing : date
      }
      couldown.push(task)
      localStorage.setItem("Tasks",JSON.stringify(couldown));
      console.log(task);
      $("form")[0].reset();
      $("form").fadeOut(() => {
        countdown.fadeIn(1000);
        countDown(task.title, task.timing);
      });
      // reset the form
      $("#form")[0].reset();
    }
  });
  $("#reset").click(()=>{
    localStorage.clear();
    countdown.fadeOut(()=>{
      $("form").fadeIn(1000);
      location.reload();
    });
  })
});





