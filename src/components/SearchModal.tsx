import { useEffect, useState } from "react";

import BackSvg from "../assets/back.svg";
import { useDebounce } from "../hooks/useDebounce";
import { searchPoiPoiSearchGet } from "../libs/api/endpoints/poi/poi";
import { Poi } from "../libs/api/schemas";

export type ModalType = "start" | "end";

interface Props {
  modalType: ModalType | null;
  onClose: () => void;
  handleSearch: (value: string) => void;
}

export const SearchModal = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [recommendations, setRecommendations] = useState<Poi[]>([]);

  useEffect(() => {
    if (!debouncedSearchValue) return;

    searchPoiPoiSearchGet({
      searchKeyword: debouncedSearchValue,
    }).then((data) => {
      console.log(data);
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
        <div className="w-[100vw] h-[100dvh] bg-white absolute top-0 left-0 z-20">
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
          </div>

          <div>
            {recommendations.map((poi, index) => (
              <div key={index}>
                <button onClick={() => props.handleSearch(poi.name ?? "")}>
                  {poi.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
