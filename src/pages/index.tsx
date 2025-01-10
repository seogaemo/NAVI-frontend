import { useState } from "react";
import { PacmanLoader } from "react-spinners";

import { Map } from "../components/Map";
import { RouteInfo } from "../components/RouteInfo";
import { SearchBox } from "../components/SearchBox";
import { ModalType, SearchModal } from "../components/SearchModal";
import { SelectRoute } from "../components/SelectRoute";
import { BodyType } from "../libs/api/custom-instance";
import {
  getMultiPedestrianRoutePedestrianMultiPost,
  getSinglePedestrianRoutePedestrianSinglePost,
} from "../libs/api/endpoints/pedestrian/pedestrian";
import {
  PedestrianRouteRequest,
  Poi,
  ProcessingMultiResult,
  ProcessingResult,
} from "../libs/api/schemas";
import { getDistance } from "../utils/distance";

function Index() {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const [start, setStart] = useState<Poi | null>(null);
  const [end, setEnd] = useState<Poi | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [routes, setRoutes] = useState<
    ProcessingResult | ProcessingMultiResult
  >();
  const [selectedRoute, setSelectedRoute] = useState<ProcessingResult | null>(
    null
  );

  const [detailModal, setDetailModal] = useState(false);

  const openModal = (type: ModalType) => () => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleSearch = (value: Poi) => {
    if (modalType === "start") setStart(value);
    else setEnd(value);

    const _start = modalType === "start" ? value : start!;
    const _end = modalType === "end" ? value : end!;

    if (_start && _end) {
      const isClose = getDistance(_start, _end) / 1000 <= 0.1; // 100m 이내는 단일 경로 처리

      const options: BodyType<PedestrianRouteRequest> = {
        endName: encodeURIComponent(_end.name!),
        endX: _end.frontLon!,
        endY: _end.frontLat!,
        startName: encodeURIComponent(_start.name!),
        startX: _start.frontLon!,
        startY: _start.frontLat!,
      };

      setSelectedRoute(null);
      setIsLoading(true);

      if (isClose)
        getSinglePedestrianRoutePedestrianSinglePost(options).then((res) => {
          setRoutes(res);
          setSelectedRoute(res);
          setIsLoading(false);
        });
      else
        getMultiPedestrianRoutePedestrianMultiPost(options).then((res) => {
          setRoutes(res);
          setSelectedRoute(
            Object.values(res).reduce((prev, curr) =>
              prev.walkablityIndex > curr.walkablityIndex ? prev : curr
            )
          );
          setIsLoading(false);
        });
    }

    closeModal();
  };

  return (
    <>
      <div className="relative w-[100vw] h-[100dvh]">
        <SearchBox
          start={[start, setStart]}
          end={[end, setEnd]}
          openModal={openModal}
          setEnd={setEnd}
          setStart={setStart}
        />

        <Map route={selectedRoute} routes={routes} />
      </div>

      <SearchModal
        key={modalType}
        modalType={modalType}
        onClose={closeModal}
        handleSearch={handleSearch}
      />

      {detailModal && selectedRoute ? (
        <RouteInfo
          route={selectedRoute}
          backward={
            routes && "suggestion" in routes
              ? () => setDetailModal(false)
              : undefined
          }
        />
      ) : (
        routes &&
        "boulevard" in routes &&
        "shortest" in routes &&
        "suggestion" in routes && (
          <SelectRoute
            routes={routes}
            setRoute={(route: ProcessingResult) => {
              setSelectedRoute(route);
              setDetailModal(true);
            }}
          />
        )
      )}

      {isLoading && (
        <div className="fixed w-[100vw] h-[100dvh] z-[10000] top-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
          <PacmanLoader color="#ffffff" />
        </div>
      )}
    </>
  );
}

export default Index;
