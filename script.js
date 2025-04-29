const dayLabel = document.querySelector("#label_day");
const monthLabel = document.querySelector("#label_month");
const yearLabel = document.querySelector("#label_year");


const dayField = document.querySelector("#day");
const monthField = document.querySelector("#month");
const yearField = document.querySelector("#year");

const resultYear = document.querySelector("#result_year");
const resultMonth = document.querySelector("#result_month");
const resultDate = document.querySelector("#result_date");

const result_text_year = document.querySelector("#text_result_year")
const result_text_month = document.querySelector("#text_result_month")
const result_text_day = document.querySelector("#text_result_date")

const submit = document.querySelector("#submit");

function handleFocus(field) {
   field.classList.add("active");
}

function handleBlur(field) {
   field.classList.remove('active')
}

function ShowMessageAndOrAddClassCSS(element, message="",classCSS=null) {
   if(classCSS!=null){
      element.classList.add(...classCSS.split(" "));
   }
   if(message!=""){
      element.insertAdjacentHTML("afterend",message)
   }
}

function verifyFieldIsNotEmpty(field,label,classCSS){

   if(field.value.trim()===''){
      ShowMessageAndOrAddClassCSS(field, `<p class='error ${classCSS}'>This field is required</p>`,`input_error ${classCSS}`)
      ShowMessageAndOrAddClassCSS(label,"","error")
   }

}

function calculAgeExact(day, month,year){
      
   let isFieldNoEmpty = true;
   
   if(dayField.value.trim()==="") isFieldNoEmpty=false;
   if(monthField.value.trim()==="") isFieldNoEmpty=false;
   if(yearField.value.trim()==="") isFieldNoEmpty=false;

   let isAllValid = true;

   if(!verifyDay(day)) isAllValid = false;
   if(!verifyMonth(month)) isAllValid = false;
   if(!verifyYear(year)) isAllValid = false;

   
   if(isAllValid && isFieldNoEmpty){
   
      const dateBorn = new Date(year, month-1, day); // Crée la date de naissance avec les parametre day month et year
      const dateCurrent = new Date(); // Crée la date d'aujourd'hui
      
      if(verifyDateInThePast(dateBorn)) {
         
         if(verifyDateExist(dateBorn,day,month,year)){
   
            // Calcul de l'âge
            let ageYear = dateCurrent.getFullYear() - dateBorn.getFullYear();
            let ageMonth = dateCurrent.getMonth() - dateBorn.getMonth();
            let ageDate = dateCurrent.getDate() - dateBorn.getDate();

            //  Ajuster si les jours sont négatifs
            if (ageDate < 0) {
               ageMonth--; // On emprunte un mois
               ageDate=0; // On remet ageDate a zéro
               monthDayBirthday = new Date(dateCurrent.getFullYear(),dateBorn.getMonth()+1,0).getDate(); // On recupere le nombre de jour du mois de naissance
               ageDate = monthDayBirthday-dateBorn.getDate();
               ageDate += dateCurrent.getDate();

            }

            // 🔹 Ajuster si les mois sont négatifs
            if (ageMonth < 0) {
               ageMonth += 12; // On ajoute 12 mois pour repasser en positif
               ageYear--;  // On emprunte une année
            }

            
            const textYear = ageYear<= 1 ? "year" : "years";
            resultYear.textContent= ageYear
            result_text_year.textContent =textYear;
            
            const textMonth = ageMonth<= 1 ? "month" : "months";
            resultMonth.textContent = ageMonth
            result_text_month.textContent = textMonth;
            
            const textDay = ageDate<= 1 ? "day" : "days";
            resultDate.textContent = ageDate
            result_text_day.textContent = textDay;
   
         }
      }
   }
         
      
      
   }

   function verifyDateInThePast(dateBorn){
      dateCurrent = new Date();
      if(dateBorn<dateCurrent){
         dayLabel.classList.remove("error");
         monthLabel.classList.remove("error");
         yearLabel.classList.remove("error");

         dayField.classList.remove("error");
         monthField.classList.remove("error");
         yearField.classList.remove("error");
         return true;
      }  
      ShowMessageAndOrAddClassCSS(dayLabel,"","error")
      ShowMessageAndOrAddClassCSS(monthLabel,"","error")
      ShowMessageAndOrAddClassCSS(yearLabel,"","error")
      ShowMessageAndOrAddClassCSS(dayField, "","input_error");
      ShowMessageAndOrAddClassCSS(monthField, "","input_error");
      ShowMessageAndOrAddClassCSS(yearField, "","input_error");
      ShowMessageAndOrAddClassCSS(yearField,"<p class='error'>Must be in the past<p>",);
      return false;
   }
   
   
   function verifyDateExist(dateBorn,day,month,year){

         // Vérifie si l'année ou le mois ou le jour crée grace a la fonction date n'est pas égal aux parametre envoyé dans la fonction
         if(dateBorn.getFullYear() != year || dateBorn.getMonth() != month-1 || dateBorn.getDate() != day){

            ShowMessageAndOrAddClassCSS(dayLabel,"","error")
            ShowMessageAndOrAddClassCSS(monthLabel,"","error")
            ShowMessageAndOrAddClassCSS(yearLabel,"","error")
            ShowMessageAndOrAddClassCSS(dayField, "","input_error");
            ShowMessageAndOrAddClassCSS(monthField, "","input_error");
            ShowMessageAndOrAddClassCSS(yearField, "","input_error");
            ShowMessageAndOrAddClassCSS(dayField,"<p class='error'>Must be a date valid</p>")
            return false
         }
         else {
            return true
         }
   }



function verifyDay(day){

   if(day){
      if(day>=1 && day<=31){
         dayField.classList.remove("input_error");
         dayLabel.classList.remove("error");

         const dayError = document.querySelector('p.dayError')
         if(dayError){
            dayError.remove()
         }
         return true;
      }
      ShowMessageAndOrAddClassCSS(dayLabel,"","error")
      ShowMessageAndOrAddClassCSS(dayField, "<p class='error dayError'>Must be a valid day</p>","input_error dayError")
      return false;
   }


}
function verifyMonth(month){

   if(month){
      if(month>=1 && month<=12){
         monthField.classList.remove("input_error");
         monthLabel.classList.remove("error");

         const monthError = document.querySelector('p.monthError')
         if(monthError){
            monthError.remove()
         }
         return true;
      }
      ShowMessageAndOrAddClassCSS(monthLabel,"","error")
      ShowMessageAndOrAddClassCSS(monthField, "<p class='error monthError'>Must be a valid month</p>","input_error")
      return false;
   }


}
function verifyYear(year){

   if(year){
      if(year>=1900){
         yearField.classList.remove("input_error");
         yearLabel.classList.remove("error");

         const yearError = document.querySelector('p.yearError')

         if(yearError){
            yearError.remove()
         }

         return true;
      }
      ShowMessageAndOrAddClassCSS(yearLabel,"","error")
      ShowMessageAndOrAddClassCSS(yearField, "<p class='error yearError'>Must be a year after 1900</p>","input_error yearError")
      return false;
   }

}



submit.addEventListener("click",(e)=>{
   
   e.preventDefault();

   const error = document.querySelectorAll("p.error");

   if(error){
      error.forEach(element => {
         element.remove();
      });
   }

   resultYear.textContent="--"
   resultMonth.textContent="--"
   resultDate.textContent="--"

   verifyFieldIsNotEmpty(dayField,dayLabel,'dayError')
   verifyFieldIsNotEmpty(monthField,monthLabel,'monthError')
   verifyFieldIsNotEmpty(yearField,yearLabel,'yearError')

   submit.id="submitsend";
   calculAgeExact(dayField.value, monthField.value, yearField.value)

});

document.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      submit.click();
   }
});

dayField.addEventListener('blur',()=>{
   const error = document.querySelector('p.dayError')
   if(error){
      error.remove()
   }
   verifyFieldIsNotEmpty(dayField,dayLabel,'dayError')
   handleBlur(dayField)
   verifyDay(dayField.value)
})

monthField.addEventListener('blur',()=>{
   const error = document.querySelector('p.monthError')
   if(error){
      error.remove()
   }
   handleBlur(monthField)
   verifyFieldIsNotEmpty(monthField,monthLabel,'monthError')
   verifyMonth(monthField.value)
})

yearField.addEventListener('blur',()=>{
   const error = document.querySelector('p.yearError')
   if(error){
      error.remove()
   }
   handleBlur(yearField)
   verifyFieldIsNotEmpty(yearField,yearLabel,'yearError')
   verifyYear(yearField.value)
})

dayField.addEventListener("focus", () => handleFocus(dayField));
monthField.addEventListener("focus", () => handleFocus(monthField));
yearField.addEventListener("focus", () => handleFocus(yearField));





