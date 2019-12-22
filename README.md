# csv-distance-calc

The application caclulates distance between 2 zipcodes from two columns in csv file.
App uses [zip code API](http://www.zipcodeapi.com/) to calculate the distance.

### Input
The sample input file `input.csv` is in code base.
Just add the values in columns and don't change headers or format cells in excel.

### Output
The app will generate a file `output.csv` with distance and if there was some error caclulating distance distance value will be `error`.

## Run the app

### One time
Run the following in cmd

`npm install`

### Every time

Put the values in `input.csv`.
Navigate to project folder and run the following

`node index.js`