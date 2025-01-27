import { AffiliateDTO, CarseatCardDTO, ManualDTO, ReviewDTO, StrollerInfoDTO } from "types";

export async function getManuals(brand: string) {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(base_url + '/manuals/' + encodeURI(brand))
    console.log("fetch manuals")

    if (!res.ok) {
        throw new Error('Failed to fetch data with brand ' + encodeURI(brand));
    }

    return res.json()
}
export async function getActiveBrands() {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/brands/active';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok fetching active brands');
            }
            // Handle the successful response here
            return response.json()
                .then(brands => brands.map((brand: any) => {
                    return {
                        name: brand.name,
                        value: brand.value,
                        img: brand.img
                    }
                }));
        })
}

export async function getStrollerBrands() {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/brands';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle the successful response here
            return response.json()
                .then(brands => brands.map((brand: any) => {
                    return {
                        name: brand.name,
                        value: brand.value,
                        img: brand.img
                    }
                }));
        })
}

export async function getCarSeatBrands() {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/brands';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok fetching carseat brands');
            }
            // Handle the successful response here
            return response.json()
                .then(brands => brands.map((brand: any) => {
                    return {
                        name: brand.name,
                        value: brand.value,
                        img: brand.img
                    }
                }));
        })
}

export async function getBrandByName(brandName: string) {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/brands/' + brandName;
    return await fetch(url, requestOptions)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('Network response for get brand by name was not ok');
            }
            return response.json();
        })
}

export async function getAllStrollers() {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/all';
    console.log("Fetched url: " + url);
    return await fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
}


export async function getStrollersByBrand(brand: string) {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/brand/' + brand;
    console.log("Fetched url: " + url);
    return await fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
}

export async function searchStrollerByName(name: string) {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/quick-search';
    let params =
        `?name=${name}`;
    return await fetch(url + params)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
}

export async function searchCarseatByName(name: string) {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/quick-search';
    let params =
        `?name=${name}`;
    return await fetch(url + params)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
}

export async function searchStrollers(
    brands,
    maxHeight, closedMaxHeight, maxWidth, maxLength,
    closedMaxLength, maxWeight, maxPrice, minSeatHeight,
    siblingMode, reversibleSeat, fullRecliningSeat,
    minFrontWheel, minBackWheel,
    tags
) {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    let params =
        `?brands=${brands}` +
        `&maxHeight=${encodeURIComponent(maxHeight)}` +
        `&closedMaxHeight=${encodeURIComponent(closedMaxHeight)}` +
        `&maxWidth=${encodeURIComponent(maxWidth)}` +
        `&maxLength=${encodeURIComponent(maxLength)}` +
        `&closedMaxLength=${encodeURIComponent(closedMaxLength)}` +
        `&maxWeight=${encodeURIComponent(maxWeight)}` +
        `&siblingMode=${encodeURIComponent(siblingMode)}` +
        `&reversibleSeat=${encodeURIComponent(reversibleSeat)}` +
        `&fullRecliningSeat=${encodeURIComponent(fullRecliningSeat)}` +
        `&maxPrice=${encodeURIComponent(maxPrice)}` +
        `&minSeatHeight=${encodeURIComponent(minSeatHeight)}` +
        `&minFrontWheel=${encodeURIComponent(minFrontWheel)}` +
        `&minBackWheel=${encodeURIComponent(minBackWheel)}` +
        `&tags=${encodeURIComponent(tags)}`;
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/query' + params;
    return await fetch(url, requestOptions)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }
            console.log("Querying strollers");
            return response.json();
        })
}

export async function getStrollerById(Id: string): Promise<StrollerInfoDTO> {
    console.log("Searching for stroller with stroller named " + Id)
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + Id;
    return await fetch(url, requestOptions)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export async function getStrollerByGeneratedId(generatedId: string): Promise<StrollerInfoDTO> {
    console.log("Searching for stroller with stroller named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + generatedId.split('-').pop();
    return await fetch(url, requestOptions)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export async function getStrollerImgs(generatedId: string) {
    console.log("Searching for stroller images with stroller named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + generatedId.split('-').pop() + '/imgs';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle the successful response here
            console.log(response);
            return response.json();
        })
}

export async function getStrollerReviews(generatedId: string) {
    console.log("Searching for stroller reviews with stroller named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + generatedId.split('-').pop() + '/reviews';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle the successful response here
            console.log(response);
            return response.json();
        })
}


export async function getStrollerManualLink(strollerId: number): Promise<ManualDTO> {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + strollerId + '/manual';
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        try {
            return await response.json();
        } catch (error) {
            console.log('no manual found');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


export async function getStrollerAmazonAffiliateLink(id: number): Promise<AffiliateDTO> {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + id + '/affiliate';
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok for affiliate link.');
        }

        try {
            return await response.json();
        } catch (error) {
            console.log('no affiliate found');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export async function getStrollerAnbBabyAffiliateLink(id: number): Promise<AffiliateDTO[]> {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + id + '/affiliate/anbbaby';
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok for anbbaby affiliate link.');
        }

        try {

            let resp = await response.json();
            console.log("anb baby resp" + resp)
            return resp;
        } catch (error) {
            console.log('no affiliate found anbbaby');
            return null;
        }
    } catch (error) {
        console.error('anbbaby Fetch error:', error);
        return null;
    }
}

export async function getStrollerAmazonAccessoriesAffiliateLink(id: number): Promise<AffiliateDTO[]> {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/strollers/' + id + '/accessories-affiliate';
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok for affiliate link.');
        }

        try {
            return await response.json();
        } catch (error) {
            console.log('no affiliate found');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export async function getAllCarSeats() {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats';
    return await fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok fetching all car seats');
            }
            return res.json();
        })
}

export async function getCarSeatsByBrand(brand: string) {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/brand/' + brand;
    return await fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok fetching all car seats');
            }
            return res.json();
        })
}

export async function searchCarSeats(brands,
    adacs, onlyAdacTested,
    maxSeatWeight, maxKidWeight,
    facingMode, maxPrice, maxKidHeight,
    tags) {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };

    let params =
        `?brands=${brands}` +
        `&adacs=${adacs}` +
        `&onlyAdacTested=${encodeURIComponent(onlyAdacTested)}` +
        `&maxSeatWeight=${encodeURIComponent(maxSeatWeight)}` +
        `&maxKidWeight=${encodeURIComponent(maxKidWeight)}` +
        `&facingMode=${facingMode}` +
        `&maxPrice=${encodeURIComponent(maxPrice)}` +
        `&maxKidHeight=${encodeURIComponent(maxKidHeight)}` +
        `&tags=${encodeURIComponent(tags)}`;
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/query' + params;

    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log(response);
            return response.json();
        })
        .then(carSeats => {
            console.log("Searched for strollers with brands: " + brands);
            return carSeats;
        });
}

export async function getCarseatByGeneratedId(generatedId: string): Promise<CarseatCardDTO> {
    if (!generatedId || generatedId.trim() === '') {
        console.log("Invalid generatedId:", generatedId);
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = `${base_url}/car-seats/${generatedId.split('-').pop()}`;

    try {
        const response = await fetch(url, requestOptions);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network response was not ok');
    }
}


export async function getCarseatImgs(generatedId: string) {
    console.log("Searching for carseat images with carseat named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/' + generatedId.split('-').pop() + '/imgs';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle the successful response here
            console.log(response);
            return response.json();
        })
}

export async function getCarseatReviews(generatedId: string) {
    console.log("Searching for stroller reviews with stroller named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/' + generatedId.split('-').pop() + '/reviews';
    return await fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle the successful response here
            console.log(response);
            return response.json();
        })
}


export async function getCarseatManualLink(carseatId: number): Promise<ManualDTO> {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/' + carseatId + '/manual';

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        try {
            return await response.json();
        } catch (error) {
            console.log('no manual found');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


export async function getCarseatAmazonAffiliateLink(id: number): Promise<AffiliateDTO> {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': 'application/json' },
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/carseats/' + id + '/affiliate';
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok for affiliate link.');
        }

        try {
            return await response.json();
        } catch (error) {
            console.log('no affiliate found');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


export async function submitStrollerCarSeatReview(data) {
    try {
        console.log(data)
        const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
        let url = base_url + '/reviews';
        const requestOptions = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        };
        const response = await fetch(url, requestOptions);

        // Check if the response is okay (status code 200-299)
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        // Optionally parse the response JSON if needed
        const result = await response.json();
        console.log('Form submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}


export async function submitStrollerCarSeatReviewWMissingData(data) {
    try {
        console.log(data)
        const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
        let url = base_url + '/reviews/missing-data';
        const requestOptions = {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        };
        const response = await fetch(url, requestOptions);

        // Check if the response is okay (status code 200-299)
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        // Optionally parse the response JSON if needed
        const result = await response.json();
        console.log('Form submitted successfully:', result);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}


export async function getReviews(): Promise<ReviewDTO> {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${base_url}/reviews`;


    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        caches: 'no-store', // Ensures no caching
    };

    try {
        const response = await fetch(url, requestOptions);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch reviews, status code: ${response.status}`);
        }

        const data: ReviewDTO = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch reviews');
    }
}


export async function getFilteredReviews(strollerBrandsQuery: string, carSeatBrandsQuery: string): Promise<ReviewDTO> {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${base_url}/reviews?strollerBrands=${strollerBrandsQuery}&carSeatBrands=${carSeatBrandsQuery}`;


    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = await fetch(url, requestOptions);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch reviews, status code: ${response.status}`);
        }

        const data: ReviewDTO = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch reviews');
    }
}


export async function getCountries(): Promise<string[]> {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${base_url}/generic/countries`;

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch countries. Status: ${response.status}`);
        }

        const data: string[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
}


export async function getCurrencies(): Promise<string[]> {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${base_url}/generic/currencies`;

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch currencies. Status: ${response.status}`);
        }

        const data: string[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
    }
}

