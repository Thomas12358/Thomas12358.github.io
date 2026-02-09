# CSV Point Import Example

This directory contains example CSV files for importing GPS points into the Roots map.

## CSV Format Requirements

Your CSV file must have:
- **latitude** (or lat): Required - the latitude coordinate
- **longitude** (or lon/lng): Required - the longitude coordinate
- **name**: Optional - name of the point (defaults to "Point N" if not provided)
- **url** (or link/page): Optional - URL linking to more information about the point

All other columns will be stored as metadata and displayed in the info modal.

## Example CSV

```csv
name,latitude,longitude,url,type,rating,notes
Hakone Yuryo,35.2328,139.0573,https://example.com/hakone,outdoor,4.5,Beautiful mountain onsen
Kusatsu Onsen,36.6228,138.5986,https://example.com/kusatsu,mixed,5.0,Famous hot spring town
Noboribetsu,42.5033,141.1556,https://example.com/noboribetsu,indoor,4.8,Volcanic hot springs
```

## Features

- **Quoted Values**: Values containing commas can be quoted: `"Point A, with comma"`
- **Escaped Quotes**: Use double quotes to escape: `"He said ""hello"""`
- **Metadata**: All columns except name, lat, lon, and url are stored as metadata
- **Flexible Headers**: Latitude can be `latitude` or `lat`, longitude can be `longitude`, `lon`, or `lng`

## Usage

1. **Local Upload**: Click "+ Add CSV Points" button and select your CSV file
2. **Firebase Upload**: Sign in as admin and drag & drop your CSV file into the upload area
3. **View Points**: Click the info button (ℹ) next to the point group to view metadata
4. **Toggle Visibility**: Use the checkbox to show/hide all points from a CSV file
