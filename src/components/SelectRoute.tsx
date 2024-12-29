import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { ProcessingMultiResult, ProcessingResult } from "../libs/api/schemas";

interface Props {
  routes: ProcessingMultiResult;
  setRoute: (route: ProcessingResult) => void;
}

const routeOptions: {
  key: "suggestion" | "shortest" | "boulevard";
  title: string;
}[] = [
  {
    key: "suggestion",
    title: "TMAP 추천 경로",
  },
  {
    key: "shortest",
    title: "최소 시간",
  },
  {
    key: "boulevard",
    title: "큰길 우선",
  },
];

export const SelectRoute = ({ routes, setRoute }: Props) => {
  const [walkablityBestRoute, setWalkablityBestRoute] =
    useState<ProcessingResult>(routes.suggestion);

  Object.values(routes).forEach((route) => {
    if (route.walkablityIndex > walkablityBestRoute.walkablityIndex) {
      setWalkablityBestRoute(route);
    }
  });

  return (
    <BottomSheet
      className="z-[1000] *:*:scrollbar-hide"
      blocking={false}
      open={true}
      snapPoints={({ maxHeight }) => [200, maxHeight / 2]}
    >
      <div className="px-4 flex flex-col gap-2">
        {walkablityBestRoute.walkablityIndex > 0 && (
          <button
            onClick={() => {
              if (routes) setRoute(walkablityBestRoute);
            }}
            className="w-full border-gray-100 flex flex-col justify-start px-2 py-1"
          >
            <p className="text-sm text-blue-700">Walkablity Index 기반 추천</p>
            <h1 className="text-2xl font-bold text-gray-800">
              {((walkablityBestRoute.distance ?? 0) / 1000).toFixed(1)} km
            </h1>

            <p className="text-sm text-gray-500">
              {((walkablityBestRoute.time ?? 0) / 60).toFixed(0)}분 / 점수:{" "}
              {walkablityBestRoute.walkablityIndex.toFixed(2)}
            </p>
          </button>
        )}
        {routeOptions.map((option) => (
          <button
            onClick={() => {
              if (routes) setRoute(routes[option.key]);
            }}
            key={option.key}
            className="w-full border-gray-100 flex flex-col justify-start px-2 py-1"
          >
            <p className="text-sm text-blue-700">{option.title}</p>
            <h1 className="text-2xl font-bold text-gray-800">
              {((routes[option.key].distance ?? 0) / 1000).toFixed(1)} km
            </h1>

            <p className="text-sm text-gray-500">
              {((routes[option.key].time ?? 0) / 60).toFixed(0)}분 / 점수:{" "}
              {routes[option.key].walkablityIndex.toFixed(2)}
            </p>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
};
