import { useState, useEffect } from "react";
import { getLatestTrack } from "@lastfm-viewer/utils/lastfm";
import { Props } from "./ReactLastFMViewer";
import { Colors, TrackInfo } from "@lastfm-viewer/utils/types";

type lfmvHook = {
	track: TrackInfo | Error | undefined;
	colors: Colors | undefined;
	loading: boolean;
	message: string;
};

export const useLastfmViewer: (obj: Props) => lfmvHook = ({
	user,
	updateInterval
}: Props) => {
	const [track, setTrack] = useState<TrackInfo | Error>();
	const [colors, setColors] = useState<Colors | undefined>();
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const get = async () => {
			const data: TrackInfo | Error = await getLatestTrack(user);
			if (data instanceof Error) {
				setTrack(data);
				setMessage(data.message);
				setLoading(false);
			} else {
				setTrack(data);
				setColors(data.colors);
				setLoading(false);
			}
		};
		get();
		let intervalRef: number;

		// Validate updateInterval to be at least 2 seconds
		const MIN_UPDATE_INTERVAL = 2000; // 2 seconds in milliseconds
		const safeUpdateInterval = updateInterval
			? Math.max(updateInterval, MIN_UPDATE_INTERVAL)
			: undefined;

		if (updateInterval && updateInterval < MIN_UPDATE_INTERVAL) {
			console.warn(
				`updateInterval is too low. Using minimum allowed value of ${MIN_UPDATE_INTERVAL}ms to prevent rate limiting.`
			);
		}

		if (safeUpdateInterval) {
			intervalRef = setInterval(() => {
				get();
			}, safeUpdateInterval);
		}

		return () => {
			if (intervalRef) clearInterval(intervalRef);
		};
	}, [user, updateInterval]);

	return {
		track,
		colors,
		loading,
		message
	};
};
