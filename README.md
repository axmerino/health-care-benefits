## How to Run the Application

1. Clone the repository fom GitHub
2. On the command line, run `npm run build`
3. On the command line, run `npm run start`
4. Navigate to http://localhost:3000

## How to Run the Application with Docker

NOTE: You will need to have Docker installed [Docker Desktop](https://www.docker.com/products/docker-desktop/) is recommended.

1. Clone the repository from GitHUb
2. Open a terminal/command line window
3. Navigate to the main project directory (/health-care-benefits/). This folder should contain the Dockerfile (Run `ls` to confirm, if needed).
4. Run `docker build -t health-care-benefits .` This will create an Docker image that can be run tagged with the name 'health-care-benefits'. This should take a minute or two.
5. Run `docker run -d -p 8088:3000 --name health-care-benefits health-care-benefits`. This will run the container based on the image created above in detached mode (in the background) and maps port 3000 to port 8088.
6. Open a brower and navigate to http://localhost:8088. The application should be running.
