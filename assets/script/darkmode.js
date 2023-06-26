// Function to check if the dark theme is enabled
function isDarkThemeEnabled() {
  return (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
var themeToggleBtn = document.getElementById('theme-toggle');

// On page load or when changing themes, set the initial theme
if (isDarkThemeEnabled()) {
  document.documentElement.classList.add('dark');
  themeToggleLightIcon.classList.remove('hidden');
} else {
  document.documentElement.classList.remove('dark');
  themeToggleDarkIcon.classList.remove('hidden');
}

// Function to toggle the theme
function toggleTheme() {
  // Toggle icons inside the button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // Toggle the dark class on the document element and update local storage
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  }
}

// Add click event listener to the theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);