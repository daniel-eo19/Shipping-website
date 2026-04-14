"use client";

import Script from "next/script";

export default function TawkChat() {
  return (
    <>
      <Script id="tawk-init" strategy="afterInteractive">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();`}
      </Script>
      <Script
        id="tawk-script"
        src="https://embed.tawk.to/69de40ac5b7c241c31f4a987/1jm62p97j"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
