// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true

const { getCurrentWindow, getByLabel, setDecorations } =
  window.__TAURI__.window;

const { invoke } = window.__TAURI__.core;

// global val
var tTime = 10000;

function validate(form) {
  console.log("validate");
  form.validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      formError();
      submitMSG(false, "Fill in the form properly?");
    } else {
      // everything looks good!
      event.preventDefault();
      submitForm();
    }
  });

  function formSuccess(msg) {
    form[0].reset();
    submitMSG(true, msg);
  }

  function formError(msg) {
    form
      .removeClass()
      .addClass("shake animated")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass();
          submitMSG(false, msg);
        }
      );
  }

  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h4 text-center tada animated text-success";
    } else {
      var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
}

/// toggler for animated spinners
const singleToggle = function (className, target) {
  $(target).toggleClass(className);
};

const singleToggles = function (className, className1, target) {
  $(target).toggleClass(className);
  $(target).toggleClass(className1);
};

$("#logout").click((e) => {
  e.preventDefault();

  $.jStorage.flush();
  window.location = "signin.html";
});

var today = new Date();
$("#copyright").html(`Copyright © ${today.getFullYear()} 
          <div class="col-lg-12">
          <ul
            class="d-flex gap-2 gap-xl-4 p-0 align-items-center flex-wrap justify-content-center justify-content-lg-end">
            <li>Help Center</li>
            <li><span class="d-none d-sm-inline-block">Contact us @ www.fakecryptosender.com.</span></li>
          </ul>
        </div>
          
          `);

const switchMood = function () {
  // console.log(mood)
  if (mood == "1") {
    $("#moodLink").html(`            
                  <a class="nav-link d-flex gap-2 align-items-center" href="gas.html">
                    <span class="material-symbols-outlined fw-lighter">
                      <i class="fa-brands fa-gripfire fa-sm"></i>
                    </span>
                    <span class="fw-semibold">Gas Wallet</span>
                </a>`);

    $(".flash").click((e) => {
      e.preventDefault();
      singleToggle("fa-spin", ".refreshIcon");
      try {
        window.location = "flash-gas.html";
      } catch (error) {
        toast("Error Refreshing", "error", tTime);
      }
    });
  } else {
    $(".flash").click((e) => {
      e.preventDefault();
      singleToggle("fa-spin", ".refreshIcon");
      try {
        window.location = "flash.html";
      } catch (error) {
        toast("Error Refreshing", "error", tTime);
      }
    });
  }
};

if ($.jStorage != undefined)
  if ($.jStorage.get("user") != null && $.jStorage.get("user") != undefined) {
    var mood = $.jStorage.get("user")[0].testMood;
    switchMood();
  }

// windowObj.appWindow.center()

document.addEventListener("DOMContentLoaded", () => {
  console.log(getCurrentWindow());
  setTimeout(() => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    // Call the Rust command to close splash and show main
    invoke("close_splashscreen").catch((err) => {
      console.error("Failed to close splashscreen:", err);
    });
  }, 1000 * 60);
});

document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
    return;
  },
  false
);

// With jQuery

$(".tradingview-widget-container").on("mouseenter", (e) => {
  e.preventPropagation;
  console.log("mouse entered");
  $(".tradingview-widget-container").css({ "pointer-events": "none" });
});
$(function () {
  var lastKey = 0;
  $(window).on("keydown", document, function (event) {
    lastKey = event.keyCode;
  });
});

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (
    key == "ContextMenu" ||
    key == "Alt" ||
    key == "Shift" ||
    key == "Control" ||
    (key == "Control" && key == "Shift")
  ) {
    console.log(event.key);
    event.preventDefault();
    event.stopPropagation();
    return;
  }
});

setTimeout(async () => {
  //switch of the bars
  const curWindow = getCurrentWindow();
  console.log(curWindow.center());

  // windowObj.center();
  document
    .getElementById("titlebar-minimize")
    .addEventListener("click", async () => {
      curWindow.minimize();
      console.log("minimize toggled");
    });
  document
    .getElementById("titlebar-maximize")
    .addEventListener("click", async () => {
      const maximized = await getCurrentWindow().isMaximized();
      if (maximized) {
        await curWindow.unmaximize();
        console.log("unmaximize toggled");
        return;
      }
      // if not maximized, maximize it
      else {
        await curWindow.maximize();
        console.log("Maximize toggled");
      }
    });
  document
    .getElementById("titlebar-close")
    .addEventListener("click", async () => await curWindow.close());
}, 200);
// console.log($.jStorage.get("holdings"))
