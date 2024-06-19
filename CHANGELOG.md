# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### Documentation

- Added svg as a divider instead of html div

### Build

- Upgraded packages

### Update

- V2.3.0
- V2.3.0

## [2.3.0] - 2024-02-08

### Bug Fixes

- Added the mode prop for handling errors in error view

### Documentation

- Added better documentation for usage

### Dev

- Added a test component to test for built library

### Update

- V2.3.0

## [2.2.6] - 2024-02-03

### Update

- V2.2.6

## [2.2.5] - 2024-01-29

### Bug Fixes

- Removed relative color in pasttracks title background

### Documentation

- Added project logo and homepage

### Update

- V2.2.5

## [2.2.4] - 2024-01-25

### Styling

- Changed font sizing to adapt to any page styles

### Update

- V2.2.4

## [2.2.3] - 2024-01-19

### Bug Fixes

- Converted all http links to https

### Update

- V2.2.3

## [2.2.2] - 2024-01-14

### Bug Fixes

- Fixed some of daisyui themes are applied to the whole page

### Documentation

- Modified package git repo url
- Added bun as an installer in README

### Update

- V2.2.1
- V2.2.2

## [2.2.1] - 2024-01-08

### Refactor

- Scoped daisyui styles to avoid unwanted conflicts

### Update

- V2.2.1

## [2.2.0] - 2024-01-08

### Bug Fixes

- Fixed wrong number formatting when displaying track length

### Refactor

- Used a simpler array method to display past tracks

### Styling

- Changed album cover shadow to hsla color for better browser compatibility

### Update

- V2.2.0

## [2.1.5] - 2024-01-04

### Update

- V2.1.5

## [2.1.4] - 2024-01-04

### Dev

- Moved all utility functions and types to the util package
- Renamed monorepo to @lastfm-viewer

### Update

- V2.1.4

## [2.1.3] - 2024-01-03

### Update

- V2.1.2
- V2.1.3

## [2.1.2] - 2024-01-03

### Styling

- Modified shadow color for album cover
- Modified background color for past tracks title

### Update

- V2.1.1
- V2.1.2

## [2.1.1] - 2024-01-02

### Update

- V2.1.1

## [2.1.0] - 2024-01-02

### Miscellaneous Tasks

- Renamed package

### Update

- V2.0.1
- V2.1.0

## [2.0.1] - 2024-01-02

### Dev

- Added turbo folder to gitignore
- Fixed wrong import typo

### Update

- V2.0.0
- V2.0.1

## [2.0.0] - 2024-01-01

### Bug Fixes

- Wrong import

### Refactor

- Use imageUrl in Track info instead of conditionally rendering the image based on sources
- Simplified colors and used color data from track info

### Dev

- Removed color.js as a dependency (now handeled in the utility package)
- Eslint configs

### Update

- Changelog
- Changeset version
- V2.0.0

## [1.1.2] - 2023-12-30

### Documentation

- Added CHANGELOG file
- Modified README
- Fixed typo in README

### Styling

- View small MB cover image for network effeciency

### Dev

- Modified update script
- Modified update script
- Migrated project to the monorepo

### Update

- V1.1.2

## [1.0.2] - 2023-12-26

### Bug Fixes

- Not fetching album cover from MB when lastfm album isn't available
- Removed tailwind's opnionated preflight styles to avoid style conflicts
- Smaller sample rate to get colors from cover image
- Show artist name even when no album is available or no album cover is available

### Performance

- Added preconnect links to root component

### Refactor

- Moved most of the logic to seperate components

### Styling

- Style changes and improvements to album cover image and link colors

### Dev

- Added tailwind prettier to automatically sort tw classes
- Configured prettier and formatted all files accordingly
- Added update script

### Update

- V1.0.2

## [1.0.1] - 2023-12-25

### Bug Fixes

- Not getting colors from cover image if image is from last.fm

### Update

- Version "1.0.1"

## [1.0.0] - 2023-12-24

### Bug Fixes

- Added rel="preconnect" to potential fetch requests to improve performance

### Update

- Version "1.0.0", stable

## [0.0.9] - 2023-12-24

### Bug Fixes

- Prevented fetching unneded muiscbrainz releases when lastfm track info is present

### Refactor

- Unused comment

### Update

- Version "0.0.9"

## [0.0.8] - 2023-12-21

### Bug Fixes

- Fixed clickable npm shields badge
- Accidental newline in img src
- Removed console debug logs
- Removed "@vite-plugin-node-polyfills" package as it is not needed anymore

### Refactor

- Implemented all api calls, and as a result, got rid of the "@lastfm-ts-api" package.
- Unneccesary import  on a newline

### Update

- Updated version in "package-lock.json"
- "Version 0.0.8"

## [0.0.7] - 2023-12-15

### Bug Fixes

- Added error handling for offline states

### Documentation

- Added npm package badge to README

### Refactor

- Replaced "grow-1 shrink-0" with "flex-1" in tailwind classes
- Added package version to User-Agent when making requests to musicbrainz api
- Removed illogical comment

### Styling

- Changed icons imported to fontAwesome for compatiblity reasons
- Set limit for track title to 20 characters only
- Made each track in the past tracks scrollable instead of truncation the text
- Adjusted trackname align position
- Adjusted width of development server component

### Update

- V0.0.6
- V0.0.7

## [0.0.5] - 2023-12-05

### Bug Fixes

- Remove uneccesary imports

### Refactor

- Wrote a cutom hook (useLastfmViewer) to handle all the necessary logic
- Checking for unexpected errors

### Styling

- Fixed flex layout for past tracks and modified the font size to appear clearer
- Added a user icon instead of the hardcoded "user:"
- Made "Past Tracks" title more prominent
- Changed padding in past tracks title

### Update

- Version 0.0.5

<!-- generated by git-cliff -->
