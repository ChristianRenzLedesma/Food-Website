const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Dishes Data
const dishes = {
    Filipino: [
        { name: "Chicken Adobo", image: "adobo.jpg", instruction: "Heat the oil in a cooking pot. Add the chicken and garlic. Cook until light brown.", ingrideints: "Bawang, sibuyas, baboy, toyo, lawrel" },
        { name: "Sinigang", image: "images/sinigang.jpg", instruction: "Boil tamarind broth, add vegetables, and simmer until cooked." },
        { name: "Pancit", image: "images/pancit.jpg", instruction: "Stir-fry noodles with meat and vegetables." }
    ],
    Italian: [
        { name: "Chicken Alfredo", image: "images/alfredo.jpg", instruction: "Cook pasta, mix with creamy chicken sauce, and serve." },
        { name: "Carbonara", image: "carbonara.png", instruction: "Cook pasta, mix with eggs, cheese, and pancetta.", ingrideints: "pancit Canton, sphagetti, sopas" },
        { name: "Pizza", image: "images/pizza.jpg", instruction: "Spread sauce on dough, add toppings, and bake." }
    ],
    Korean: [
        { name: "Chicken Bulgogi", image: "images/bulgogi.jpg", instruction: "Marinate chicken, then grill or stir-fry." },
        { name: "Bibimbap", image: "images/bibimbap.jpg", instruction: "Mix rice with vegetables, meat, and sauce." },
        { name: "Kimchi", image: "images/kimchi.jpg", instruction: "Ferment cabbage with spices." }
    ],
    American: [
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
    ],
    Mexican: [
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
    ],
    Amsterdam: [
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
    ],
    Switzerland: [
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
    ],
    Japanese: [
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
        { name: "", image: "", instruction: "", ingrideints: "" },
    ],
};

// Get meal list that matches with the search input
function getMealList() {
    const searchInputTxt = document.getElementById('search-input').value.trim().toLowerCase();
    const results = [];

    // Filter dishes based on the search term (check name and instructions)
    if (searchInputTxt) {
        const allDishes = [...dishes.Filipino, ...dishes.Italian, ...dishes.Korean];

        allDishes.forEach(dish => {
            if (
                dish.name.toLowerCase().includes(searchInputTxt) ||
                (dish.instruction && dish.instruction.toLowerCase().includes(searchInputTxt) && dish.ingrideints)
            ) {
                results.push(dish); // Add matching dish to results
            }
        });
    }

    // Display the filtered results
    displayResults(results);
}

// Display results in the meal list container
function displayResults(results) {
    let html = "";

    if (results.length > 0) {
        results.forEach(dish => {
            html += `
                <div class="meal-item">
                    <div class="meal-img">
                        <img src="${dish.image}" alt="${dish.name}">
                    </div>
                    <div class="meal-name">
                        <h3>${dish.name}</h3>
                        <a href="#" class="recipe-btn" data-name="${dish.name}">Get Recipe</a>
                    </div>
                </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
}

// Get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();

    if (e.target.classList.contains('recipe-btn')) {
        const dishName = e.target.dataset.name;
        const allDishes = [...dishes.Filipino, ...dishes.Italian, ...dishes.Korean];
        const selectedDish = allDishes.find(dish => dish.name === dishName);

        if (selectedDish) {
            mealRecipeModal(selectedDish);
        }
    }
}

// Display recipe in a modal
function mealRecipeModal(dish) {
    let html = `
        <div class="Instru">
        <h2 class="recipe-title">${dish.name}</h2>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${dish.instruction}</p>
        </div>
        <div class="recipe-ingridients">
            <h3>Ingredients:</h3>
            <p>${dish.ingrideints}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${dish.image}" alt="${dish.name}">
        </div>
        <button id="downloadBtn">Download Recipe</button>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');

    // Add event listener for the download button
    document.getElementById('downloadBtn').addEventListener('click', function () {
        const button = document.getElementById('downloadBtn');

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        pdf.setFontSize(16);
        pdf.text(dish.name, 10, 10);

        pdf.setFontSize(12);
        pdf.text('Ingredients:', 10, 20);
        pdf.text(dish.ingrideints, 10, 30);

        pdf.text('Instructions:', 10, 50);
        pdf.text(dish.instruction, 10, 60);

        if (dish.image) {
            const img = new Image();
            img.src = dish.image;
            img.onload = function() {
                pdf.addImage(img, 'JPEG', 10, 80, 180, 100); 
                pdf.save(`${dish.name}_Recipe.pdf`);
            };
            img.onerror = function() {
                console.error('Image loading failed');
                button.style.display = 'block';  
            };
        } else {
            
            pdf.save(`${dish.name}_Recipe.pdf`);
        }
    });
}

const hamburger = document.getElementById('hamburger');
const close = document.getElementById('close');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

close.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});