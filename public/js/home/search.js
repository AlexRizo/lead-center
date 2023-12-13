const form = document.querySelector('form');
const input = document.querySelector('input');
const date = document.querySelector('#date');
const staff = document.querySelector('#staffId');
const target = document.getElementById('select_target');
const tbResults = document.querySelector('.tb-results');

target.addEventListener('change', () => {
    switch (target.value) {
        case '0':
            input.value = '';
            date.value = '';
            staff.value = '0';
            input.setAttribute('placeholder', 'Nombre completo del prospecto');
            input.classList.remove('hidden');
            date.classList.add('hidden');
            staff.classList.add('hidden');
        break;

        case '1':
            input.value = '';
            date.value = '';
            staff.value = '0';
            input.setAttribute('placeholder', 'Número telefónico del prospecto sin prefijo');
            input.classList.remove('hidden');
            date.classList.add('hidden');
            staff.classList.add('hidden');
        break;

        case '2':
            input.value = '';
            date.value = '';
            staff.value = '0';
            input.classList.add('hidden');
            date.classList.remove('hidden');
            staff.classList.add('hidden');
        break;

        case '3':
            input.value = '';
            date.value = '';
            staff.value = '0';
            input.classList.add('hidden');
            date.classList.add('hidden');
            staff.classList.remove('hidden');
        break;
    }
});

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const keyword = input.value ? input.value : date.value ? date.value : parseInt(staff.value) ? parseInt(staff.value) : null;

    console.log({ keyword, target: parseInt(target.value) });
    
    const params = new URLSearchParams( {
        keyword,
        target: parseInt(target.value),
    });

    console.log(params);

    fetch(`${ url }/search/leads/by?${ params.toString() }`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            tkn: token //? token is defined in public/js/layout.js and is a global variable
        }
    })
    .then(response => response.json())
    .then(({ message, results, error }) => {
        if (error) {
            return sendNotification('Error', error);
        }
        
        let searchResult = ``;
        
        if (results) {
            for (const lead of results) {
                searchResult += `
                    <tr class="result">
                        <td>${ lead.name }</td>
                        <td>${ lead.phone_number }</td>
                        <td>${ lead.date_contact }</td>
                        <td>${ lead.LeadStatus.name }</td>
                        <td>${ lead.Staff ? lead.Staff.name : '<strong>No Asignado</strong>' }</td>
                        <td><a href="${ url }/leads/view/${ lead.id }?tkn=${ token }"><i class="fa-regular fa-eye fa-sm" style="color: black;"></i></a></td>
                    </tr>
                `;
            }
        }

        tbResults.innerHTML = searchResult;
        sendNotification('Búsqueda completada', message);
    });
});