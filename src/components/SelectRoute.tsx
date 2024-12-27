import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { ProcessingMultiResult, ProcessingResult } from "../libs/api/schemas";

interface Props {
  routes: ProcessingMultiResult | null;
  setRoute: (route: ProcessingResult) => void;
}

const routeOptions: {
  key: "suggestion" | "shortest" | "boulevard";
  title: string;
}[] = [
  {
    key: "suggestion",
    title: "추천 경로",
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
  return (
    <BottomSheet
      className="z-[1000]"
      blocking={false}
      open={true}
      snapPoints={({ maxHeight }) => [200, maxHeight / 2]}
    >
      <div className="px-4 flex flex-col gap-2">
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
              {((routes?.[option.key]?.distance ?? 0) / 1000).toFixed(1)} km
            </h1>

            <p className="text-sm text-gray-500">
              {((routes?.[option.key].time ?? 0) / 60).toFixed(0)}분
            </p>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
};
