import { useMutation, useQuery } from "@tanstack/react-query";
import type { Question, QuizResult } from "../backend";
import { useActor } from "./useActor";

export function useGetQuestions() {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCalculatePrakruti() {
  const { actor } = useActor();
  return useMutation<QuizResult, Error, number[]>({
    mutationFn: async (answers: number[]) => {
      if (!actor) throw new Error("Actor not available");
      return actor.calculatePrakruti(answers.map((a) => BigInt(a)));
    },
  });
}
