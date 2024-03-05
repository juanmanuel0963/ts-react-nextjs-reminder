"use client";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return <div>{error.message}<button onClick={reset}>Try again</button></div>
}

/*
export default function ErrorBoundary({ error }: {
    error: Error
}) {
    return <div>{error.message}</div>;
}
*/