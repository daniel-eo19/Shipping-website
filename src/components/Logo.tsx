export function LogoHeader() {
  return (
    <svg width="210" height="54" viewBox="0 0 210 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Double chevron mark */}
      <polygon points="0,10 20,27 0,44" fill="#d4af37"/>
      <polygon points="14,10 34,27 14,44" fill="#2d1b69"/>
      {/* Wordmark */}
      <text x="42" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="21" fill="#2d1b69">FREEHOLD</text>
      <text x="42" y="46" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="10" fill="#d4af37" letterSpacing="3">EXPRESS SERVICES</text>
    </svg>
  );
}

export function LogoFooter() {
  return (
    <svg width="210" height="54" viewBox="0 0 210 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Double chevron mark */}
      <polygon points="0,10 20,27 0,44" fill="#d4af37"/>
      <polygon points="14,10 34,27 14,44" fill="rgba(255,255,255,0.85)"/>
      {/* Wordmark */}
      <text x="42" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="21" fill="#ffffff">FREEHOLD</text>
      <text x="42" y="46" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="10" fill="#d4af37" letterSpacing="3">EXPRESS SERVICES</text>
    </svg>
  );
}
