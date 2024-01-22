import axios from 'axios'
import { redirect } from '@sveltejs/kit'

export const load = async ({ request, url, setHeaders }) => {
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
  
        return { content_user_1,  content_user_2}

    }else{

        redirect(307, '/')

    }
    
}

