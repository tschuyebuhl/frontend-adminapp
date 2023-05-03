import { createContext, useContext, useState } from 'react';

type VCenterContextType = {
    selectedVCenter: string | null;
    setSelectedVCenter: (vCenter: string | null) => void;
};

const VCenterContext = createContext<VCenterContextType>({
    selectedVCenter: null,
    setSelectedVCenter: () => {},
});

export const useVCenterContext = () => useContext(VCenterContext);

export const VCenterProvider: React.FC = ({ children }) => {
    const [selectedVCenter, setSelectedVCenter] = useState<string | null>(null);

    return (
        <VCenterContext.Provider value={{ selectedVCenter, setSelectedVCenter }}>
            {children}
        </VCenterContext.Provider>
        );
};
