import { createContext } from "react";
import { useLastfmViewer } from "./useLastfmViewer";
import { FaRegUser, FaCompactDisc } from "react-icons/fa";
import { BsDiscFill } from "react-icons/bs";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";
import ErrorView from "./ErrorView/ErrorView";
import CardFooter from "./CardFooter/CardFooter";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

import { Colors, TrackInfo } from "@lastfm-viewer/utils/types";
import "@lastfm-viewer/ui/styles/LastFMViewer.css";
import "@lastfm-viewer/ui/styles/ErrorView.css";
import "@lastfm-viewer/ui/styles/PastTracks.css";
import "@lastfm-viewer/ui/styles/TrackProgressBar.css";
import "@lastfm-viewer/ui/styles/CardFooter.css";
import "@lastfm-viewer/ui/styles";

export interface Props {
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

const ReactLastFMViewer = ({ user, updateInterval, mode = "dev" }: Props) => {
	const { track, colors, loading } = useLastfmViewer({
		user,
		updateInterval
	});

	return (
		<>
			{/* preconnects */}
			<link href="https://lastfm.freetls.fastly.net" rel="preconnect" />
			<link href="https://coverartarchive.org" rel="preconnect" />
			<link
				href="https://lastfm-viewer-api.cloudflare-untying955.workers.dev"
				rel="preconnect"
			/>
			{/* preconnects */}
			<lfmContext.Provider
				value={{ colors: colors, track: track, loading: loading }}
			>
				<div
					className={`lfmvCard`}
					style={{ background: colors?.primary }}
					data-lfmv="dark"
				>
					<div data-lfmv="">
						{track instanceof Error ? (
							<ErrorView mode={mode} error={track as Error} />
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
												className="mx-auto aspect-square w-full"
												fallback={
													<div
														className={`h-[100px] [color:var(--default-secondary)] sm:h-[300px] ${track?.nowplaying && "!animate-spin-slow"}`}
													>
														<BsDiscFill className="h-full w-full" />
													</div>
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
										className={`trackTitle`}
										style={{ color: colors?.secondary }}
									>
										<LoadingSkeleton
											className={`titleSkeleton`}
											fallback="Track title not available"
										>
											{track?.artistName && (
												<span className={`infoSpan`}>
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
											className={`titleSkeleton`}
											fallback="Artist name not available"
										>
											{track?.artistName && (
												<span className={`infoSpan`}>
													<FaRegUser />
													{track?.artistName}
												</span>
											)}
										</LoadingSkeleton>
										<LoadingSkeleton
											className={`titleSkeleton`}
											fallback="Album name not available"
										>
											{track?.albumTitle && (
												<span className={`infoSpan`}>
													<FaCompactDisc />
													{track?.albumTitle}
												</span>
											)}
										</LoadingSkeleton>
									</div>
								</div>
								<div className={`cardBody`}>
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
