console.log('estoy aqui');

const addNewIngredient = () => {
    console.log(this)
   // const myDiv = this.document.body.querySelector('divRecipes');
    const myForm = this.document.createElement('form');
    console.log(myDiv);
    // myDiv.appendChild(myForm);
    // myForm.setAttribute('action', '/recipe/new');
    // myForm.setAttribute('method', 'POST');
}