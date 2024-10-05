const API_BASE_URL = 'http://127.0.0.1:5000/api/v1'

export async function loginUser(credentials: { username?: string; email?: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
    }

    return response.json();
}

export async function registerUser(userData: { username: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
    }

    return response.json();
}

export async function sendMessage(message: string) {
    const response = await fetch(`${API_BASE_URL}/ml-predictions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ input_text: message }),
    });

    if (!response.ok) {
        throw new Error('Error sending message');
    }

    return response.json();
}

export async function sendChatMessage(message: string, context: string) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
        throw new Error('Error sending chat message');
    }

    return response.json();
}

export async function getChatHistory() {
    const response = await fetch(`${API_BASE_URL}/chat-history`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching chat history');
    }

    return response.json();
}

export async function clearChatHistory() {
    const response = await fetch(`${API_BASE_URL}/clear-chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        throw new Error('Error clearing chat history');
    }

    return response.json();
}
