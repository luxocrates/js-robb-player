import { FC } from "react";
// import { CollapseButton } from "./CollapseButton";

export const Tracks: FC<{}> = () => {
  const trackInfo = (
    [0, 1, 2].map(
      (voice) => (
        <div key={voice} className={`voice${voice}`}>
          Track <span className="changingNumber">{voice}</span>
          <span>
            {" "}
            pos:
            {" "}
            <span
              id={`track${voice}pos`}
              className="changingNumber"
            >
              -
            </span>
            {" "}
            pat:
            {" "}
            <span
              id={`track${voice}pat`}
              className="changingNumber"
            >
              -
            </span>
            , offset
            {" "}
            <span
              id={`track${voice}patpos`}
              className="changingNumber"
            >
              -
            </span>
          </span>
        </div>
      )
    )
  );

  return (
    <>
      <h4>
        Tracks
        {/* <CollapseButton
          isExpanded={isTracksExpanded}
          onClick={() => setIsTracksExpanded((x) => !x)}
        /> */}
      </h4>

      { trackInfo }
    </>
  );
};
