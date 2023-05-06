const prefix = document.querySelector('.user-photo');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const team = document.querySelector('.team');
const role = document.querySelector('.role');
const btn = document.querySelector('.btn-edit');

const init = async() => {
    // TODO: ****
    await fetch(`${ url }/auth`, {
        method: 'GET',
        headers: { tkn: token }
    })
    .then(response => response.json())
    .then(({ user, token }) => {
        prefix.innerHTML = user.prefix;
        prefix.style.background = user.color;
        username.innerHTML = user.name;
        email.innerHTML = user.email;
        team.innerHTML = user.Team.name;
        role.innerHTML = user.Role.name;
    })
    .catch(console.error());
}

const main = async() => {
    await init();
}

main();