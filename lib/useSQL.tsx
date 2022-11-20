import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function useSQL(query: string) {
    const { data, error } = useSWR(`/api/sql?query=${query}`, fetcher);
    return {
        isLoading: !error && !data,
        isError: error,
        results: data ? data[0] : null,
        fields: data ? data[1] : null,
    };
}
