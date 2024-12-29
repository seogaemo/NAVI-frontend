import { createPortal } from "react-dom";

import { Point } from "../libs/api/schemas";

interface Props {
  points: Point[];
  close: () => void;
}

export const Points = ({ points, close }: Props) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[1001] bg-[rgba(0,0,0,0.5)] w-screen h-dvh flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="w-11/12 snap-x snap-mandatory scrollbar-hide overflow-x-scroll pt-4 px-4 pb-3 bg-white rounded-md flex flex-row gap-2">
        {points.map((point, i) => (
          <div
            key={point.id || i}
            className="snap-center min-w-full h-full flex flex-col gap-2"
          >
            <img
              src={`${import.meta.env.VITE_CDN_URL}/${point.id}.jpg`}
              alt={point.video}
              className="w-full h-full rounded-md"
            />
            <div className="flex flex-row justify-between pr-4">
              <div className="flex flex-col">
                <span>{point.id}</span>
                <span>
                  {point.lat} {point.lng} {point.speed}m/s
                </span>
                <span>{point.video}</span>
              </div>
              <button
                className="text-blue-500 text-sm font-bold"
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_API_URL}/image/predicted?pointId=${point.id}`,
                    "_blank"
                  )
                }
              >
                예측 이미지 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};