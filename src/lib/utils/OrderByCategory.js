export default function OrderByCategory(challenges){
    let ordered_array = challenges.reduce((result, current) => {
        
        if (!result[current.category]) { result[current.category] = [] }
        
        result[current.category].push({
            name: current.name,
            points: current.points,
            user_1_flagged: current.user_1_flagged,
            user_2_flagged: current.user_2_flagged,
            chall_link: current.chall_link
        })
        
        return result
        
    }, {})

    return ordered_array
}