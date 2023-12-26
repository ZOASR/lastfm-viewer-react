import { createContext } from "react";
import { TrackInfo } from "./lastfm";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";
import ErrorView from "./ErrorView/ErrorView";
import CardFooter from "./CardFooter/CardFooter";

import { FaRegUser, FaCompactDisc } from "react-icons/fa";

import disc from "./disc.svg";
import "../index.css";
import styles from "./ReactLastFMViewer.module.css";
import { useLastfmViewer } from "./useLastfmViewer";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

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
	}
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
			<lfmContext.Provider value={{ colors: colors, track: track }}>
				<div
					className={
						styles.lfmvCard +
						" glass relative mx-auto flex h-full w-full flex-col rounded-lg p-4 shadow-xl ring-2 ring-slate-950/5"
					}
					style={{ background: colors?.primary }}
				>
					{track instanceof Error ? (
						<ErrorView message={message} />
					) : (
						<>
							<figure
								className="mx-auto mb-2 h-auto overflow-hidden rounded-lg border-inherit"
								style={{
									boxShadow: `0 0 20px ${colors?.secondary}99`
								}}
							>
								{track?.lastfmImages &&
								track?.lastfmImages[3]["#text"] ? (
									<img
										className="block h-full w-full overflow-hidden object-cover align-middle"
										src={track.lastfmImages[3]["#text"]}
										alt="Album Cover"
									/>
								) : track?.MBImages ? (
									<img
										className="block h-full w-full overflow-hidden object-cover align-middle"
										src={track.MBImages[0].image}
										alt="Album Cover"
									/>
								) : (
									<img
										src={disc}
										className=""
										alt="Default album cover thumbnail"
									/>
								)}
							</figure>

							<div className="flex h-min flex-col gap-1 drop-shadow-lg filter">
								{track?.nowplaying ? <TrackProgressBar /> : ""}
								<h1
									className="shadow:lg mx-auto mt-1 text-center text-xs font-bold sm:text-base"
									style={{ color: colors?.secondary }}
								>
									{loading ? (
										<div className="skeleton h-8 w-fit"></div>
									) : track?.trackName ? (
										track?.trackName
									) : (
										"Track title not available"
									)}
								</h1>
								<div
									style={{ color: colors?.secondary }}
									className="flex flex-col gap-2 text-xs"
								>
									<LoadingSkeleton
										user={user}
										api_key={api_key}
										updateInterval={updateInterval}
										fallbackMsg="Artist name not available"
									>
										{track?.artistName && (
											<span className="flex items-center justify-center gap-1">
												<FaRegUser />
												{track?.artistName}
											</span>
										)}
									</LoadingSkeleton>
									<LoadingSkeleton
										user={user}
										api_key={api_key}
										updateInterval={updateInterval}
										fallbackMsg="Album name not available"
									>
										{track?.albumTitle && (
											<span className="flex items-center justify-center gap-1">
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
