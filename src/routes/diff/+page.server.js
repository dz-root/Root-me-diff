import axios from 'axios'
import cheerio from 'cheerio'
import { redirect } from '@sveltejs/kit'
import { RankIncon } from '$lib/utils/UserRankIcon.js'
import OrderByCategory from '$lib/utils/OrderByCategory.js'



export const load = async ({ request, url, setHeaders }) => {
    
    let result= []
    let challenges = [], challenges_2 = []

    let profile_user_1 = {
        logo : '',
        nickname : '',
        stat: { rank: null, score:null, chall_done:null },
        rank_icon : '',
        rank_title : '',
        link: '',
    }

    let profile_user_2 = {
        logo : '',
        nickname : '',
        stat: { rank: null, score:null, chall_done:null },
        rank_icon : '',
        rank_title : '',
        link: '',
    }

    setHeaders({
        'cache-control': 'max-age=86400',
	})

    const user_1 = await url.searchParams.get('user_1')
    const user_2 = await url.searchParams.get('user_2')

    if (
        request.method === 'GET' 
        && user_1 && user_1 !== '' 
        && user_2 && user_2 !== ''
    ){

        const content_user_1 = await axios.get(`https://www.root-me.org/${user_1}?inc=score&lang=en`).then(response => response.data).catch(e=>redirect(500, '/'))
        const content_user_2 = await axios.get(`https://www.root-me.org/${user_2}?inc=score&lang=en`).then(response => response.data).catch(e=>redirect(500, '/'))

        const ch_1 = cheerio.load(content_user_1), ch_2 = cheerio.load(content_user_2)
        const title_l = ch_1("title"), title_2 = ch_2("title")

        if( title_l.text().trim().substring(0,10) !== "Erreur 404" ){
            const links_1 = ch_1("a.vert, a.rouge");
            const logo = ch_1(".logo_auteur");
            const stats = ch_1("h3");
            const rank_1 = stats.eq(3).text().trim().split(" ").pop();
            const score_1 = stats.eq(4).text().trim().split(" ").pop();
            const chall_done = stats.eq(5).text().trim().split(" ").pop();
        
            profile_user_1.stat.rank = rank_1;
            profile_user_1.stat.score = score_1;
            profile_user_1.stat.chall_done = chall_done;
            profile_user_1.logo = `https://www.root-me.org/${(logo[0].attribs.src).split('?')[0]}`;
            profile_user_1.nickname = logo[0].attribs.alt;
            profile_user_1.rank_icon = RankIncon(score_1);
            profile_user_1.link = `https://www.root-me.org/${user_1}`;

                
            links_1.each((i, link) => {
                const category = link.attribs.href.split("/")[2];
                const name = cheerio(link).text().split("\xa0")[1];
                const points = link.attribs.title.split(" ")[0];
                const user_1_flagged = link.attribs.class === ' vert';
        
                challenges.push({ category, name, points, user_1_flagged });
            });
                
        }else{
            redirect(307, '/')
        }

        if( title_2.text().trim().substring(0,10) !== "Erreur 404" ){
            const links_2 = ch_2("a.vert, a.rouge");
            const logo_2 = ch_2(".logo_auteur");
            const stats_2 = ch_2("h3");
            const rank_2 = stats_2.eq(3).text().trim().split(" ").pop();
            const score_2 = stats_2.eq(4).text().trim().split(" ").pop();
            const chall_done_2 = stats_2.eq(5).text().trim().split(" ").pop();
        
            profile_user_2.stat.rank = rank_2;
            profile_user_2.stat.score = score_2;
            profile_user_2.stat.chall_done = chall_done_2;
            profile_user_2.logo = `https://www.root-me.org/${(logo_2[0].attribs.src).split('?')[0]}`;
            profile_user_2.nickname = logo_2[0].attribs.alt;
            profile_user_2.rank_icon = RankIncon(score_2);
            profile_user_2.link = `https://www.root-me.org/${user_2}`;
                
            links_2.each((i, link) => {
                const category = link.attribs.href.split("/")[2];
                const name = cheerio(link).text().split("\xa0")[1];
                const points = link.attribs.title.split(" ")[0];
                const user_2_flagged = link.attribs.class === ' vert';
        
                challenges_2.push({ category, name, points, user_2_flagged });
            });
        
        }else{
            redirect(307, '/')
        }

        challenges.forEach((x)=>{
            challenges_2.forEach(o=>{
                if(x.name==o.name){
                    result.push(Object.assign({},o,x))
                }
                
            })
        })
        
        result= OrderByCategory(result)

        return { profile_user_1, profile_user_2, result}

    }else{
        redirect(307, '/')
    }
    
}

