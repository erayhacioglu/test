export function applyTheme(theme) {
  const root = document.documentElement;

  console.log('theme', theme)

  if(!theme) return;

  root.style.setProperty('--primaryColor', theme.primaryColor);
  root.style.setProperty('--backgroundColor', theme.backgroundColor);
  root.style.setProperty('--headerBackgroundColor', theme.headerBackgroundColor);
  root.style.setProperty('--textColor', theme.textColor);
  root.style.setProperty('--menuBackgroundColor', theme.menuBackgroundColor);
  root.style.setProperty('--activeMenuBackgroundColor', theme.activeMenuBackgroundColor);
  root.style.setProperty('--activeMenuColor', theme.activeMenuColor);
  root.style.setProperty('--titleBackground', theme.titleBackground);
  root.style.setProperty('--submitButtonBackgroundColor', theme.submitButtonBackgroundColor);
  root.style.setProperty('--linkBackgroundColor', theme.linkBackgroundColor);
  root.style.setProperty('--labelColor', theme.labelColor);
  root.style.setProperty('--jobColor', theme.jobColor);
}