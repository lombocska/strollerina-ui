import { Input } from "@nextui-org/input";
import BuyMeACoffeeSupport from "./BuyMeaCoffee";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { unlockFilters } from "lib/data";
import { useLocalStorage } from "lib/LocalStorageAPI";


const UnlockFilters = ({ dictionary, setFiltersLocked }) => {

    const [unlockCode, setUnlockCode] = useLocalStorage("payment/email", ""); //email
    const [errorMessage, setErrorMessage] = useState('');


    const handleUnlock = async () => {
        try {
            // Wait for the unlockFilters promise to resolve
            const response = await unlockFilters(unlockCode);

            // Check if the response is valid and successful
            if (response) {
                // If the response is successful, unlock the filters
                setFiltersLocked(false);
                setErrorMessage("");  // Clear any error message
            } else {
                // If the response is null or not successful, show an error
                setErrorMessage("No payment detected. Please wait or contact support.");
            }
        } catch (error) {
            // Catch any unexpected errors (e.g., network issues)
            setErrorMessage("No payment detected. Please wait or contact support.");
        }
    };


    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-[80%] max-w-md border border-gray-300 rounded-lg text-center bg-white shadow-md">

            <p className="text-sm italic text-gray-500 mb-5">
                {dictionary.common['unlock-text']}
            </p>

            <BuyMeACoffeeSupport
                clsName={`bg-primary shadow rounded-l-full`}
                text={dictionary.common['unlocking-bmc-btn']}
                linkClsName='rounded-l-full rounded-r-full border mb-5' />

            <p className="text-gray-600 font-semibold">{dictionary.common['unlock-code']}</p>

            <Input
                value={unlockCode}
                onChange={(e) => setUnlockCode(e.target.value)}
                className="mt-2"
            />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <Button color="primary" onPress={handleUnlock} className="mt-3">{dictionary.common['unlock-filter-btn']}</Button>
        </div>
    );
};

export default UnlockFilters;