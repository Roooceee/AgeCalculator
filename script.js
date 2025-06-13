// Sélection des labels associés aux champs jour/mois/année
const dayLabel = document.querySelector("#label_day");
const monthLabel = document.querySelector("#label_month");
const yearLabel = document.querySelector("#label_year");

// 🔹 Sélection des champs de saisie (input) jour/mois/année
const dayField = document.querySelector("#day");
const monthField = document.querySelector("#month");
const yearField = document.querySelector("#year");

// Sélection des éléments qui afficheront les résultats (valeurs numériques)
const resultYear = document.querySelector("#result_year");
const resultMonth = document.querySelector("#result_month");
const resultDate = document.querySelector("#result_date");

// Sélection des textes qui accompagnent les résultats (ex: "years", "months", etc.)
const result_text_year = document.querySelector("#text_result_year")
const result_text_month = document.querySelector("#text_result_month")
const result_text_day = document.querySelector("#text_result_date")

// Bouton de soumission
const submit = document.querySelector("#submit");

// Ajoute une classe "active" quand un champ est focus
function handleFocus(field) {
   field.classList.add("active");
}

// Retire la classe "active" quand un champ perd le focus
function handleBlur(field) {
   field.classList.remove('active')
}

// Fonction utilitaire pour afficher un message d'erreur et/ou ajouter une classe CSS
function ShowMessageAndOrAddClassCSS(element, message="", classCSS=null) {
   if(classCSS != null){
      element.classList.add(...classCSS.split(" "));
   }
   if(message != ""){
      element.insertAdjacentHTML("afterend", message)
   }
}

// Vérifie si un champ est vide, et affiche un message d'erreur si c’est le cas
function verifyFieldIsNotEmpty(field, label, classCSS){
   if(field.value.trim() === ''){
      ShowMessageAndOrAddClassCSS(field, `<p class='error ${classCSS}'>This field is required</p>`, `input_error ${classCSS}`)
      ShowMessageAndOrAddClassCSS(label, "", "error")
   }
}

// 🔹 Fonction principale qui calcule l’âge exact en années, mois, jours
function calculAgeExact(day, month, year){
   let isFieldNoEmpty = true;

   // Vérifie que les champs ne sont pas vides
   if(dayField.value.trim() === "") isFieldNoEmpty = false;
   if(monthField.value.trim() === "") isFieldNoEmpty = false;
   if(yearField.value.trim() === "") isFieldNoEmpty = false;

   let isAllValid = true;

   // Vérifie la validité des valeurs entrées
   if(!verifyDay(day)) isAllValid = false;
   if(!verifyMonth(month)) isAllValid = false;
   if(!verifyYear(year)) isAllValid = false;

   // Si tout est valide et rempli, on peut calculer l'âge
   if(isAllValid && isFieldNoEmpty){
      const dateBorn = new Date(year, month - 1, day); // Date de naissance
      const dateCurrent = new Date(); // Date du jour

      if(verifyDateInThePast(dateBorn)) { // Vérifie que la date est dans le passé
         if(verifyDateExist(dateBorn, day, month, year)){ // Vérifie que la date est valide (ex: pas 31/02)
            
            // Calcul initial de la différence
            let ageYear = dateCurrent.getFullYear() - dateBorn.getFullYear();
            let ageMonth = dateCurrent.getMonth() - dateBorn.getMonth();
            let ageDate = dateCurrent.getDate() - dateBorn.getDate();

            // Ajustement si le jour est négatif (on n’a pas encore atteint l’anniv du mois)
            if (ageDate < 0) {
               ageMonth--;
               ageDate = 0;
               const monthDayBirthday = new Date(dateCurrent.getFullYear(), dateBorn.getMonth() + 1, 0).getDate();
               ageDate = monthDayBirthday - dateBorn.getDate();
               ageDate += dateCurrent.getDate();
            }

            // Ajustement si le mois est négatif (on n’a pas encore atteint l’anniv dans l’année)
            if (ageMonth < 0) {
               ageMonth += 12;
               ageYear--;
            }

            // Affichage des résultats dans le DOM
            const textYear = ageYear <= 1 ? "year" : "years";
            resultYear.textContent = ageYear
            result_text_year.textContent = textYear;

            const textMonth = ageMonth <= 1 ? "month" : "months";
            resultMonth.textContent = ageMonth
            result_text_month.textContent = textMonth;

            const textDay = ageDate <= 1 ? "day" : "days";
            resultDate.textContent = ageDate
            result_text_day.textContent = textDay;
         }
      }
   }
}

// Vérifie que la date est bien dans le passé
function verifyDateInThePast(dateBorn){
   const dateCurrent = new Date();
   if(dateBorn < dateCurrent){
      // Enlève les erreurs précédentes
      dayLabel.classList.remove("error");
      monthLabel.classList.remove("error");
      yearLabel.classList.remove("error");

      dayField.classList.remove("error");
      monthField.classList.remove("error");
      yearField.classList.remove("error");

      return true;
   }

   // Sinon, affiche une erreur
   ShowMessageAndOrAddClassCSS(dayLabel, "", "error")
   ShowMessageAndOrAddClassCSS(monthLabel, "", "error")
   ShowMessageAndOrAddClassCSS(yearLabel, "", "error")
   ShowMessageAndOrAddClassCSS(dayField, "", "input_error");
   ShowMessageAndOrAddClassCSS(monthField, "", "input_error");
   ShowMessageAndOrAddClassCSS(yearField, "", "input_error");
   ShowMessageAndOrAddClassCSS(yearField, "<p class='error dateError'>Must be in the past<p>");
   return false;
}

// Vérifie que la date créée correspond bien aux valeurs saisies (exclut les dates type 31/02)
function verifyDateExist(dateBorn, day, month, year){
   if(dateBorn.getFullYear() != year || dateBorn.getMonth() != month - 1 || dateBorn.getDate() != day){
      ShowMessageAndOrAddClassCSS(dayLabel, "", "error")
      ShowMessageAndOrAddClassCSS(monthLabel, "", "error")
      ShowMessageAndOrAddClassCSS(yearLabel, "", "error")
      ShowMessageAndOrAddClassCSS(dayField, "", "input_error");
      ShowMessageAndOrAddClassCSS(monthField, "", "input_error");
      ShowMessageAndOrAddClassCSS(yearField, "", "input_error");
      ShowMessageAndOrAddClassCSS(dayField, "<p class='error dateError'>Must be a date valid</p>")
      return false
   } else {
      return true
   }
}

// Vérifie la validité du jour (1 à 31)
function verifyDay(day){
   if(day){
      if(day >= 1 && day <= 31){
         dayField.classList.remove("input_error");
         dayLabel.classList.remove("error");

         const dayError = document.querySelector('p.dayError')
         if(dayError){
            dayError.remove()
         }
         return true;
      }
      ShowMessageAndOrAddClassCSS(dayLabel, "", "error")
      ShowMessageAndOrAddClassCSS(dayField, "<p class='error dayError'>Must be a valid day</p>", "input_error dayError")
      return false;
   }
}

// Vérifie la validité du mois (1 à 12)
function verifyMonth(month){
   if(month){
      if(month >= 1 && month <= 12){
         monthField.classList.remove("input_error");
         monthLabel.classList.remove("error");

         const monthError = document.querySelector('p.monthError')
         if(monthError){
            monthError.remove()
         }
         return true;
      }
      ShowMessageAndOrAddClassCSS(monthLabel, "", "error")
      ShowMessageAndOrAddClassCSS(monthField, "<p class='error monthError'>Must be a valid month</p>", "input_error")
      return false;
   }
}

// Vérifie la validité de l’année (entre 1900 et l’année actuelle)
function verifyYear(year){
   const yearCurrent = new Date().getFullYear();

   if(year){
      if(year >= 1900 && year <= yearCurrent){
         yearField.classList.remove("input_error");
         yearLabel.classList.remove("error");

         const yearError = document.querySelector('p.yearError')
         if(yearError){
            yearError.remove()
         }
         return true;
      }
      ShowMessageAndOrAddClassCSS(yearLabel, "", "error")
      ShowMessageAndOrAddClassCSS(yearField, `<p class='error yearError'>Must be a year between 1900 and ${yearCurrent}</p>`, "input_error yearError")
      return false;
   }
}

// Lors du clic sur "submit", on vérifie les champs, on nettoie les erreurs et on lance le calcul
submit.addEventListener("click",(e)=>{
   e.preventDefault();

   // Supprime tous les messages d’erreur existants
   const error = document.querySelectorAll("p.error");
   if(error){
      error.forEach(element => {
         element.remove();
      });
   }

   // Réinitialise les résultats affichés
   resultYear.textContent = "--"
   resultMonth.textContent = "--"
   resultDate.textContent = "--"

   // Vérifie si les champs sont vides
   verifyFieldIsNotEmpty(dayField, dayLabel, 'dayError')
   verifyFieldIsNotEmpty(monthField, monthLabel, 'monthError')
   verifyFieldIsNotEmpty(yearField, yearLabel, 'yearError')

   // Lancement du calcul
   calculAgeExact(dayField.value, monthField.value, yearField.value)
});

// Gère la touche "Entrée" pour déclencher le bouton
document.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      submit.click();
   }
});

// Gestion des événements "blur" (perte de focus) pour les champs
// Cela permet de valider automatiquement le champ quand on sort
dayField.addEventListener('blur', ()=>{
   const error = document.querySelector('p.dayError')
   const dateError = document.querySelector('p.dateError')
   if(!dateError){
      if(error){
         error.remove()
      }
      verifyFieldIsNotEmpty(dayField, dayLabel, 'dayError')
      handleBlur(dayField)
      verifyDay(dayField.value)
   }
})
monthField.addEventListener('blur', ()=>{
   const error = document.querySelector('p.monthError')
   const dateError = document.querySelector('p.dateError')
   if(!dateError){
      if(error){
         error.remove()
      }
      handleBlur(monthField)
      verifyFieldIsNotEmpty(monthField, monthLabel, 'monthError')
      verifyMonth(monthField.value)
   }
})
yearField.addEventListener('blur', ()=>{
   const error = document.querySelector('p.yearError')
   const dateError = document.querySelector('p.dateError')
   if(!dateError){
      if(error){
         error.remove()
      }
      handleBlur(yearField)
      verifyFieldIsNotEmpty(yearField, yearLabel, 'yearError')
      verifyYear(yearField.value)
   }
})

// Ajoute une classe active quand un champ est focus
dayField.addEventListener("focus", () => handleFocus(dayField));
monthField.addEventListener("focus", () => handleFocus(monthField));
yearField.addEventListener("focus", () => handleFocus(yearField));

// Empêche la saisie de caractères non numériques dans les champs
// Si l'utilisateur corrige un champ suite à une erreur, on relance les vérifs
[dayField, monthField, yearField].forEach((field) => {
   field.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      const dateError = document.querySelector('p.dateError')
      if(dateError){
         dateError.remove()
         verifyDay(dayField.value)
         verifyMonth(monthField.value)
         verifyYear(yearField.value)
      }
   });
});
