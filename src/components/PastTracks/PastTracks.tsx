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
				className="mb-4 rounded-lg sm:p-4 p-0.5"
				style={{
					color: context.colors?.secondary,
					background: context.colors?.accent + "22",
				}}
			>
				<div
					className="divider w-1/2 sm:text-sm text-xs mx-auto mb-0 mt-0.5 rounded-lg p-4"
					style={{
						color: context.colors?.secondary,
						background: context.colors?.accent + "22",
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
										key={track_.date["#text"] + track_.name}
										className="sm:text-[75%]  text-[50%]"
									>
										<div className="divider m-0.5 h-min"></div>
										<div
											className={
												"flex gap-1 justify-between items-center gap-4 overflow-x-scroll whitespace-nowrap width-full " +
												styles.scrollable
											}
										>
											<a
												href={track_.url}
												target="_blank"
												className="hover:underline transition-all duration-150 flex-1 font-black text-ellipsis"
												style={{
													color: context.colors
														?.secondary,
												}}
											>
												{track_.name}
											</a>
											<span
												className="flex items-center sm:flex-row flex-col flex-1 "
												style={{
													color: context.colors
														?.secondary,
												}}
											>
												<FaRegUser />
												{track_.artist["#text"]}
											</span>
											<span
												className="flex sm:flex-row flex-col items-center "
												style={{
													color: context.colors
														?.secondary,
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
