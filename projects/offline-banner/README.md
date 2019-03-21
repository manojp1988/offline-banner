# OfflineBanner

This library will show a banner at the top of the page is frontend couldn't connect to backend.

## Usage

1.  Import `OfflineBannerModule.forRoot(<url>)` in your project. 'Url' should be your health check url. This is the url, library will request and figure out whether your frontend connects to backend or not.

2.  Add this tag `<offline-banner></offline-banner>` to the top of your app.component.html file.
