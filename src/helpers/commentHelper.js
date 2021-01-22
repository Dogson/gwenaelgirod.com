import axios from "axios";

export async function postComment(name, message, slug) {
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('fields[name]', name);
    bodyFormData.append('fields[slug]', slug);
    bodyFormData.append('options[slug]', slug);
    bodyFormData.append('fields[message]', message);

    console.log(process.env.STATICMAN_POST_URL)
    return axios({
        method: 'POST',
        url: process.env.STATICMAN_POST_URL,
        data: bodyFormData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
}