# @lastfm-viewer/react

> [!NOTE]
> This repository is now part of a monorepo if you want to start developing on it go to the original monorepo [here](https://github.com/ZOASR/lastfm-viewer)

## Homepage: [lastfm-viewer.vercel.app](https://lastfm-viewer.vercel.app)

<p align="center" >
  <img  style="filter: drop-shadow(0 0 10px black);" src="./images/lfmv_logo.svg" width="100%" height="100" />
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@lastfm-viewer/react" alt="@lastfm-viewer/react(npm)">
        <img src="https://img.shields.io/npm/dt/@lastfm-viewer/react?style=for-the-badge&logo=npm&logoColor=red&label=@lastfm-viewer/react" /></a>
</p>

A React component to view recent [scrobbles](https://www.dictionary.com/browse/scrobble) for a provided [last.fm](last.fm) user, built with:

<p align="center">
  <img src="https://github.com/ZOASR/lastfm-viewer-react/blob/main/images/Preview_1.png" style="border-radius: 10px"/>
  <img src="https://github.com/ZOASR/lastfm-viewer-react/blob/main/images/Preview_2.png" style="border-radius: 10px"/>
</p>

## Quick start

Install it:

```bash
npm i @lastfm-viewer/react
# or
yarn add @lastfm-viewer/react
# or
pnpm add @lastfm-viewer/react
# or
bun i @lastfm-viewer/react
```

## Use it

to start using the component you first need to get a last.fm API key from [here](https://www.last.fm/api), once you've done that just import the component and specify the username of the user you want to get scrobbling information from:

> Please note that some users set their profile stats to private, so not every user is applicable, if you're using this component on your personal account just set your "Recent listening" stats to public [here](https://www.last.fm/settings/privacy)

```tsx
import ReactLastFMViewer from "@lastfm-viewer/react";

function App() {
	return (
		<>
			<ReactLastFMViewer user="[username]" api_key="[API_KEY]" />
		</>
	);
}
```

<p align="center">
<img width="80%" src="./images/divider.svg" />
</p>

## Props:

### `user: string` :

last.fm username

<p align="center">
<img width="50%" src="./images/divider.svg" />
</p>

### `api_key: string` :

your last.fm public api key

<p align="center">
<img width="50%" src="./images/divider.svg" />
</p>

### `updateInterval?: number` :

if you want to frequently fetch the user's listening info just specify the `updateInterval` prop. (milliseconds) (it takes a number that determines the update interval):

```tsx
import ReactLastFMViewer from "@lastfm-viewer/react";

function App() {
	return (
		<>
			<ReactLastFMViewer
				user="[username]"
				api_key="[API_KEY]"
				updateInterval={20000} {/* 20 seconds */}
			/>
		</>
	);
}
```

> [!CAUTION]
> setting the `updateInterval` prop to a low number might subject your api key for termination, to avoid this just use a higher more reasonable number.

<p align="center">
<img width="50%" src="./images/divider.svg" />
</p>

### `mode?: ("dev" | "prod")` = `"dev"` :

The default value for this prop is: `"dev"`

when using `"dev"` mode any error that haapens will be viewed with the following message above it:

`Hello developer👋, please consider handling the following error before deployment:`

![Error during development](./images/error_dev.png)

when using `"prod"` mode the error is shown as is:

![Error during production](./images/error_prod.png)
