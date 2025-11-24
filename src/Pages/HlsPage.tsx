import React, { useEffect, useRef, useState } from "react";
import HlsVideoPlayerCompo from "../Component/HlsVideoPlayerCompo";

// ---- 에디터 쉘
export default function HlsPage() {
  const hlsUrl =
    "https://res.cloudinary.com/dxbtexbak/video/upload/sp_auto/v1763963974/video/mszvw30iyd5jdfjjdcmc.m3u8";

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Cloudinary HLS 스트리밍</h2>
      <HlsVideoPlayerCompo url={hlsUrl} />
    </div>
  );
}
