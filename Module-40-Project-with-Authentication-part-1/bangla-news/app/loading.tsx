import { Spinner } from "@heroui/react";

const Loading = () => {
    return (
        <div className="flex justify-center">
            <Spinner color="success" />
            <span className="text-xs text-muted">Loading...</span>
        </div>
    );
};

export default Loading;