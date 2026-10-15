/* Applies details from js/config.js and handles the enquiry form. */
(function () {
  "use strict";
  var C = window.CLINIC || {};

  function toast(text) {
    var old = document.querySelector(".toast-msg");
    if (old) old.remove();
    var t = document.createElement("div");
    t.className = "toast-msg";
    t.setAttribute("role", "status");
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 4000);
  }

  // Replace placeholder text where a confirmed value exists
  function fill(key, value) {
    if (!value) return;
    document.querySelectorAll('[data-clinic="' + key + '"]').forEach(function (el) {
      el.textContent = value;
      el.classList.remove("ph");
    });
  }
  fill("phone", C.phoneDisplay);
  fill("address", C.address);
  fill("qualification", C.qualification);

  // Phone links
  document.querySelectorAll("[data-link='call']").forEach(function (a) {
    if (C.phoneDigits) {
      a.href = "tel:+" + C.phoneDigits;
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Phone number not added yet. Add it in js/config.js.");
      });
    }
  });

  // WhatsApp links
  document.querySelectorAll("[data-link='whatsapp']").forEach(function (a) {
    if (C.whatsappDigits) {
      a.href = "https://wa.me/" + C.whatsappDigits + "?text=" +
        encodeURIComponent("Hello, I would like to enquire about an appointment.");
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        toast("WhatsApp number not added yet. Add it in js/config.js.");
      });
    }
  });

  // Directions links
  document.querySelectorAll("[data-link='directions']").forEach(function (a) {
    if (C.mapsLink) {
      a.href = C.mapsLink; a.target = "_blank"; a.rel = "noopener";
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Map link not added yet. Add it in js/config.js.");
      });
    }
  });

  // Map embed
  var mapBox = document.getElementById("map-box");
  if (mapBox && C.mapsEmbed) {
    var f = document.createElement("iframe");
    f.className = "map-embed";
    f.src = C.mapsEmbed;
    f.loading = "lazy";
    f.title = "Map showing the clinic location";
    f.referrerPolicy = "no-referrer-when-downgrade";
    mapBox.replaceWith(f);
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Enquiry form
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        status.innerHTML = '<div class="notice">Please fill in the highlighted fields.</div>';
        return;
      }
      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var when = form.elements["preferred"].value;
      var note = form.elements["note"].value.trim();

      if (C.formMode === "whatsapp" && C.whatsappDigits) {
        var msg = "Appointment enquiry\nName: " + name + "\nPhone: " + phone +
          "\nPreferred time: " + when + (note ? "\nNote: " + note : "");
        window.open("https://wa.me/" + C.whatsappDigits + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
        status.innerHTML = '<div class="notice">WhatsApp has opened with your enquiry. Press send in WhatsApp to deliver it.</div>';
        return;
      }
      status.innerHTML = '<div class="notice"><strong>Enquiry not sent.</strong> This form is not connected yet. ' +
        'Please call or WhatsApp the clinic for now.</div>';
    });
  }
})();
