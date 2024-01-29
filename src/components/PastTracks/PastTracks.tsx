import { useContext } from "react";
import { lfmContext } from "../ReactLastFMViewer";
import { FaRegUser, FaCalendar } from "react-icons/fa";
import styles from "@lastfm-viewer/ui/PastTracks.module.css";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const PastTracks = () => {
	const context = useContext(lfmContext);
	return (
		<>
			<div
				className={styles.pastTracks}
				style={{
					color: context.colors?.secondary,
					background: context.colors?.accent
				}}
			>
				<LoadingSkeleton className="h-[200px]" fallback={undefined}>
					<div
						className={styles.pastTracks__title}
						style={{
							color: context.colors?.secondary,
							background: context.colors?.primary
						}}
					>
						Past tracks
					</div>
					{context.track instanceof Error
						? ""
						: context.track?.pastTracks
								?.filter((_, idx) => idx !== 0)
								.map((track_) => {
									return (
										<div
											key={
												track_.date["#text"] +
												track_.name
											}
											className={styles.pastTracks__track}
										>
											<div className="divider m-0.5 h-min"></div>
											<div className={styles.scrollable}>
												<a
													href={track_.url}
													target="_blank"
													className={
														styles.pastTracks__trackTitle
													}
													style={{
														color: context.colors
															?.secondary
													}}
												>
													{track_.name}
												</a>
												<span
													className={
														styles.scrollable__artist
													}
													style={{
														color: context.colors
															?.secondary
													}}
												>
													<FaRegUser />
													{track_.artist["#text"]}
												</span>
												<span
													className={
														styles.scrollable__date
													}
													style={{
														color: context.colors
															?.secondary
													}}
												>
													<FaCalendar />
													{track_.date["#text"]}
												</span>
											</div>
										</div>
									);
								})}
				</LoadingSkeleton>
			</div>
		</>
	);
};

export default PastTracks;
