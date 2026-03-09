import type { EducationResource, Signal } from "@/backend.d";
import type { Category } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAllSignals() {
  const { actor, isFetching } = useActor();
  return useQuery<Signal[]>({
    queryKey: ["signals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSignals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSignalsByCategory(category: Category | "all") {
  const { actor, isFetching } = useActor();
  return useQuery<Signal[]>({
    queryKey: ["signals", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "all") return actor.getAllSignals();
      return actor.getSignalsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllEducationResources() {
  const { actor, isFetching } = useActor();
  return useQuery<EducationResource[]>({
    queryKey: ["education"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEducationResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.subject,
        data.message,
      );
    },
  });
}
