import { LastFMTrack, LastFMUser } from "lastfm-ts-api";
import { Image, Images, MBObject, Release, ReleaseInfo } from "./MBtypes";
import { LastFmImage, Track } from "./LFMtypes";

export interface TrackInfo {
	trackName: string | undefined;
	artistName: string | undefined;
	albumTitle?: string | undefined;
	MBImages: Image[] | undefined;
	lastfmImages?: LastFmImage[];
	nowplaying: boolean | undefined;
	pastTracks: unknown[] | Track[];
	duration: number;
}

const wait = async (secs: number) =>
	new Promise((resolve) => setTimeout(resolve, secs));

const getMBTrackReleases = async (
	trackName: string,
	trackArtirst: string,
	albumName: string | undefined
): Promise<Release[] | null> => {
	let brainzUrl: string;
	if (albumName) {
		brainzUrl = `https://musicbrainz.org/ws/2/recording/?query=recording:"${trackName}"+AND+album:${albumName}+AND++artist:"${trackArtirst}"+AND+status:official+AND+primarytype:album&inc=releases&fmt=json&limit=1`;
	} else {
		brainzUrl = `https://musicbrainz.org/ws/2/recording/?query=recording:"${trackName}"+AND+artist:"${trackArtirst}"+AND+status:official+AND+primarytype:album&inc=releases&fmt=json&limit=1`;
	}
	const musicbrainzApi = await fetch(brainzUrl, {
		headers: {
			"User-Agent": "ReactLastFmViewer/1.2.0 ",
		},
	});
	const brainzData: MBObject = await musicbrainzApi.json();
	if (brainzData.recordings) return brainzData.recordings[0]?.releases;
	else return null;
};

const getMBReleaseInfo = async (mbid: string): Promise<ReleaseInfo> => {
	const brainzUrl = `https://musicbrainz.org/ws/2/release/${mbid}?fmt=json`;
	const musicbrainzApi = await fetch(brainzUrl, {
		headers: {
			"User-Agent": "ReactLastFmViewer/1.2.0 ",
		},
	});
	const releaseInfo: ReleaseInfo = await musicbrainzApi.json();
	return releaseInfo;
};

const getCAACoverArt = async (releaseMBid: string): Promise<Image[]> => {
	const coverArtUrl = `https://coverartarchive.org/release/${releaseMBid}`;
	const cover = await fetch(coverArtUrl);
	const covers: Images = await cover.json();
	return covers.images;
};

export const getLatestTrack = async (
	username: string,
	api_key: string
): Promise<TrackInfo> => {
	let trackName: string;
	let artistName: string;
	let albumTitle: string | undefined;
	let lastfmImages: LastFmImage[] | undefined;
	let isNowplaying: boolean;
	let duration: number;
	let pasttracks;

	const user = new LastFMUser(api_key);
	const track = new LastFMTrack(api_key);
	const opt = {
		user: username, //optional
		limit: 5, //optional, default is 50
	};

	const data = await user.getRecentTracks(opt);
	if (data) {
		trackName = data.recenttracks.track[0].name;
		artistName = data.recenttracks.track[0].artist["#text"];
		pasttracks = data.recenttracks.track;
	} else {
		trackName = "";
		artistName = "";
	}

	if ("@attr" in data.recenttracks.track[0])
		isNowplaying =
			data.recenttracks.track[0]["@attr"]?.nowplaying == "true";
	else isNowplaying = false;

	const trackInfo = await track.getInfo({
		track: trackName,
		artist: artistName,
	});
	if (trackInfo) {
		albumTitle = trackInfo.track.album?.title;
		lastfmImages = trackInfo.track.album?.image;
		duration = parseInt(trackInfo.track.duration);
	} else {
		duration = 0;
		albumTitle = "";
		lastfmImages = undefined;
	}

	const releases: Release[] | null = await getMBTrackReleases(
		trackName,
		artistName,
		albumTitle
	);

	let LatestTrack: TrackInfo;
	LatestTrack = {
		trackName: trackName,
		artistName: artistName,
		albumTitle: albumTitle,
		lastfmImages: lastfmImages,
		MBImages: undefined,
		nowplaying: isNowplaying,
		pastTracks: pasttracks as unknown[],
		duration: duration,
	};

	if (releases)
		for (let release of releases) {
			const rleaseInfo: ReleaseInfo = await getMBReleaseInfo(release.id);
			if (
				rleaseInfo["cover-art-archive"].front ||
				rleaseInfo["cover-art-archive"].artwork ||
				rleaseInfo["cover-art-archive"].back
			) {
				const images: Image[] = await getCAACoverArt(release.id);
				LatestTrack = {
					trackName: trackName,
					artistName: artistName,
					albumTitle: albumTitle,
					lastfmImages: lastfmImages,
					MBImages: images,
					nowplaying: isNowplaying,
					pastTracks: pasttracks as unknown[],
					duration: duration,
				};
				return LatestTrack;
			}
			await wait(1000);
		}
	return LatestTrack;
};
