'use client';

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import { Coffee } from "lucide-react";

const BuyMeACoffeeSupport = ({ clsName = "", text="", linkClsName = ""}) => {
    return (
        <Link
            href="https://www.buymeacoffee.com/strollerina"
            target="_blank"
            rel="noopener"
            aria-label="buymeacoffee"
            className={`${linkClsName}`}
        >
            <Button
                size="lg"
                isIconOnly
                startContent={<Coffee />}
                variant="light"
                className={` ${clsName}`}
            >
                {/* Buy me a coffee */}
            </Button>
            {text && 
                <div className="">
                    {text}
                </div>
            }
            
        </Link>
    );
};

export default BuyMeACoffeeSupport;
