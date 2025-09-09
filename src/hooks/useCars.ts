import { useQuery, useMutation } from "@apollo/client";
import { GET_CARS } from "../graphql/queries";
import { ADD_CAR } from "../graphql/mutations";
import type { Car, CarsData } from "../types/car.types";

export function useCars() {
  const { data, loading, error, refetch } = useQuery<CarsData>(GET_CARS);

  const [addCarMutation, { loading: mutationLoading }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_CARS }],
  });

  const addCar = async (input: Omit<Car, "id">) => {
    try {
      await addCarMutation({ variables: { input } });
      await refetch();
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  };

  return {
    cars: data?.cars || [],
    loading,
    error,
    mutationLoading,
    refetch,
    addCar,
  };
}
