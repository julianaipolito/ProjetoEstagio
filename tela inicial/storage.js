// storage.js

// Função para salvar o nome do artista no localStorage
function salvarNomeArtista(nomeArtista) {
    localStorage.setItem('ultimoArtistaPesquisado', nomeArtista);
}

// Função para recuperar o nome do artista do localStorage
function recuperarNomeArtista() {
    return localStorage.getItem('ultimoArtistaPesquisado');
}
