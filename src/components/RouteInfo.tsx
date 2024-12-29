import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import { ProcessingResult } from "../libs/api/schemas";
import { Points } from "./Points";

interface Props {
  route: ProcessingResult;
  backward?: () => void;
}

export const RouteInfo = ({ route, backward }: Props) => {
  console.log(route);
  const [pointsShow, setPointsShow] = useState(false);

  return (
    <>
      <BottomSheet
        className="z-[1000]"
        blocking={false}
        open={true}
        snapPoints={({ maxHeight }) => [200, maxHeight / 2]}
      >
        <div className="px-4 flex flex-col">
          <div className="py-2 flex flex-row justify-between">
            <button
              onClick={backward}
              className="text-blue-500 text-sm font-bold"
            >
              뒤로
            </button>
            {route.points.length && (
              <button
                onClick={() => setPointsShow(true)}
                className="text-blue-500 text-sm font-bold"
              >
                사용된 Point
              </button>
            )}
          </div>
          <p>Walkablity Index: {route.walkablityIndex.toFixed(2)}</p>
          <p>사용된 Point 개수: {route.points.length}</p>
        </div>
      </BottomSheet>
      {pointsShow && (
        <Points points={route.points} close={() => setPointsShow(false)} />
      )}
    </>
  );
};
