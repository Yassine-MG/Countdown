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
  let intervalId = null ;
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

  intervalId = setInterval(()=>{
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


    function removeAllTask() {
      localStorage.removeItem("Tasks");
      task = [];
      document.querySelector(".countdown-title").innerHTML = "";
    }



  $("form").submit((e) => {
    task = [];
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
      localStorage.setItem("Tasks",JSON.stringify(task));
      console.log(task);
      $("form")[0].reset();
      console.log($("form"));
      $("form").fadeOut(() => {
        countdown.fadeIn(1000);
        countDown(task.title, task.timing);
      });
      // reset the form
    }
  });
  $("#reset").click(function () {
    localStorage.removeItem("task");
    countdown.fadeOut(() => {
      $("form").fadeIn(1000);
    });
    clearInterval(intervalId);
  });
});









