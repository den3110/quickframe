import { useState } from 'react';

const usePullingState = () => {
    const [isPulling, setIsPulling] = useState(false);
    return { isPulling, setIsPulling };
};

export default usePullingState;
