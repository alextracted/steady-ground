// Mobile nav toggle
(function () {
  var btn = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// Toast helper
var SG_TOAST_ICONS = {
  ok: { icon: "circle-check", color: "#0F8A5F" },
  down: { icon: "triangle-alert", color: "#C0392B" },
  info: { icon: "info", color: "#4FB0F0" },
};
function sgShowToast(message, detail, tone) {
  var toast = document.getElementById("sgToast");
  if (!toast) return;
  var t = SG_TOAST_ICONS[tone] || SG_TOAST_ICONS.info;
  var iconEl = toast.querySelector(".sg-toast__icon");
  if (iconEl) {
    var url = "https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/" + t.icon + ".svg";
    iconEl.style.webkitMaskImage = "url(" + url + ")";
    iconEl.style.maskImage = "url(" + url + ")";
    iconEl.style.backgroundColor = t.color;
  }
  toast.querySelector(".sg-toast__message").textContent = message;
  toast.querySelector(".sg-toast__detail").textContent = detail || "";
  toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 7000);
}
(function () {
  var closeBtn = document.querySelector("#sgToast .sg-toast__close");
  if (closeBtn) closeBtn.addEventListener("click", function () {
    document.getElementById("sgToast").classList.remove("is-visible");
  });
})();

// Booking form: service/skilling tab switch + Formspree submission
(function () {
  var form = document.getElementById("bookForm");
  if (!form) return;

  var tabs = form.querySelectorAll(".sg-tab");
  var servicePanel = document.getElementById("panel-service");
  var skillingPanel = document.getElementById("panel-skilling");
  var kindInput = document.getElementById("bookKind");
  var subjectInput = document.getElementById("bookSubject");
  var submitBtn = form.querySelector('button[type="submit"]');

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      var kind = tab.getAttribute("data-kind");
      kindInput.value = kind;
      servicePanel.style.display = kind === "service" ? "" : "none";
      skillingPanel.style.display = kind === "skilling" ? "" : "none";
      servicePanel.querySelectorAll("[data-required]").forEach(function (el) { el.required = kind === "service"; });
      skillingPanel.querySelectorAll("[data-required]").forEach(function (el) { el.required = kind === "skilling"; });
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var kind = data.get("kind");

    subjectInput.value = "Steady Ground — " + (kind === "skilling" ? "Skilling session request" : "Service call request") + " from " + data.get("firstName") + " " + data.get("lastName");
    data.set("_subject", subjectInput.value);

    var originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          tabs[0].click();
          sgShowToast("Request sent", "We got it from here! Our service manager will review your request and respond shortly.", "ok");
        } else {
          return response.json().then(function (body) {
            var msg = body && body.errors ? body.errors.map(function (er) { return er.message; }).join(", ") : "Something went wrong.";
            throw new Error(msg);
          });
        }
      })
      .catch(function () {
        sgShowToast("Couldn't send that request", "Please call or email us directly at (206) 992-9405 / service@steadyground.co.", "down");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
        submitBtn.innerHTML = originalLabel;
      });
  });
})();
