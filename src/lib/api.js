import { get } from 'svelte/store';
import { session } from '$lib/stores/session';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function request(method, url, data) {
	const token = get(session)?.token;
	const headers = new Headers({
		'Content-Type': 'application/json',
		...(token && { Authorization: `Bearer ${token}` })
	});

	const response = await fetch(`${apiBaseUrl}${url}`, {
		method,
		headers,
		body: data ? JSON.stringify(data) : undefined
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
}

export function login(data) {
	return request('POST', '/login', data);
}

export function signup(data) {
	return request('POST', '/signup', data);
}

export function logout() {
	return request('GET', '/logout');
}

export function createPost(data) {
	return request('POST', '/posts', data);
}

export function createComment(postId, data) {
	return request('POST', `/posts/${postId}/comments`, data);
}

export function updateComment(postId, commentId, data) {
	return request('PUT', `/posts/${postId}/comments/${commentId}`, data);
}

export function deleteComment(postId, commentId) {
	return request('DELETE', `/posts/${postId}/comments/${commentId}`);
}

export function likePost(postId) {
	return request('POST', `/posts/${postId}/like`);
}

export function dislikePost(postId) {
	return request('POST', `/posts/${postId}/dislike`);
}

export function likeComment(commentId) {
	return request('POST', `/comments/${commentId}/like`);
}

export function dislikeComment(commentId) {
	return request('POST', `/comments/${commentId}/dislike`);
}
