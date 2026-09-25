# JGCC Notice Board

A lightweight digital notice system for a cadet college, built as a static HTML app with browser-based storage.

## Overview

This project includes:

- an admin dashboard to create, archive, and delete notices
- a live house notice display for individual houses
- support for priorities like Normal, Important, and Urgent
- house-based targeting for RH, SH, and TH
- browser-local persistence using `localStorage`

## Files

- `admin.html` — admin login and notice management dashboard
- `house.html` — public house notice board display

## Features

- Login-based admin control
- Create and publish notices
- Choose target houses or broadcast to all houses
- Display notice priority badges
- View live updates on house screens
- Easy open-with-browser setup

## How to run

1. Clone the repository.
2. Open `admin.html` in a browser to access the admin panel.
3. Log in with:
   - Username: `admin`
   - Password: `1234`
4. Publish notices from the dashboard.
5. Open a house display link from the dashboard or browse:
   - `house.html?house=RH`
   - `house.html?house=SH`
   - `house.html?house=TH`

## Admin dashboard

From the admin page you can:

- add a new notice
- assign a priority level
- select one or multiple houses
- archive older notices
- delete notices permanently
- view the generated display links for each house

## House display

The display page shows:

- current house name
- live notice list for that house
- new notice indicator
- optional alarm sound support
- time and date information

## Notes

This project is a static prototype and stores notices in the browser's local storage, so data is saved on the same device/browser where it is used.

## License

This project is provided as-is for educational/demo use.
