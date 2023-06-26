const overlay = document.querySelector("#overlayBg");
const overlay1 = document.querySelector("#overlayBg1");
const modalDisclaimer = document.querySelector("#popupDisclaimer");
const modalPrivacy = document.querySelector("#popupPrivacy");

function disclaimerOpen(value) {
  if (value) {
    overlay.classList.add("flex");
    overlay.classList.remove("hidden");
    setTimeout(() => {
      modalDisclaimer.classList.remove("opacity-0");
      modalDisclaimer.classList.remove("-translate-y-full");
    }, 150);
  } else {
    modalDisclaimer.classList.add("-translate-y-full");
    setTimeout(() => modalDisclaimer.classList.add("opacity-0"), 150);
    setTimeout(() => overlay.classList.add("hidden"), 150);
  }
}

function privacyOpen(value) {
  if (value) {
    overlay1.classList.add("flex");
    overlay1.classList.remove("hidden");
    setTimeout(() => {
      modalPrivacy.classList.remove("opacity-0");
      modalPrivacy.classList.remove("-translate-y-full");
    }, 150);
  } else {
    modalPrivacy.classList.add("-translate-y-full");
    setTimeout(() => modalPrivacy.classList.add("opacity-0"), 150);
    setTimeout(() => overlay1.classList.add("hidden"), 150);
  }
}
