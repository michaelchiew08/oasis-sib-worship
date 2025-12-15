# Oasis SIB Worship

### 🎵 [View the website here.](http://oasis-sib-worship.vercel.app/)

This website is intended for:
* 🎵 Worship team to add songs to a centralized database which serves as a reference.
* 📝 Worship leaders to specify the order of songs and also additional info for each worship session which can be viewed by everyone.
* 💻 Media streamers to export these songs into coherent Powerpoint lyrics automatically with minimal effort.

***

## Development Tools
* Hosting providers:
    * **[Vercel](https://vercel.com/)** is used to host the website.
    * **[PlanetScale](https://planetscale.com/)** is a MySQL database platform used to manage the website's data. [Vercel provides an integration plugin.](https://vercel.com/integrations/planetscale)
* Stack:
    * **[Next.js](https://nextjs.org/)**
    * **[TypeScript](https://www.typescriptlang.org/)**
    * **[Prisma](https://www.prisma.io/)** for Typescript-based ORM ([More info on Prisma and PlanetScale](https://www.prisma.io/planetscale))

* Docker:
    * **[Docker](https://www.docker.com/)** for containerization for StirlingPDF
    * Setup your `docker-compose.yml` for StirlingPDF
    ```yml
    services:
      stirling-pdf:
        image: stirlingtools/stirling-pdf:latest
        container_name: stirling-pdf
        ports:
          - '9090:8080'
        volumes:
          - ./stirling-data/configs:/configs
          - ./stirling-data/logs:/logs
          - ./stirling-data/pipeline:/pipeline
        environment:
          - SECURITY_ENABLELOGIN=false
        restart: unless-stopped
    ```
    * Run `docker-compose up -d` to start the container
    * Run `docker-compose down` to stop the container

***

## Environments Variables
* `AZURE_API_DOMAIN`: The domain of the Azure API
* `AZURE_OCR_API_KEY`: The API key for the Azure OCR API
* `GENIUS_ACCESS_TOKEN`: The access token for the Genius API
* `NEXT_PUBLIC_VERCEL_URL`: The URL of the Vercel deployment
* `NODE_ENV`: The environment (development, production, etc.)
#### Below these are important to have.
* `ADMIN_PASSWORD`: The password for the admin user
* `DATABASE_URL`: The URL of the database
* `STIRLING_PDF_URL`: The URL of the Stirling PDF service
* `STIRLING_PDF_API_KEY`: The API key for the Stirling PDF service


***

## Screenshots

<details>
<summary>Home</summary>

![Home](https://i.imgur.com/AQigwrR.png)

</details>

<details>
<summary>All Songs</summary>

![All_Songs](https://i.imgur.com/KRQ9yzJ.png)

</details>

<details>
<summary>Adding Songs</summary>

![Add_Song](https://i.imgur.com/VLhNUx8.png)

</details>

<details>
<summary>Genius Song Search</summary>

![Genius_Song_Search1](https://i.imgur.com/Pv8otOz.png)

***

![Genius_Song_Search2](https://i.imgur.com/2l5xRK0.png)

</details>

<details>
<summary>Chord Annotations</summary>

![Chord_Annotations1](https://i.imgur.com/A0t6F9K.png)
![Chord_Annotations2](https://i.imgur.com/GnJ8R9o.png)
![Chord_Annotations3](https://i.imgur.com/zGBJavx.png)

</details>

<details>
<summary>Adding Sessions</summary>

![Add_Session1](https://i.imgur.com/DRkG9jB.png)
![Add_Session2](https://i.imgur.com/crRNyYu.png)

</details>

<details>
<summary>Exporting</summary>

![Export1](https://i.imgur.com/Z3VecMp.png)
![Export2](https://i.imgur.com/R9S4Xud.png)

</details>


***

## Development & Getting Started

* Clone the repo
* `npm install --legacy-peer-deps` to install dependencies
* `npm run generate` to generate Prisma client
* `npx prisma migrate dev` to migrate the database
* `npx prisma db push` to push the database to the cloud
* `npm run dev` to run the Next.js server in development
* Make sure to set the environment variable `ADMIN_PASSWORD` in both the local environment (`env.local` file) and also Vercel or whatever hosting provider used.

***

