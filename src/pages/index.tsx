import { useEffect, useState } from "react";

import { Map } from "../components/Map";
import { SearchBox } from "../components/SearchBox";
import { ModalType, SearchModal } from "../components/SearchModal";
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

  const [_, setRoutes] = useState<ProcessingResult | ProcessingMultiResult>();
  const [selectedRoute, setSelectedRoute] = useState<ProcessingResult | null>(
    null
  );

  useEffect(() => {}, [selectedRoute]);

  const openModal = (type: ModalType) => () => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleSearch = (value: Poi) => {
    if (modalType === "start") setStart(value);
    else setEnd(value);

    const _start = modalType === "start" ? value : start!;
    const _end = modalType === "end" ? value : end!;

    if (_start && _end) {
      const isClose = getDistance(_start, _end) / 1000 <= 1;

      const options: BodyType<PedestrianRouteRequest> = {
        endName: encodeURIComponent(_end.name!),
        endX: _end.frontLon!,
        endY: _end.frontLat!,
        startName: encodeURIComponent(_start.name!),
        startX: _start.frontLon!,
        startY: _start.frontLat!,
      };

      if (isClose)
        getSinglePedestrianRoutePedestrianSinglePost(options).then((res) => {
          setRoutes(res);
          setSelectedRoute(res);
        });
      else
        getMultiPedestrianRoutePedestrianMultiPost(options).then((res) => {
          setRoutes(res);
          setSelectedRoute(res.suggestion);
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

        <Map route={selectedRoute} />
      </div>

      <SearchModal
        key={modalType}
        modalType={modalType}
        onClose={closeModal}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default Index;
