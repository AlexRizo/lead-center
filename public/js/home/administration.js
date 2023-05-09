const viewAdmin = (id) => {
    window.location = `${ url }/administration/view/saler/${ id }?tkn=${ token }`;
}

const viewLead = (id) => {
    window.location = `${ url }/leads/view/${ id }?tkn=${ token }`;
}

const init = async() => {
    // TODO: ****
}

const main = async() => {
    await init();
}

main();