fetch('https://pokeapi.co/api/v2/pokemon?limit=15').then(function (response) {
    return response.json();
}).then(function (json) {
    //console.log(json);
    //init
    setUp(json.results);
}).catch(function (err) {
    console.log(err.message);
});

function setUp(pokemon) {
    //UI elements
    const main = document.getElementById('main-container');
    const breadcrumb = document.getElementsByClassName('breadcrumb-bf-active')
    const detailCard = document.createElement('div');

    //call
    updateMain();
    //add cards to page
    function updateMain() {
        if (pokemon.length === 0) {

        } else {
            for (let p = 0; p < pokemon.length; p++) {
                createCard(pokemon[p]);
            }
        }
    }

    //call main card click listener
    addL();

    //create main cards with name of pokemon
    function createCard(pokemon) {
        const col1 = document.createElement('div');
        const card = document.createElement('div');
        const anc = document.createElement('a');

        //set attributes
        //add url to anchor element
        anc.setAttribute('href', pokemon.url)

        //console.log(pokemon.url);
        col1.setAttribute('class', 'col-1');
        card.setAttribute('class', 'card card-name');

        //add pokemon name to card
        card.textContent = pokemon.name;

        //append to main-container
        main.appendChild(anc);
        anc.appendChild(col1);
        col1.appendChild(card)
    }
    //fetch pokemon data and pass data to create card
    function fetchDetails(p_url) {
        fetch(p_url).then(function (response) {
            return response.json();
        }).then(function (json) {
            //console.log(json);
            //clear view
            clearView();

            //capitalize first letter of pokemon name
            let cap = json.name[0].toUpperCase();
            breadcrumb[0].textContent = json.name.replace(json.name[0], cap);

            createDetailCard(json);

        }).catch(function (err) {
            console.log(err.message);
        });
    }
    //create card with pokemon data
    function createDetailCard(pokemonD) {
        //card
        const cardHeadPd = document.createElement('div');
        const cardHead = document.createElement('div');
        const detailCardName = document.createElement('div');
        const col2 = document.createElement('div')
        const cardImage = document.createElement('img');
        const col3 = document.createElement('div');
        const col4 = document.createElement('div');
        const cardHp = document.createElement('span');
        const cardXp = document.createElement('span');
        const row = document.createElement('div');
        //create stats container
        const statsContainerPd = document.createElement('div');
        const statsContainer = document.createElement('div');
        const sectionText = document.createElement('span');
        //set attributes
        detailCard.setAttribute('class', 'details-card');
        cardHeadPd.setAttribute('class', 'card-head-pd');
        cardHead.setAttribute('class', 'card-head');
        col2.setAttribute('class', 'col-2');
        cardImage.setAttribute('class', 'img-frame');
        col3.setAttribute('class', 'col-3');
        detailCardName.setAttribute('class', 'card-head-name');
        col4.setAttribute('class', 'col-4');
        cardHp.setAttribute('class', 'card-head-stats fl');
        cardXp.setAttribute('class', 'card-head-stats fr');
        //
        statsContainerPd.setAttribute('class', 'card-info-container-pd');
        statsContainer.setAttribute('class', 'card-info-container');
        sectionText.setAttribute('class', 'sect-text');

        //add content to elements
        cardImage.src = pokemonD.sprites.other['official-artwork']['front_default'];
        detailCardName.textContent = pokemonD.name;
        cardHp.textContent = 'HP: ' + pokemonD.stats[0].base_stat;
        cardXp.textContent = 'XP: ' + pokemonD.base_experience;
        //add heading to stats container
        sectionText.textContent = 'Stats';

        //append 'head' elements to main 
        main.appendChild(detailCard);
        detailCard.appendChild(cardHeadPd);
        cardHeadPd.appendChild(cardHead);
        cardHead.appendChild(row);
        row.appendChild(col2);
        col2.appendChild(cardImage);
        row.appendChild(col3);
        col3.appendChild(detailCardName);
        row.appendChild(col4);
        col4.appendChild(cardHp);
        col4.appendChild(cardXp);
        detailCard.appendChild(statsContainerPd);
        statsContainerPd.appendChild(statsContainer);
        statsContainer.appendChild(sectionText);

        //let st = statsCont();
        for (let index = 0; index < pokemonD.stats.length; index++) {
            //check if index is less than 1
            if (index < 1) {
            }
            else {
                //pass stats from obj to create stats subsection
                createCardStats(pokemonD.stats[index], statsContainer, 'Stats');
            }
        }
        //console.log(pokemonD.moves.length);
        //add abilities to card
        createCardStats(pokemonD.abilities, statsCont('Ability'), 'Ability')

        //add moves to card
        createCardStats(pokemonD.moves, statsCont('Moves'), 'Moves')

        //collapse listener
        collapseListener();
    }

    //create container
    function statsCont(ty) {
        const sContainerPd = document.createElement('div');
        const sContainer = document.createElement('div');
        const sectionText = document.createElement('span');

        sContainerPd.setAttribute('class', 'card-info-container-pd');

        sContainer.setAttribute('class', 'card-info-container');

        sectionText.setAttribute('class', 'sect-text');
        //sContainer.textContent = ty;
        sectionText.textContent = ty;
        detailCard.appendChild(sContainerPd);
        sContainerPd.appendChild(sContainer);
        sContainer.appendChild(sectionText);
        console.log(sContainer)
        return sContainer;
    }

    function createCardStats(stats, statC, typ) {
        console.log()
        //stats move to createCardsdetail
        const statsRowPd = document.createElement('div');
        const statsRow = document.createElement('div');
        const statName = document.createElement('span');
        const statDiv = document.createElement('span')
        //const collapseAnc = document.createElement('a');

        statsRowPd.setAttribute('class', 'container-row-pd');
        //add css class 'collapse' to moves container
        if (typ === 'Moves') {
            statsRow.setAttribute('class', 'container-row mv collapse');
            //statsRow.setAttribute('id', 'collapse');
        }
        else {
            statsRow.setAttribute('class', 'container-row');
        }
        statName.setAttribute('class', 'stat-name');
        statDiv.setAttribute('class', 'stat');
        //
        if (typ === 'Stats') {
            statName.textContent = stats.stat.name;
            statDiv.textContent = stats.base_stat;
            console.log('stname' + stats.stat.name);
            statC.appendChild(statsRowPd);
            statsRowPd.appendChild(statsRow);
            statsRow.appendChild(statName);
            statsRow.appendChild(statDiv);
        }
        else if (typ === 'Ability') {
            statName.textContent = getAbility(stats);
            statC.appendChild(statsRowPd);
            statsRowPd.appendChild(statsRow);
            statsRow.appendChild(statName);

        }
        else if (typ === 'Moves') {
            statName.textContent = getMoves(stats);
            statC.appendChild(statsRowPd);
            //collapseAnc.appendChild(statsRowPd);
            statsRowPd.appendChild(statsRow);
            statsRow.appendChild(statName);
            //statsRow.appendChild(statDiv);
        }
    }

    //extract moves from object
    function getMoves(mov) {
        console.log('ow' + mov);
        let movesArray = [];
        for (let j = 0; j < mov.length; j++) {
            movesArray.push(mov[j].move.name);
        }
        return movesArray.toString().replaceAll(',', ', ');
    }
    //extract abilities from object
    function getAbility(ab) {
        let abArray = [];
        for (let j = 0; j < ab.length; j++) {
            abArray.push(ab[j].ability.name);
        }
        return abArray.toString().replaceAll(',', ', ');
    }

    /*main card click listener*/
    function addL() {
        const anchors = document.querySelectorAll('a')
        for (let a = 0; a < anchors.length; a++) {
            anchors[a].addEventListener('click', function (ev) {
                ev.preventDefault()
                //console.log(this.href);
                fetchDetails(this.href);
            })
        }
    }
    function collapseListener() {
        const coll = document.getElementsByClassName('collapse');
        //for (let c = 0; c < array.length; c++) {
        coll[0].addEventListener('click', function () {
            console.log('coll');
            //this.style.
            this.classList.toggle("collapse");
            //this.className += ' active'
        })
        //}
    }

    //remove content from view
    function clearView() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }

}