function getNutrimix (foodstring){
    const example={"query":"2 slices white bread\n1 slice american cheese\n1 tbsp salted butter"}
    return fetch ("https://trackapi.nutritionix.com/v2/natural/nutrients",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "x-app-id":process.env.REACT_APP_API_ID,
            "x-app-key":process.env.REACT_APP_API_KEY,
        
        },
        body:JSON.stringify({query:foodstring})
    }).then((response) => {
        return response.json()
    } )
    
}


module.exports=getNutrimix