import { useContext } from "react";
import { lfmContext } from "../ReactLastFMViewer";
import { msToMins, msToSecs } from "@lastfm-viewer/utils/utils";

const TrackProgressBar = () => {
	const context = useContext(lfmContext);
	return (
		<>
			<div className={`trackProgress`}>
				<span className={`nowplaying`}> Now Playing</span>
				<div className={`icon`}>
					<span
						className={`musicbar`}
						style={{
							background: context?.colors?.secondary
						}}
					/>
					<span
						className={`musicbar`}
						style={{
							background: context?.colors?.secondary
						}}
					/>
					<span
						className={`musicbar`}
						style={{
							background: context?.colors?.secondary
						}}
					/>
				</div>
			</div>
			<div
				className={`bar`}
				style={{ color: context?.colors?.secondary }}
			>
				<span>00:00</span>
				<progress
					className="progress"
					max={
						context.track instanceof Error
							? 0
							: context.track
								? context.track?.duration / 1000
								: 0
					}
				></progress>
				<span>
					{context.track instanceof Error
						? " "
						: context.track
							? context.track.duration > 0
								? `${msToMins(
										context.track?.duration
									)}:${msToSecs(context.track?.duration)}`
								: "--:--"
							: "--:--"}
				</span>
			</div>
		</>
	);
};

export default TrackProgressBar;
