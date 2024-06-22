import { CarseatCardDTO, ManualDTO, StrollerInfoDTO } from "types";

export async function getManuals(brand: string) {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(base_url + '/manuals/'+ encodeURI(brand))
    console.log("fetch manuals")
    
    if (!res.ok) {
     throw new Error('Failed to fetch data with brand ' + encodeURI(brand));
}
 
  return res.json()
}

export  async function getBrands() {
  const requestOptions = {
      method: 'GET', headers: {'Content-Type': 'application/json'},
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
              .then(brands => brands.map((brand:any) => {
                  return {
                      name: brand.name,
                      value: brand.value,
                      img: brand.img
                  }
              }));
      })
}

export async function getBrandByName(brandName:string) {
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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


export async function searchStrollers (
                            brands,
                            maxHeight, closedMaxHeight, maxWidth, maxLength, 
                            closedMaxLength, maxWeight, maxPrice, minSeatHeight,
                            siblingMode, reversibleSeat, fullRecliningSeat,
                            minFrontWheel, minBackWheel,
                            tags
    ) {
        const requestOptions = {
            method: 'GET', headers: {'Content-Type': 'application/json'},
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
            `&tags=${encodeURIComponent(tags)}` ;
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

export async function getStrollerByGeneratedId (generatedId:string) : Promise<StrollerInfoDTO> {
    console.log("Searching for stroller with stroller named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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

export async function getStrollerImgs (generatedId:string) {
    console.log("Searching for stroller images with stroller named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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


export async function getStrollerManualLink (strollerId:number) : Promise<ManualDTO> {
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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

export async function getCarSeatBrands() {
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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
                .then(brands => brands.map((brand:any) => {
                    return {
                        name: brand.name,
                        value: brand.value,
                        img: brand.img
                    }
                }));
        })
  }

export async function searchCarSeats(brands, 
                                    adacs, onlyAdacTested, 
                                    maxSeatWeight, maxKidWeight,
                                    facingMode, maxPrice, maxKidHeight, 
                                    tags) {
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
    };

    let params =
        `?brands=${brands}` +
        `&adacs=${adacs}` +
        `&onlyAdacTested=${encodeURIComponent(onlyAdacTested)}` +
        `&maxSeatWeight=${encodeURIComponent(maxSeatWeight)}` +
        `&maxKidWeight=${encodeURIComponent(maxKidWeight)}`+
        `&facingMode=${facingMode}` +
        `&maxPrice=${encodeURIComponent(maxPrice)}` +
        `&maxKidHeight=${encodeURIComponent(maxKidHeight)}` +
        `&tags=${encodeURIComponent(tags)}` ;
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

export async function getCarseatByGeneratedId (generatedId:string) : Promise<CarseatCardDTO> {
    console.log("Searching for carseat with carseat named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
    };
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let url = base_url + '/car-seats/' + generatedId.split('-').pop();
    return await fetch(url, requestOptions)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export async function getCarseatImgs (generatedId:string) {
    console.log("Searching for carseat images with carseat named " + generatedId)
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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

export async function getCarseatManualLink (carseatId:number) : Promise<ManualDTO> {
    const requestOptions = {
        method: 'GET', headers: {'Content-Type': 'application/json'},
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