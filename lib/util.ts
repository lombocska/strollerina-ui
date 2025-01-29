
// export async function getManuals(brand: string) {
//     const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
//     const res = await fetch(base_url + '/manuals/'+ encodeURI(brand))
//     console.log("fetch manuals")
    
//     if (!res.ok) {
//      throw new Error('Failed to fetch data with brand ' + encodeURI(brand));
// }
 
//   return res.json()
// }

export function deepCompare(arg1, arg2){
    if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)){
        if (Object.prototype.toString.call(arg1) === '[object Object]' || Object.prototype.toString.call(arg1) === '[object Array]' ){
        if (Object.keys(arg1).length !== Object.keys(arg2).length ){
            return false;
        }
        return (Object.keys(arg1).every(function(key){
            return deepCompare(arg1[key],arg2[key]);
        }));
        }
        return (arg1===arg2);
    }
    return false;
}
