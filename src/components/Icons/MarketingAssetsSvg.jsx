import './icon.scss';

const MarketingAssetsSvg = ({
  isActive = false,
  desktopSize = { width: 24, height: 24 },
  className = '',
  ...props
}) => {
  return (
    <svg
  className={`svg_icon ${isActive ? 'active' : ''} ${className}`}
  width={desktopSize.width}
  height={desktopSize.height}
  viewBox="0 0 28 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <path
    d="M14 6.5C14.9286 2.88146 18.4357 1.03381 26.0714 1.00001C26.1935 0.999552 26.3144 1.02295 26.4273 1.06886C26.5402 1.11476 26.6427 1.18227 26.729 1.26748C26.8154 1.35269 26.8837 1.45392 26.9302 1.56534C26.9768 1.67676 27.0005 1.79617 27 1.91667V18.4167C27 18.6598 26.9022 18.8929 26.728 19.0649C26.5539 19.2368 26.3177 19.3333 26.0714 19.3333C18.6429 19.3333 15.773 20.812 14 23M14 6.5C13.0714 2.88146 9.56433 1.03381 1.92858 1.00001C1.80651 0.999552 1.68555 1.02295 1.57268 1.06886C1.45982 1.11476 1.35727 1.18227 1.27095 1.26748C1.18463 1.35269 1.11625 1.45392 1.06975 1.56534C1.02325 1.67676 0.999546 1.79617 1.00001 1.91667V18.3061C1.00001 18.8721 1.35518 19.3333 1.92858 19.3333C9.35715 19.3333 12.2375 20.8229 14 23M14 6.5V23"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  );
};

export default MarketingAssetsSvg;
