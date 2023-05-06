export const userColor = () => {
    const colors = [
        '#BDC3C7',
        '#3498DB',
        '#1ABC9C',
        '#22E6D6',
        '#22E67A',
        '#F1C40F',
        '#E67E22',
        '#E64522',
        '#E62256'
    ]

    const color = colors[ Math.floor(Math.random() * 9) ];

    return color
}

export const teamColor = () => {
    const colors = [
        '#00B1E9',
        '#8200E9',
        '#9C5EDA',
        '#E400E9',
        '#E97E00',
        '#1ABC9C',
    ]

    const color = colors[ Math.floor(Math.random() * 6) ];

    return color
}