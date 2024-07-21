const CLIENT_ID = 'a8c71803edf24efe981c02220682134d';
const CLIENT_SECRET = '648fa4f4eb3e444590ed428121c34d7c';

async function getToken() {
    const authHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Erro ao obter token:', error);
    }
}

async function searchArtist() {
    const artistName = document.getElementById('artistInput').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (!artistName) {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    try {
        const accessToken = await getToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        console.log('Dados do Artista:', data);
        if (data.artists.items.length > 0) {
            displayArtistInfo(data.artists.items[0]);
        } else {
            alert('Artista não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados do artista:', error);
    }
}

function displayArtistInfo(artist) {
    const showcaseContainer = document.querySelector('#showcase .showcase-container');
    showcaseContainer.innerHTML = `
        <h2>${artist.name}</h2>
        <img src="${artist.images.length > 0 ? artist.images[0].url : 'img/default-artist.png'}" alt="${artist.name}" style="width: 200px; height: 200px;">
        <p>Gêneros: ${artist.genres.join(', ')}</p>
        <p>Popularidade: ${artist.popularity}</p>
        <a href="${artist.external_urls.spotify}" target="_blank">Ver no Spotify</a>
        <br><br>
        <button class="btn-primary" onclick="goBack()">Voltar</button>
    `;
}

function goBack() {
    const showcaseContainer = document.querySelector('#showcase .showcase-container');
    showcaseContainer.innerHTML = `
        <h2>Cool Song</h2>
        <p>Suas músicas, seus artistas, do seu jeito!</p>
        <input type="text" id="artistInput" placeholder="Nome do Artista">
        <br>
        <button class="btn-primary" onclick="searchArtist()">Pesquisar Artista</button>
        <div id="error-message" style="color: red; display: none;">Por favor, insira um nome de artista válido.</div>
    `;
}
