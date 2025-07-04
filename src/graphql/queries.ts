import { gql } from "@apollo/client";

export const GET_CARS = gql`
  query GetCars {
    cars {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: ID!) {
    car(id: $id) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const GET_CARS_FILTERED = gql`
  query GetCarsFiltered(
    $make: String
    $model: String
    $year: Int
    $color: String
  ) {
    carsFiltered(make: $make, model: $model, year: $year, color: $color) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar($input: CarInput!) {
    addCar(input: $input) {
      success
      message
      car {
        id
        make
        model
        year
        color
        mobile
        tablet
        desktop
      }
    }
  }
`;
