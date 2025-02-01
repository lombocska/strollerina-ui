"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SeriesDTO, StrollerInfoDTO } from "types";
import { getSeriesById, getStrollerById } from "lib/data";
import ProductCard from "../cards/product_card";

type ProductType = "STROLLER" | "CAR_SEAT";

interface Milestone {
    itemId: number;
    productType: ProductType;
    strollerInfo: StrollerInfoDTO | null;
}

interface TimelineProps {
    productType: ProductType;
    itemId: number;
}

export default function Timeline({ productType, itemId }: TimelineProps) {

    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seriesData: SeriesDTO = await getSeriesById(productType, itemId);
                if (!seriesData || !seriesData.name || seriesData.items.length === 0) {
                    setError("No series found for this item");
                    return;
                }

                const itemsWithStrollerInfo = await Promise.all(
                    seriesData.items.map(async (item) => {
                        const strollerInfo = await getStrollerById(item.itemId.toString());
                        return { itemId: item.itemId, productType, strollerInfo };
                    })
                );

                // Sort milestones by productionDate (ascending)
                const sortedMilestones = itemsWithStrollerInfo.sort((a, b) => {
                    const dateA = a.strollerInfo?.productionDate ? new Date(a.strollerInfo.productionDate).getTime() : 0;
                    const dateB = b.strollerInfo?.productionDate ? new Date(b.strollerInfo.productionDate).getTime() : 0;
                    return dateA - dateB; // Ascending order
                });

                setMilestones(sortedMilestones);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productType, itemId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <>No series found</>;

    return (
        <>
            {/* Desktop View */}
            <MilestoneList milestones={milestones} isMobile={false} />

            {/* Mobile View */}
            <MilestoneList milestones={milestones} isMobile={true} />
        </>
    );
}

// COMPONENT TO RENDER MILESTONES
function MilestoneList({ milestones, isMobile }: { milestones: Milestone[]; isMobile: boolean }) {
    return (
        <>
            <div className={`${isMobile ? "block md:hidden" : "hidden md:block"} relative flex flex-col items-center py-10 w-full`}>
                {/* Vertical Line (Now in both mobile & desktop) */}

                <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2"></div>

                <div className="flex flex-col items-center space-y-16 w-full">
                    {milestones.map((milestone, index) => {
                        return <MilestoneItem key={milestone.itemId} milestone={milestone} isRight={index % 2 === 0} isMobile={isMobile} />;
                    })}
                </div>
            </div>
        </>
    );
}

// COMPONENT FOR A SINGLE MILESTONE
function MilestoneItem({ milestone, isRight, isMobile }: { milestone: Milestone; isRight: boolean; isMobile: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: isRight ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`relative flex w-full ${isMobile ? "items-center justify-between" : "max-w-4xl items-center"}`}
        >
            {/* Milestone Icon (Production Date - Now correctly centered on the vertical line) */}
            {!isMobile &&
                <div className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-primary shadow-lg bg-secondary bg-opacity-70`}>
                    {milestone.strollerInfo?.productionDate}
                </div>
            }
            {/* Milestone Card */}
            <div className={`${isMobile ? "w-full px-6 mr-12" : `w-1/2 px-6 ${isRight ? "pl-10 ml-auto" : "pr-10 mr-auto text-left"}`}`}>
                {milestone.strollerInfo ? (
                    <>
                        {isMobile &&
                            <div className={` left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-primary shadow-lg bg-secondary bg-opacity-70`}>
                                {milestone.strollerInfo?.productionDate}
                            </div>
                        }
                        <ProductCard
                            key={'stroller-' + milestone.strollerInfo.generatedId}
                            name={milestone.strollerInfo.name}
                            brand={milestone.strollerInfo.brand}
                            brandValue={milestone.strollerInfo.brandValue}
                            img={milestone.strollerInfo.img}
                            tags={milestone.strollerInfo.priceFrom != null ? [Math.round(milestone.strollerInfo.priceFrom) + "+"] : []}
                            generatedId={milestone.strollerInfo.generatedId}
                            infoLinkPrefix={'/strollers/'}
                            isSelected={false}
                            onSelect={() => { }}
                            notHidden={false}
                        />
                    </>
                ) : (
                    <div>Loading stroller info...</div>
                )}
            </div>
        </motion.div>
    );
}
