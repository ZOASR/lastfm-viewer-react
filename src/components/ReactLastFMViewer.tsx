import { createContext } from "react";
import { Colors, TrackInfo } from "@lastfm-viewer/utils/types";
import { useLastfmViewer } from "./useLastfmViewer";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";
import ErrorView from "./ErrorView/ErrorView";
import CardFooter from "./CardFooter/CardFooter";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

import { FaRegUser, FaCompactDisc } from "react-icons/fa";
import { BsDiscFill } from "react-icons/bs";

import styles from "@lastfm-viewer/ui/LastFMViewer.module.css";
import "@lastfm-viewer/ui";

export interface Props {
	api_key: string;
	user: string;
	updateInterval?: number;
	mode?: "dev" | "prod";
}

export const lfmContext = createContext<{
	colors: Colors | undefined;
	track: TrackInfo | Error | undefined;
	loading: boolean;
}>({
	colors: {
		primary: "white",
		secondary: "black",
		accent: "#aaa",
		coverShadowColor: undefined
	},
	track: {
		trackName: "",
		artistName: "",
		albumTitle: "",
		colors: undefined,
		imageUrl: undefined,
		nowplaying: false,
		pastTracks: [],
		duration: 0
	},
	loading: true
});

const ReactLastFMViewer = ({
	api_key,
	user,
	updateInterval,
	mode = "dev"
}: Props) => {
	const { track, colors, loading, message } = useLastfmViewer({
		api_key,
		user,
		updateInterval
	});

	return (
		<>
			{/* preconnects */}
			<link href="https://lastfm.freetls.fastly.net" rel="preconnect" />
			<link href="https://archive.org" rel="preconnect" />
			<link href="https://coverartarchive.org" rel="preconnect" />
			<link href="https://musicbrainz.org" rel="preconnect" />
			<link href="https://ws.audioscrobbler.com" rel="preconnect" />
			{/* preconnects */}
			<lfmContext.Provider
				value={{ colors: colors, track: track, loading: loading }}
			>
				<div
					className={styles.lfmvCard}
					style={{ background: colors?.primary }}
					data-lfmv="dark"
				>
					<div data-lfmv="">
						{track instanceof Error ? (
							<ErrorView mode={mode} message={message} />
						) : (
							<>
								<div>
									<figure
										style={{
											filter: ` drop-shadow(0 0 20px ${colors?.coverShadowColor} ) `
										}}
									>
										{track?.imageUrl ? (
											<img
												src={track.imageUrl}
												alt="Album Cover"
											/>
										) : (
											<LoadingSkeleton
												className="mx-auto h-[300px] w-[300px]"
												fallback={
													<div
														className={`h-[300px] [color:var(--default-secondary)] ${track?.nowplaying && "!animate-spin-slow"}`}
													>
														<BsDiscFill className="h-full w-full" />
													</div>
													// <img
													// 	src={disc}
													// 	alt="Default album cover thumbnail"
													// />
												}
											>
												{null}
											</LoadingSkeleton>
										)}
									</figure>
									<LoadingSkeleton
										className="mx-auto h-[40px] w-[90%]"
										fallback={null}
									>
										{track?.nowplaying && (
											<TrackProgressBar />
										)}
									</LoadingSkeleton>
									<h1
										className={styles.trackTitle}
										style={{ color: colors?.secondary }}
									>
										<LoadingSkeleton
											className={styles.titleSkeleton}
											fallback="Track title not available"
										>
											{track?.artistName && (
												<span
													className={styles.infoSpan}
												>
													{track?.trackName}
												</span>
											)}
										</LoadingSkeleton>
									</h1>
									<div
										style={{ color: colors?.secondary }}
										className="flex flex-col gap-2"
									>
										<LoadingSkeleton
											className={styles.titleSkeleton}
											fallback="Artist name not available"
										>
											{track?.artistName && (
												<span
													className={styles.infoSpan}
												>
													<FaRegUser />
													{track?.artistName}
												</span>
											)}
										</LoadingSkeleton>
										<LoadingSkeleton
											className={styles.titleSkeleton}
											fallback="Album name not available"
										>
											{track?.albumTitle && (
												<span
													className={styles.infoSpan}
												>
													<FaCompactDisc />
													{track?.albumTitle}
												</span>
											)}
										</LoadingSkeleton>
									</div>
								</div>
								<div className={styles.cardBody}>
									<PastTracks />
									<CardFooter user={user} colors={colors} />
								</div>
							</>
						)}
					</div>
				</div>
			</lfmContext.Provider>
		</>
	);
};

export default ReactLastFMViewer;
