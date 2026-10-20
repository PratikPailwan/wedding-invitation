# Pratik & Sakshi's Wedding Invitation

A static, mobile-friendly invitation for 26 & 27 December 2026 at Adarsh Lawns, Barshi. No build step or backend is needed.

## Preview

Open `index.html` in a browser. The page includes a two-day schedule, venue map, IST-based countdown, optional music, calendar download, and WhatsApp RSVP.

## GitHub Pages

1. Push `index.html`, `styles.css`, `script.js`, and the `assets` folder to your repository.
2. In GitHub, open **Settings > Pages**.
3. Choose **Deploy from a branch**, select your publishing branch and **/ (root)**, then save.
4. Wait for deployment to finish and open the URL shown in Pages settings.

Keep asset filename casing exact, including the uppercase `.JPG` extensions. All local URLs are relative, so hosting under a repository path works.

## Personalize

- Edit names, event details, photos, and the venue map in `index.html`.
- Set colours and layout in `styles.css`.
- Update `weddingDate` and `celebrations` in `script.js` if event times change. The countdown uses IST; calendar timestamps use UTC.
- Replace `assets/weddingMusic.mp3` to change the music. The page attempts to play it on load; browsers that block audible autoplay require the guest's first click, tap, or Enter/Space key press. The music button can pause or resume playback, and pausing prevents automatic restarts.
- RSVP opens a prepared WhatsApp message. Guests must select Pratik or Sakshi as the recipient and send it themselves; nothing is submitted or stored by the website.

Google Fonts, Lucide icons, Google Maps, and WhatsApp require an internet connection. Invitation text and wedding details remain readable if these services are unavailable.
