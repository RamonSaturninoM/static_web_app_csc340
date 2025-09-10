// --- Default animals shown on first load ---
const DEFAULT_ANIMALS = [
    {
    name: "Red Panda",
    species: "Ailurus fulgens",
    type: "Mammal",
    age: 4,
    habitat: "Temperate forests",
    description: "Small, tree-dwelling mammal with russet fur and a ringed tail.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_Panda_%2824986761703%29.jpg/1200px-Red_Panda_%2824986761703%29.jpg"
    },
    {
    name: "African Elephant",
    species: "Loxodonta africana",
    type: "Mammal",
    age: 25,
    habitat: "Savanna",
    description: "Largest land animal, highly intelligent and social.",
    imageUrl: "https://i.natgeofe.com/n/16fc1c64-7589-46da-8350-aa3b01da2152/3961779.jpg?wp=1&w=1084.125&h=792.75"
    },
    {
    name: "Bald Eagle",
    species: "Haliaeetus leucocephalus",
    type: "Bird",
    age: 7,
    habitat: "Near large bodies of water",
    description: "Iconic raptor with white head and tail feathers.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/1200px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg"
    },
    {
    name: "Tiger",
    species: "Panthera tigris",
    type: "Mammal",
    age: 10,
    habitat: "Forests and grasslands",
    description: "Powerful striped big cat native to Asia.",
    imageUrl: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/wdpro-assets/parks-and-tickets/attractions/animal-kingdom/disney-animals/disney-animals-asian-sumatran-tigers/disney-animals-asian-sumatran-tigers-00.jpg?1658996208764"
    },
    {
    name: "Green Sea Turtle",
    species: "Chelonia mydas",
    type: "Reptile",
    age: 40,
    habitat: "Tropical and subtropical seas",
    description: "Large sea turtle known for long migrations.",
    imageUrl: "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/t/n/tnc_765560001.jpg?crop=0%2C233%2C4000%2C2200&wid=1300&hei=715&scl=3.076923076923077"
    }
    ];
    
    
    const STORAGE_KEY = 'animals';
    
    
    function getSavedAnimals() {
    try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
    } catch {
    return [];
    }
    }
    
    
    function saveAnimal(animal) {
    const animals = getSavedAnimals();
    animals.push(animal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
    }
    
    
    function renderCards(list) {
    const gallery = document.getElementById('gallery');
    const noResults = document.getElementById('noResults');
    if (!gallery) return; // not on index.html
    
    gallery.innerHTML = '';
    
    if (list.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    
    list.forEach((a) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4';
        
        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm border-0';
        card.setAttribute('data-name', a.name.toLowerCase());
        card.setAttribute('data-species', a.species.toLowerCase());
        card.setAttribute('data-type', a.type.toLowerCase());
        card.setAttribute('data-habitat', a.habitat.toLowerCase());
        
        // Enhanced card content with detailed information
        card.innerHTML = `
            <div class="position-relative">
                <img src="${a.imageUrl}" class="card-img-top" alt="${a.name}" style="height: 250px; object-fit: cover;">
                <div class="position-absolute top-0 end-0 m-2">
                    <span class="badge bg-primary">${a.type}</span>
                </div>
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold text-primary">${a.name}</h5>
                <p class="card-text text-muted small mb-2">
                    <i class="bi bi-book me-1"></i><em>${a.species}</em>
                </p>
                <p class="card-text flex-grow-1">${a.description}</p>
                <div class="mt-auto">
                    <div class="row g-2 small text-muted">
                        <div class="col-6">
                            <i class="bi bi-calendar me-1"></i>
                            <strong>Age:</strong> ${a.age} years
                        </div>
                        <div class="col-6">
                            <i class="bi bi-geo-alt me-1"></i>
                            <strong>Habitat:</strong> ${a.habitat}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-transparent border-0">
                <button class="btn btn-outline-primary btn-sm w-100" onclick="viewDetails('${a.name}')">
                    <i class="bi bi-eye me-1"></i>View Details
                </button>
            </div>
        `;
        
        col.appendChild(card);
        gallery.appendChild(col);
    });
}

// Search functionality
function searchAnimals(query) {
    const allAnimals = [...DEFAULT_ANIMALS, ...getSavedAnimals()];
    
    if (!query || query.trim() === '') {
        return allAnimals;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return allAnimals.filter(animal => {
        return animal.name.toLowerCase().includes(searchTerm) ||
               animal.species.toLowerCase().includes(searchTerm) ||
               animal.type.toLowerCase().includes(searchTerm) ||
               animal.habitat.toLowerCase().includes(searchTerm) ||
               animal.description.toLowerCase().includes(searchTerm);
    });
}

// Update search results display
function updateSearchResults(filteredAnimals, query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (!query || query.trim() === '') {
        searchResults.textContent = `Showing ${filteredAnimals.length} animals`;
    } else {
        searchResults.textContent = `Found ${filteredAnimals.length} animal${filteredAnimals.length !== 1 ? 's' : ''} matching "${query}"`;
    }
}

// View details function (placeholder for now)
function viewDetails(animalName) {
    // This could navigate to a details page or show a modal
    alert(`Details for ${animalName} - This feature can be implemented later!`);
}

// Initialize the page
function initializePage() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (!searchInput) return; // not on index.html
    
    // Load and display all animals initially
    const allAnimals = [...DEFAULT_ANIMALS, ...getSavedAnimals()];
    renderCards(allAnimals);
    updateSearchResults(allAnimals, '');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value;
        const filteredAnimals = searchAnimals(query);
        renderCards(filteredAnimals);
        updateSearchResults(filteredAnimals, query);
    });
    
    // Clear search functionality
    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            const allAnimals = [...DEFAULT_ANIMALS, ...getSavedAnimals()];
            renderCards(allAnimals);
            updateSearchResults(allAnimals, '');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);