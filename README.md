# Project Name

Graph component of Perch, real estate listing app

## Related Projects

  - https://github.com/team-perch/graph-proxy
  - https://github.com/team-perch/payment-calculator
  - https://github.com/team-perch/imageGallery
  - https://github.com/team-perch/costHomeOwnership

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

### API endpoints:

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

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run build
npm run start
```