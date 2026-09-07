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
function sgShowToast(message, detail) {
  var toast = document.getElementById("sgToast");
  if (!toast) return;
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

// Booking form: service/skilling tab switch + mailto submission
(function () {
  var form = document.getElementById("bookForm");
  if (!form) return;

  var tabs = form.querySelectorAll(".sg-tab");
  var servicePanel = document.getElementById("panel-service");
  var skillingPanel = document.getElementById("panel-skilling");
  var kindInput = document.getElementById("bookKind");

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
    var lines = [];
    lines.push("Request type: " + (kind === "skilling" ? "Skilling session" : "Service call"));
    lines.push("Name: " + data.get("firstName") + " " + data.get("lastName"));
    lines.push("Email: " + data.get("email"));
    lines.push("Phone: " + data.get("phone"));
    lines.push("Equipment make & model: " + (data.get("equipment") || "(not provided)"));

    if (kind === "skilling") {
      var pkgLabel = data.get("package") === "p2" ? "Extended Session — $200 + travel (2 hours, 3–6 people)" : "Standard Session — $130 + travel (90 minutes, 1–2 people)";
      lines.push("Package: " + pkgLabel);
      lines.push("");
      lines.push("What the session should cover:");
      lines.push(data.get("skillingDetails") || "");
    } else {
      var typeLabel = data.get("serviceType") === "build" ? "New Build-outs and Installs (consultation)" : "Field Service and Repair";
      lines.push("Service type: " + typeLabel);
      lines.push("");
      lines.push("What's happening:");
      lines.push(data.get("serviceDetails") || "");
    }

    var subject = "Steady Ground — " + (kind === "skilling" ? "Skilling session request" : "Service call request") + " from " + data.get("firstName") + " " + data.get("lastName");
    var mailto = "mailto:alex@steadyground.co"
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(lines.join("\n"));

    window.location.href = mailto;
    sgShowToast("Opening your email app…", "Review the pre-filled message, then hit send from your email app to reach us.");
  });
})();
