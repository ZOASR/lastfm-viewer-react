import { createContext } from "react";
import { TrackInfo } from "@repo/utils/lastftm";
import { useLastfmViewer } from "./useLastfmViewer";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";
import ErrorView from "./ErrorView/ErrorView";
import CardFooter from "./CardFooter/CardFooter";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

import { FaRegUser, FaCompactDisc } from "react-icons/fa";

import styles from "@repo/ui/LastFMViewer.module.css";
import disc from "./disc.svg";
import "@repo/ui";

export interface Colors {
	primary: string | undefined;
	secondary: string | undefined;
	accent: string | undefined;
}
export interface Props {
	api_key: string;
	user: string;
	updateInterval?: number;
}

export const lfmContext = createContext<{
	colors: Colors | undefined;
	track: TrackInfo | Error | undefined;
	loading: boolean;
}>({
	colors: { primary: "white", secondary: "black", accent: "#aaa" },
	track: {
		trackName: "",
		artistName: "",
		albumTitle: "",
		MBImages: [],
		lastfmImages: [],
		nowplaying: false,
		pastTracks: [],
		duration: 0
	},
	loading: true
});

const ReactLastFMViewer = ({ api_key, user, updateInterval }: Props) => {
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
			<link href="http://coverartarchive.org" rel="preconnect" />
			<link href="https://musicbrainz.org" rel="preconnect" />
			<link href="http://ws.audioscrobbler.com" rel="preconnect" />
			{/* preconnects */}
			<lfmContext.Provider
				value={{ colors: colors, track: track, loading: loading }}
			>
				<div
					className={styles.lfmvCard}
					style={{ background: colors?.primary }}
				>
					{track instanceof Error ? (
						<ErrorView message={message} />
					) : (
						<>
							<figure
								style={{
									boxShadow: `0 0 20px ${colors?.secondary}99`
								}}
							>
								{track?.lastfmImages &&
								track?.lastfmImages[3]["#text"] ? (
									<img
										src={track.lastfmImages[3]["#text"]}
										alt="Album Cover"
									/>
								) : track?.MBImages ? (
									<img
										src={track.MBImages[0].image}
										alt="Album Cover"
									/>
								) : (
									<LoadingSkeleton
										className="mx-auto h-[300px] w-[300px]"
										fallback={
											<img
												src={disc}
												alt="Default album cover thumbnail"
											/>
										}
									>
										{null}
									</LoadingSkeleton>
								)}
							</figure>

							<div className={styles.cardBody}>
								<LoadingSkeleton
									className="mx-auto h-[40px] w-[90%]"
									fallback={null}
								>
									{track?.nowplaying && <TrackProgressBar />}
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
											<span className={styles.infoSpan}>
												{track?.trackName}
											</span>
										)}
									</LoadingSkeleton>
								</h1>
								<div
									style={{ color: colors?.secondary }}
									className="flex flex-col gap-2 text-xs"
								>
									<LoadingSkeleton
										className={styles.titleSkeleton}
										fallback="Artist name not available"
									>
										{track?.artistName && (
											<span className={styles.infoSpan}>
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
											<span className={styles.infoSpan}>
												<FaCompactDisc />
												{track?.albumTitle}
											</span>
										)}
									</LoadingSkeleton>
								</div>
								<PastTracks />
								<CardFooter user={user} colors={colors} />
							</div>
						</>
					)}
				</div>
			</lfmContext.Provider>
		</>
	);
};

export default ReactLastFMViewer;
