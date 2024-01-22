const ranks_info = {
    visitor : {
        score: 100,
        icon : './rank_icons/visitor.svg'
    },
    curious : {
        score: 500,
        icon : './rank_icons/curious.svg'
    },
    trainee : {
        score: 2293,
        icon : './rank_icons/trainee.svg'
    },
    insider : {
        score: 4088,
        icon : './rank_icons/insider.svg'
    },
    enthusiast : {
        score: 9609,
        icon : './rank_icons/enthusiast.svg',
    },
    hacker : {
        score: 15302,
        icon : './rank_icons/hacker.svg'
    },
    elite : {
        score: 22031,
        icon : './rank_icons/elite.svg'
    },
    legend: {
        score: 23685,
        icon : './rank_icons/legend.svg'
    }

}


export function RankIncon( user_score ){

    let rank_icon = '';
    ( user_score <= ranks_info.visitor.score ) ? ranks_info.visitor.icon : '';
    ( user_score > ranks_info.visitor.score && user_score <= ranks_info.curious.score ) ? rank_icon = ranks_info.curious.icon : '';
    ( user_score > ranks_info.curious.score && user_score <= ranks_info.trainee.score ) ? rank_icon = ranks_info.trainee.icon : '';
    ( user_score > ranks_info.trainee.score && user_score <= ranks_info.insider.score ) ? rank_icon = ranks_info.insider.icon : '';
    ( user_score > ranks_info.insider.score && user_score <= ranks_info.enthusiast.score ) ? rank_icon = ranks_info.enthusiast.icon : '';
    ( user_score > ranks_info.enthusiast.score && user_score <= ranks_info.hacker.score ) ? rank_icon = ranks_info.hacker.icon : '';
    ( user_score > ranks_info.hacker.score && user_score <= ranks_info.elite.score ) ? rank_icon = ranks_info.elite.icon : '';
    ( user_score > ranks_info.elite.score && user_score <= ranks_info.legend.score ) ? rank_icon = ranks_info.legend.icon : '';

    return rank_icon
    
}