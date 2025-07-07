import { gql } from "@apollo/client";

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
        description
        price
        mileage
      }
    }
  }
`;
