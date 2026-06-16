const themes = {
  kindness: {
    title: "Choose Kindness",
    subtitle: "Words matter. Build safer communities online.",
    description:
      "This filter promotes kind language and reminds people that positive words can help create safer online spaces."
  },
  antiBullying: {
    title: "Stop Bullying",
    subtitle: "Respect people online and speak with empathy.",
    description:
      "This filter raises awareness about online bullying and encourages users to create respectful, supportive digital communities."
  },
  support: {
    title: "You Are Not Alone",
    subtitle: "Support, empathy, and care can make a difference.",
    description:
      "This filter highlights emotional support and reminds people that a caring online community can help others feel seen and valued."
  }
};

const buttons = document.querySelectorAll(".theme-btn");
const filterTitle = document.getElementById("filterTitle");
const filterSubtitle = document.getElementById("filterSubtitle");
const themeDescription = document.getElementById("themeDescription");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const themeKey = button.dataset.theme;
    const theme = themes[themeKey];

    filterTitle.textContent = theme.title;
    filterSubtitle.textContent = theme.subtitle;
    themeDescription.textContent = theme.description;

    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});