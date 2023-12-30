import { useContext } from "react";
import { lfmContext } from "../ReactLastFMViewer";
import styles from "@repo/ui/TrackProgressBar.module.css";

const msToMins = (ms: number) =>
	Math.floor(ms / 1000 / 60).toLocaleString(undefined, {
		maximumSignificantDigits: 2
	});
const msToSecs = (ms: number) =>
	Math.floor((ms / 1000) % 60).toLocaleString(undefined, {
		maximumSignificantDigits: 2
	});

const TrackProgressBar = () => {
	const context = useContext(lfmContext);
	return (
		<>
			<div className={styles.trackProgress}>
				<span className={styles.nowplaying}> Now Playing</span>
				<div className={styles.icon}>
					<span
						className={styles.musicbar}
						style={{
							background: context?.colors?.secondary
						}}
					/>
					<span
						className={styles.musicbar}
						style={{
							background: context?.colors?.secondary
						}}
					/>
					<span
						className={styles.musicbar}
						style={{
							background: context?.colors?.secondary
						}}
					/>
				</div>
			</div>
			<div
				className={styles.bar}
				style={{ color: context?.colors?.secondary }}
			>
				<span className="text-xs">00:00</span>
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
				<span className="text-xs">
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
