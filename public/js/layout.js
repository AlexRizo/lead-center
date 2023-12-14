const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'https://altozano.leadscenter.work');

const token = localStorage.getItem('tkn') || null;

if (!token) {
    window.location = `${ url }/login`;
}

let socket;

window.addEventListener('load', () => {
    const adminPage = document.getElementById('admin');
    const ContFollow = document.getElementById('prospect_status');

    const btnMenu = document.querySelector('.spawn-menu');
    const blackScreen = document.querySelector('.black-screen');
    const menu = document.querySelector('.menu');

    if (localStorage.getItem('ur') != 1) {
        adminPage.classList.toggle('hidden');
        ContFollow.classList.toggle('hidden');
    }

    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('menu-animation');
        blackScreen.classList.toggle('hidden');
        btnMenu.classList.toggle('move-button');
    })

    blackScreen.addEventListener('click', () => {
        menu.classList.toggle('menu-animation');
        blackScreen.classList.toggle('hidden');
        btnMenu.classList.toggle('move-button');
    })
});

const adminSection = () => {
    window.location = `${ url }/administration?tkn=${ token }`;
};

const addLead = () => {
    window.location = `${ url }/leads/new?tkn=${ token }`;
}

const adminSection2 = () => {
    window.location = `${ url }/contacted-following?tkn=${ token }`;
};

const searchSection = () => {
    window.location = `${ url }/search?tkn=${ token }`;
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
        // localStorage.removeItem('tkn');
        // localStorage.removeItem('ur');
        // localStorage.removeItem('uid');
        location.reload();
    });
}

const app = async() => {
    await connectSocket();
}

app();