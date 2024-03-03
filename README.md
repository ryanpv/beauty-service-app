# PolishByCin - A beauty service web-app

This is a project I developed for a client I know personally. They requested the app for a business they are planning in the future. However, in the mean time, it can also be used to showcase their current works. Throughout the development life cycle, we discussed plans about designs and features to be implemented that we believe provides the best user experiences. 

This was also an opportunity for myself to strengthen my skills in typescript and learn more about SQL. More information of features and technologies are listed lower in this README. 

As the web-app stays live, we will continue to iterate and plan more features or improve existing ones for better user experience

To check out the live site, visit [PolishByCin](https://www.polishbycin.com)

If you'd like to take a look at the full source code, go to [beauty-service-app](https://github.com/ryanpv/beauty-service-app)

![PolishByCin-Screenshot](https://github.com/ryanpv/beauty-service-app/blob/main/public/(polishbycin-screenshot.jpg))

## Features
* View list of available beauty(nail) services
* View photo gallery, where photos are fetched from Instagram's API
* Clicking on photo will link user to its direct Instagram post
* Users can create an account to track their own data
* Request appointments if user has an account
* Available appointment times are filtered based on times not yet booked along with service durations
* Track appointment status (confirmed/requested/etc)
* Request changes to appointment (i.e change service, date, time)
* Cancel appointments
* See past appointments
* Use "Contact" page to send inquiries/messages
* Admin users can add new services or update existing ones
* Admin users can filter appointments using text-based search (for searching users/emails)
* Admin users have more update appointment status options, such as "Cancelled", "Completed", "Misc"
* Admin users can update "Price" field in appointments (for tracking price the customer had paid)

## Technologies

### Front-end
* Typescript
* ReactJS
* TailwindCSS

### Back-end
* Typescript
* ExpressJS
* PostgreSQL
* Node-cache - cache list of services
* Nodemailer - send email notifications to users and clients
* JWT - handle auth

## Future ideas/features/improvements
* Aggregate users appointment status data (i.e number for miscs/cancellations) for admins
* Add fetch functionality for scrolling gallery on homepage
* Possibly fetch services list on first time web-app is loaded to avoid loading for users

## Deployment
* Full application including the PostgreSQL db is deployed through Render services (render.com)

## Run locally
If anyone wishes to run this locally, PostgreSQL must be installed on your system along with all other packages. After, start the server with "npm run dev" and then client side with "npm run start". Please see package.json files for both for more scripts.