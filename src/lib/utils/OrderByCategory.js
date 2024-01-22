export default function OrderByCategory(challenges){
    let ordered_array = challenges.reduce((result, current) => {
        
        if (!result[current.category]) { result[current.category] = [] }
        
        result[current.category].push({
            name: current.name,
            points: current.points,
            userDone: current.userDone
        })
        
        return result
        
    }, {})

    return ordered_array
}