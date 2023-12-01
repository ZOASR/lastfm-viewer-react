export type Images = {
	images: Image[];
	release: string;
};

export type Image = {
	approved: boolean;
	back: boolean;
	comment: string;
	edit: number;
	front: boolean;
	id: number;
	image: string;
	thumbnails: Thumbnails;
	types: string[];
};

export type Thumbnails = {
	"250": string;
	"500": string;
	"1200": string;
	large: string;
	small: string;
};

export type MBObject = {
	created: Date;
	count: number;
	offset: number;
	recordings: Recording[];
};

export type Recording = {
	id: string;
	score: number;
	title: string;
	length: number;
	disambiguation: string;
	video: null;
	"artist-credit": ArtistCredit[];
	"first-release-date": Date;
	releases: Release[];
};

export type ArtistCredit = {
	name: string;
	artist: Artist;
};

export type Artist = {
	id: string;
	name: string;
	"sort-name": string;
	aliases?: Alias[];
	"iso-3166-1-codes"?: string[];
};

export type Alias = {
	"sort-name": string;
	"type-id"?: string;
	name: string;
	locale: null | string;
	type: null | string;
	primary: boolean | null;
	"begin-date": null;
	"end-date": null;
};

export type Release = {
	id: string;
	"status-id": string;
	count: number;
	title: string;
	status: string;
	"artist-credit": ArtistCredit[];
	"release-group": ReleaseGroup;
	date: Date;
	country: string;
	"release-events": ReleaseEvent[];
	"track-count": number;
	media: Media[];
};

export type Media = {
	position: number;
	format: string;
	track: Track[];
	"track-count": number;
	"track-offset": number;
};

export type Track = {
	id: string;
	number: string;
	title: string;
	length: number;
};

export type ReleaseGroup = {
	id: string;
	"type-id": string;
	"primary-type-id": string;
	title: string;
	"primary-type": string;
};

export type ReleaseInfo = {
	quality: string;
	"status-id": string;
	"packaging-id": string;
	date: Date;
	"cover-art-archive": CoverArtArchive;
	disambiguation: string;
	country: string;
	"release-events": ReleaseEvent[];
	packaging: string;
	title: string;
	status: string;
	"text-representation": TextRepresentation;
	asin: string;
	barcode: string;
	id: string;
};

export type CoverArtArchive = {
	back: boolean;
	darkened: boolean;
	artwork: boolean;
	front: boolean;
	count: number;
};

export type ReleaseEvent = {
	date: Date;
	area: Area;
};

export type Area = {
	"iso-3166-1-codes": string[];
	"sort-name": string;
	name: string;
	type: null;
	id: string;
	disambiguation: string;
	"type-id": null;
};

export type TextRepresentation = {
	language: string;
	script: string;
};
