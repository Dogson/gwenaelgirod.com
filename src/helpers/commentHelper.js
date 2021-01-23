import axios from "axios";

export async function postComment(name, message, slug, avatar) {
    const bodyFormData = new URLSearchParams();
    bodyFormData.append('fields[name]', name);
    bodyFormData.append('fields[slug]', slug);
    bodyFormData.append('fields[avatar]', avatar);
    bodyFormData.append('options[slug]', slug);
    bodyFormData.append('fields[message]', message);

    return axios({
        method: 'POST',
        url: process.env.GATSBY_STATICMAN_POST_URL,
        data: bodyFormData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
}