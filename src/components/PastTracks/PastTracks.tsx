import { useContext } from "react";
import { lfmContext } from "../ReactLastFMViewer";
import { FaRegUser, FaCalendar } from "react-icons/fa";
import styles from "./PastTracks.module.css";

const identity: (x: any) => any = (x: any) => x;
function cloneArray(arr: any[]) {
	return arr.map(identity);
}

const PastTracks = () => {
	const context = useContext(lfmContext);
	return (
		<>
			<div
				className="mb-4 rounded-lg p-0.5 sm:p-4"
				style={{
					color: context.colors?.secondary,
					background: context.colors?.accent + "22"
				}}
			>
				<div
					className="divider mx-auto mb-0 mt-0.5 w-1/2 rounded-lg p-2 text-xs sm:text-sm"
					style={{
						color: context.colors?.secondary,
						background: context.colors?.accent + "22"
					}}
				>
					Past tracks
				</div>
				{context.track instanceof Error
					? ""
					: context.track?.pastTracks
						? cloneArray(context.track?.pastTracks)
								.splice(1, context.track?.pastTracks.length)
								.map((track_) => {
									return (
										<div
											key={
												track_.date["#text"] +
												track_.name
											}
											className="text-[50%]  sm:text-[75%]"
										>
											<div className="divider m-0.5 h-min"></div>
											<div
												className={
													"width-full  flex items-center justify-between gap-4 overflow-x-scroll whitespace-nowrap " +
													styles.scrollable
												}
											>
												<a
													href={track_.url}
													target="_blank"
													className="flex-1 text-ellipsis text-start font-black transition-all duration-150 hover:underline"
													style={{
														color: context.colors
															?.secondary
													}}
												>
													{track_.name}
												</a>
												<span
													className="flex flex-1 flex-col items-center sm:flex-row "
													style={{
														color: context.colors
															?.secondary
													}}
												>
													<FaRegUser />
													{track_.artist["#text"]}
												</span>
												<span
													className="flex flex-col items-center sm:flex-row "
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
								})
						: ""}
			</div>
		</>
	);
};

export default PastTracks;
