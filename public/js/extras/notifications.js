const notification = document.createElement('div');

notification.classList.add('notification');

const sendNotification = (title = 'Nueva notificación', body = 'Has recibido una notificaicón') => {
    const section = document.querySelector('section');

    notification.innerHTML =  `
        <div class="notification-title">
            <h3>${ title }</h3>
        </div>
        <div class="notification-body">
            <p>${ body }</p>
        </div>
    `;

    section.appendChild(notification);

    setTimeout(() => {
        notification.classList.toggle('notification-show');
    }, 100);

    setTimeout(() => {
        notification.classList.toggle('notification-show');
    }, 5000);
}