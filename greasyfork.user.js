// delete all matched... for example 超星
// [...document.querySelectorAll('tr.scripttr')]
//     .map((e) => ({
//         id: e.querySelector('.script_name')?.textContent,
//         e,
//     }))
//     .filter(({e}) => e.textContent?.match(/超星/))
//     .map(({ id, e }) => {
//         console.log('Delete ' + id);
//         e.querySelector('[title="Delete"]').click();
//     });

// delete all disabled scripts
[...document.querySelectorAll('[title="Delete"]')]
    .filter((e) => e.parentElement.parentElement.parentElement.innerHTML.match(/title="Disabled"/))
    .map((e) => e.click());

// delete duplicated scripts (keep the first)
[...document.querySelectorAll('tr.scripttr')]
    .map((e) => ({
        id: e.querySelector('.script_name')?.textContent,
        e,
    }))
    .filter(({ id }) => id)
    .reduce((dups, { id, e }, i, a) => [...dups, a.slice(0, i).find((e) => e.id === id)], [])
    .filter((e) => e)
    .map(({ id, e }) => {
        console.log('Delete ' + id);
        e.querySelector('[title="Delete"]').click();
    });
