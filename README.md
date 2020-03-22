# Graph Module for Perch

## Related Projects

  - https://github.com/team-perch/payment-calculator
  - https://github.com/team-perch/imageGallery
  - https://github.com/team-perch/costHomeOwnership

## Screen Capture

![Imgur Image](./graph_demo.gif)

## Schema
![schema](https://perch-graph.s3-us-west-1.amazonaws.com/perch-schema.png)

## API endpoints

- POST /api/estimates/pricing/:houseId-:dateId-:priceAmount

> Add an price data point to an existing property listing\
> Returns the new data point object

- GET /api/estimates/pricing/:houseId

> Get all price data points from an existing property listing\
> Returns an array of price data point objects matching the houseId of the property listing

- PUT /api/estimates/pricing/:houseId-:dateId-:priceAmount

> Update a specified price data point from an existing property listing with new data\
> Returns the updated data point object


- DELETE /api/estimates/pricing/:houseId-:dateId

> Delete a specified price data point from an existing property listing

## Results

### Pre Horizontal Scaling

![loadpre](https://perch-graph.s3-us-west-1.amazonaws.com/perch-loader-pre-scale.png)

![newrelpre](https://perch-graph.s3-us-west-1.amazonaws.com/perch-newrel-pre-scale.png)

> Initial metrics were around 800 rps with 1800ms latency with 0 error rate

### Post Horizontal Scaling

![loadpost](https://perch-graph.s3-us-west-1.amazonaws.com/perch-loader-post-scale.png)

![newrelpost](https://perch-graph.s3-us-west-1.amazonaws.com/perch-newrel-post-scale.png)

> After scaling, metrics improved to 1300 rps with 66ms latency

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

From within the root directory:

```sh
npm install
npm run build
npm run start
```
Navigate to link in a web browser.
>http://localhost:3002