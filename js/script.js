window.onload =  function () {
  const random = document.querySelector('.hungry-link');
  const contain = document.querySelector('.hungry-item');

  random.addEventListener('click', () => {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
          .then(res => res.json())
          .then(res => {
              console.log('res', res.meals[0]);
              randomMeal(res.meals[0], contain);
          })
  })
};

function randomMeal(item, contain) {
    let ingredients = [];
    for (let i = 1; i < 20; i++ ) {
        if (item[`strIngredient${i}`]) {
            ingredients.push(`${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    const wrap = `
    <div class="hungry-item__right-title">${item.strMeal}</div>
            <div class="hungry-item__categories">
            <div class="hungry-item__categories-cat"><span>Category:</span>${item.strCategory}</div>
                <div class="hungry-item__categories-cat"><span>Area:</span>${item.strArea}</div>
                <div class="hungry-item__categories-cat"><span>Tags:</span>${item.strTags}</div>
            </div>
            <div class="hungry-item__top">
                <img src="${item.strMealThumb}" alt="" class="hungry-item__img">
                <div class="hungry-item__right">
                    <ul class="hungry-item__right-ingredients">
                        ${ingredients.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <div class="hungry-item__right-text">${item.strInstructions}</div>
                </div>
            </div>
            <h2 class="hungry-item__h2">Video</h2>
            <div class="hungry-item__video">
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/${item.strYoutube.slice(-11)}"></iframe>
            </div>
    `;
    contain.innerHTML = wrap;
}
