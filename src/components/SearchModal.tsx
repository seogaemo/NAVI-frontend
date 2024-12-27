import { Fragment, useEffect, useState } from "react";

import BackSvg from "../assets/back.svg";
import MyLocationSvg from "../assets/my_location.svg";
import { useDebounce } from "../hooks/useDebounce";
import { getNearbyPointsLocationPointGet } from "../libs/api/endpoints/location/location";
import { searchPoiPoiSearchGet } from "../libs/api/endpoints/poi/poi";
import { Poi } from "../libs/api/schemas";

export type ModalType = "start" | "end";

interface Props {
  modalType: ModalType | null;
  onClose: () => void;
  handleSearch: (value: Poi) => void;
}

export const SearchModal = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [recommendations, setRecommendations] = useState<Poi[]>([]);

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      getNearbyPointsLocationPointGet({
        x: coords.latitude,
        y: coords.longitude,
      }).then((data) => {
        props.handleSearch(data[0]);
      });
    });
  };

  useEffect(() => {
    if (!debouncedSearchValue) return;

    searchPoiPoiSearchGet({
      searchKeyword: debouncedSearchValue,
    }).then((data) => {
      setRecommendations(data?.searchPoiInfo?.pois?.poi || []);
    });
  }, [debouncedSearchValue]);

  useEffect(() => {
    return () => {
      setRecommendations([]);
      setSearchValue("");
    };
  }, []);

  return (
    <>
      {props.modalType && (
        <div className="w-[100dvw] h-[100dvh] bg-white fixed top-0 left-0 z-20">
          <div className="flex justify-between items-center px-4 border-b">
            <button onClick={props.onClose}>
              <img src={BackSvg} alt="back" />
            </button>

            <div className="p-4 w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`${props.modalType === "start" ? "출발지" : "도착지"}를 입력하세요`}
                className="w-full"
              />
            </div>

            <button onClick={handleMyLocation}>
              <img src={MyLocationSvg} alt="my_location" />
            </button>
          </div>

          <div className="h-full overflow-x-hidden overflow-y-auto">
            {recommendations.map((poi, index) => (
              <Fragment key={index}>
                <button
                  className="w-full px-4 py-2 border-b-[1px]"
                  onClick={() => props.handleSearch(poi)}
                >
                  <div className="flex flex-col items-start">
                    <p>{poi.name}</p>
                    <p className="text-gray-400">{`${poi.newAddressList?.newAddress?.[0].fullAddressRoad}`}</p>
                  </div>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
