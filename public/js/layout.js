const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:3000'
            : 'https://alowee.twc.com');

const token = localStorage.getItem('tkn') || null;

if (!token) {
    window.location = `${ url }/login`;
}

let socket;

const logout = () => {
    localStorage.removeItem('tkn');
    window.location = url;
}

const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'tkn': token
        }
    });

    socket.on('connect', () => console.log('Socket Online'));
    socket.on('disconnect', () => {
        console.log('Socket Offline')
        // localStorage.removeItem('tkn');
        // window.location = url;
    });
}

const app = async() => {
    await connectSocket();
}

app();