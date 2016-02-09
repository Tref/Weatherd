# Weather Info

## Requirements:
Create a simple website that will display the weather report for a city. The website should have a list box (or some dynamic method) from which a user can select the following city names (New York, Chicago, Seattle, Houston, San Diego). By selecting a city a user should see the weather report for that city: date, max and min temperature, pressure, humidity etc. The website should be production deployable in terms of design, code quality, testing, and deployment instructions. You can use whichever Javascript framework/library you prefer (although React or Angular would be preferred if you have no other preference).

Dress to impress… any additional flourishes to show a complex technique technique or cool UI hack is encouraged. (We recognize it’s a coding assignment and you don’t want to waste hours on it, but showing something beyond the basics is encouraged.)

# Local Setup

In order to run the project locally you must first Git, Node (with npm), Bower and Grunt installed on your machine. Once these tools are installed please run the following commands from a terminal.

```
# Clone your Github repository:
git clone "https://github.com/Tref/Weatherd.git"

# Go to the AngularJS directory:
cd Weatherd

# Install node.js dependencies:
npm install

# Install bower components:
bower install

```

Once this has been completed you can start the web server by running:

```
npm start
```

This will create a local webserver that is listening to port 8000 on your local machine. You can now browse to the application at:

```
http://localhost:8000/app/index.html
```

# Running Tests

Weatherd comes with a full suite of unit and end-to-end tests which can be run with the following commands respectively

```
# For unit tests:
npm test

# For end-to-end tests

# update your webdriver
npm run update-webdriver

# start the server
npm start

# run protractor tests in a separate window
npm run protractor
```

# Future Enhancements

- Create a custom directive for D3 and integrate
- Create a new view for weather data and route to view on dropdown city selection
- Make the D3 chart responsive
- Create a build system which concatenates and minifies code for deployment
