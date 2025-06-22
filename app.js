// Mock API Data
        const games = [
            {
                id: 1,
                title: "The Legend of Zelda: Breath of the Wild",
                genre: "adventure",
                rating: 4.9,
                year: 2017,
                platform: "Nintendo Switch",
                description: "Explora el vasto reino de Hyrule en esta aventura épica.",
                image: "https://via.placeholder.com/300x200?text=Zelda+BOTW",
                link: "https://www.zelda.com/breath-of-the-wild/"
            },
            {
                id: 2,
                title: "Red Dead Redemption 2",
                genre: "action",
                rating: 4.8,
                year: 2018,
                platform: "Multiplataforma",
                description: "Vive la vida de un forajido en el salvaje oeste.",
                image: "https://via.placeholder.com/300x200?text=RDR2",
                link: "https://www.rockstargames.com/reddeadredemption2/"
            },
            {
                id: 3,
                title: "Final Fantasy VII Remake",
                genre: "rpg",
                rating: 4.7,
                year: 2020,
                platform: "PlayStation",
                description: "Reimaginación del clásico RPG de 1997.",
                image: "https://via.placeholder.com/300x200?text=FFVII+Remake",
                link: "https://ffvii-remake.square-enix-games.com/"
            },
            {
                id: 4,
                title: "Hades",
                genre: "action",
                rating: 4.8,
                year: 2020,
                platform: "Multiplataforma",
                description: "Roguelike de acción con narrativa profunda.",
                image: "https://via.placeholder.com/300x200?text=Hades",
                link: "https://www.supergiantgames.com/games/hades/"
            },
            {
                id: 5,
                title: "The Witcher 3: Wild Hunt",
                genre: "rpg",
                rating: 4.9,
                year: 2015,
                platform: "Multiplataforma",
                description: "RPG de mundo abierto basado en la saga de Geralt de Rivia.",
                image: "https://via.placeholder.com/300x200?text=Witcher+3",
                link: "https://thewitcher.com/en/witcher3"
            }
        ];

        // DOM Elements
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const resultsSection = document.getElementById('results-section');
        const gameModal = document.getElementById('game-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const closeModal = document.getElementById('close-modal');
        const addFavorite = document.getElementById('add-favorite');
        const gameLink = document.getElementById('game-link');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const favoritesList = document.getElementById('favorites-list');

        // State
        let currentGame = null;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Functions
        function renderGames(gamesToRender) {
            resultsSection.innerHTML = gamesToRender.map(game => `
                <div class="game-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer" data-id="${game.id}">
                    <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="font-bold text-lg">${game.title}</h3>
                        <div class="flex justify-between mt-2">
                            <span class="text-sm text-gray-600">${game.year}</span>
                            <span class="text-sm text-gray-600">${game.platform}</span>
                        </div>
                        <div class="mt-2 flex items-center">
                            <span class="text-yellow-500">${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5 - Math.floor(game.rating))}</span>
                            <span class="ml-2 text-sm">${game.rating}</span>
                        </div>
                        <button class="mt-3 w-full bg-purple-100 text-purple-600 py-1 rounded hover:bg-purple-200 transition view-details" data-id="${game.id}">
                            Ver detalles
                        </button>
                    </div>
                </div>
            `).join('');

            // Add event listeners
            document.querySelectorAll('.view-details').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const gameId = parseInt(e.target.dataset.id);
                    showGameDetails(gameId);
                });
            });

            document.querySelectorAll('.game-card').forEach(card => {
                card.addEventListener('click', () => {
                    const gameId = parseInt(card.dataset.id);
                    showGameDetails(gameId);
                });
            });
        }

        function showGameDetails(gameId) {
            currentGame = games.find(game => game.id === gameId);
            if (!currentGame) return;

            modalTitle.textContent = currentGame.title;
            modalContent.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="w-full md:w-1/3">
                        <img src="${currentGame.image}" alt="${currentGame.title}" class="rounded-lg shadow">
                    </div>
                    <div class="w-full md:w-2/3">
                        <p><strong>Género:</strong> ${currentGame.genre.charAt(0).toUpperCase() + currentGame.genre.slice(1)}</p>
                        <p><strong>Plataforma:</strong> ${currentGame.platform}</p>
                        <p><strong>Año:</strong> ${currentGame.year}</p>
                        <p class="mt-4">${currentGame.description}</p>
                    </div>
                </div>
            `;
            gameLink.href = currentGame.link;
            
            // Update favorite button
            const isFavorite = favorites.some(fav => fav.id === currentGame.id);
            addFavorite.innerHTML = isFavorite 
                ? '❤️ Eliminar de favoritos' 
                : '❤️ Añadir a favoritos';
            
            gameModal.classList.remove('hidden');
        }

        function renderFavorites() {
            if (favorites.length === 0) {
                favoritesList.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <i class="fas fa-heart-broken text-4xl text-gray-400 mb-2"></i>
                        <p class="text-gray-600">No tienes juegos favoritos aún</p>
                    </div>
                `;
                return;
            }

            favoritesList.innerHTML = favorites.map(game => `
                <div class="bg-white rounded-lg shadow p-4 flex items-center">
                    <img src="${game.image}" alt="${game.title}" class="w-16 h-16 object-cover rounded">
                    <div class="ml-4 flex-grow">
                        <h4 class="font-bold">${game.title}</h4>
                        <p class="text-sm text-gray-600">${game.platform}</p>
                    </div>
                    <button class="text-red-500 remove-favorite" data-id="${game.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');

            // Add event listeners
            document.querySelectorAll('.remove-favorite').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const gameId = parseInt(e.target.closest('button').dataset.id);
                    removeFromFavorites(gameId);
                });
            });
        }

        function addToFavorites() {
            if (!currentGame) return;
            
            const isAlreadyFavorite = favorites.some(fav => fav.id === currentGame.id);
            
            if (isAlreadyFavorite) {
                removeFromFavorites(currentGame.id);
            } else {
                favorites.push(currentGame);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
                addFavorite.innerHTML = '❤️ Eliminar de favoritos';
            }
        }

        function removeFromFavorites(gameId) {
            favorites = favorites.filter(fav => fav.id !== gameId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            
            if (currentGame && currentGame.id === gameId) {
                addFavorite.innerHTML = '❤️ Añadir a favoritos';
            }
        }

        function searchGames() {
            const searchTerm = searchInput.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active').dataset.genre;
            
            let filteredGames = games;
            
            // Apply search filter
            if (searchTerm) {
                filteredGames = filteredGames.filter(game => 
                    game.title.toLowerCase().includes(searchTerm) || 
                    game.description.toLowerCase().includes(searchTerm)
                );
            }
            
            // Apply genre filter
            if (activeFilter !== 'all') {
                filteredGames = filteredGames.filter(game => game.genre === activeFilter);
            }
            
            renderGames(filteredGames);
        }

        // Event Listeners
        searchBtn.addEventListener('click', searchGames);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') searchGames();
        });

        closeModal.addEventListener('click', () => {
            gameModal.classList.add('hidden');
        });

        addFavorite.addEventListener('click', addToFavorites);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                searchGames();
            });
        });

        // Initialize
        renderGames(games);
        renderFavorites();