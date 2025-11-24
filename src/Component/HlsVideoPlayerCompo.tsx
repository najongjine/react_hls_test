import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// 타입 정의
type VideoJsPlayer = ReturnType<typeof videojs>;

interface HlsVideoPlayerProps {
  url: string;
}

const HlsVideoPlayerCompo: React.FC<HlsVideoPlayerProps> = ({ url }) => {
  // videoRef 대신 컨테이너 역할을 할 divRef를 사용합니다.
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    // 1. 컨테이너가 없으면 중단
    if (!containerRef.current) return;

    // 2. 비디오 플레이어가 이미 초기화되어 있지 않은 경우에만 새로 생성
    if (!playerRef.current) {
      // 동적으로 video element 생성 (React StrictMode 이슈 방지 핵심)
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");

      // 생성한 비디오 태그를 컨테이너에 부착
      containerRef.current.appendChild(videoElement);

      // 옵션 설정
      const options = {
        autoplay: false, // 정책상 음소거 없이는 자동재생이 막힐 수 있음 (true 시 muted: true 권장)
        controls: true,
        responsive: true,
        fluid: true, // 부모 컨테이너 크기에 맞춤
        sources: [
          {
            src: url,
            type: "application/x-mpegURL",
          },
        ],
      };

      // Player 초기화
      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("✅ Player Ready!");
      }));
    } else {
      // 3. 이미 플레이어가 있다면 소스만 교체 (url이 바뀔 때)
      const player = playerRef.current;
      player.src({ src: url, type: "application/x-mpegURL" });
    }
  }, [url]);

  // 4. 컴포넌트 해제 시 정리
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []); // 빈 배열: 컴포넌트가 완전히 사라질 때만 실행

  return (
    // Video.js는 fluid: true일 때 부모의 너비를 따라가므로 width 지정 필요
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <div data-vjs-player>
        {/* 이 div 안에 자바스크립트로 video 태그가 생성됩니다 */}
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default HlsVideoPlayerCompo;
