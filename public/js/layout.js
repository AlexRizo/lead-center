const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'https://altozano.leadscenter.work');

const token = localStorage.getItem('tkn') || null;

if (!token) {
    window.location = `${ url }/login`;
}

let socket;

window.addEventListener('load', () => {
    const adminPage = document.getElementById('admin')
    const addNewpage = document.getElementById('add-lead')

    if (localStorage.getItem('ur') != 1) {
        console.log(localStorage.getItem('ur'));
        adminPage.classList.toggle('hidden');
        addNewpage.classList.toggle('hidden');
    }
})

const adminSection = () => {
    window.location = `${ url }/administration?tkn=${ token }`;
};

const addLead = () => {
    window.location = `${ url }/leads/new?tkn=${ token }`;
}

const logout = () => {
    localStorage.removeItem('tkn');
    localStorage.removeItem('ur');
    localStorage.removeItem('uid');
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
        localStorage.removeItem('tkn');
        localStorage.removeItem('ur');
        localStorage.removeItem('uid');
        window.location = url;
    });
}

const app = async() => {
    await connectSocket();
}

app();