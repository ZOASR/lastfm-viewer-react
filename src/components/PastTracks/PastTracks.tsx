import { useContext } from "react";
import { lfmContext } from "../ReactLastFMViewer";
import { MdOutlinePerson3 } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
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
					className="divider w-1/2 sm:text-sm text-xs mx-auto mb-0 mt-0.5 rounded-lg p-2"
					style={{
						color: context.colors?.secondary,
					}}
				>
					Past tracks
				</div>
				<ol>
					{context.track?.pastTracks
						? cloneArray(context.track?.pastTracks)
								.splice(1, context.track?.pastTracks.length)
								.map((track_) => {
									return (
										<li
											key={track_.date["#text"]}
											className={styles.varText}
										>
											<div className="divider m-0.5 h-min"></div>
											<div className="flex gap-1 justify-around items-center">
												<a
													href={track_.url}
													target="_blank"
													className="hover:underline transition-all duration-150"
												>
													<span
														className="flex items-center rounded-lg font-black"
														style={{
															color: context
																.colors
																?.secondary,
														}}
													>
														{track_.name}
													</span>
												</a>
												<span
													className="flex items-center sm:flex-row flex-col rounded-lg"
													style={{
														color: context.colors
															?.secondary,
													}}
												>
													<MdOutlinePerson3 />
													{track_.artist["#text"]}
												</span>
												<span
													className="flex sm:flex-row flex-col items-center rounded-lg "
													style={{
														color: context.colors
															?.secondary,
													}}
												>
													<CiCalendarDate />
													{track_.date["#text"]}
												</span>
											</div>
										</li>
									);
								})
						: ""}
				</ol>
			</div>
		</>
	);
};

export default PastTracks;
